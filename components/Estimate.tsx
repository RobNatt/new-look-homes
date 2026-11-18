"use client";

import { createContext, useCallback, useContext, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { business, contactTimes, projectTypes } from "@/lib/site";
import { PhoneIcon } from "./Icons";

type Ctx = { open: (source?: string) => void };
const EstimateContext = createContext<Ctx>({ open: () => {} });

export function useEstimate() {
  return useContext(EstimateContext);
}

/** The main CTA used on every page. Opens the short estimate form. */
export function EstimateButton({
  variant = "primary",
  className = "",
  source,
  children = "Get a free estimate",
}: {
  variant?: "primary" | "secondary" | "on-dark";
  className?: string;
  source?: string;
  children?: ReactNode;
}) {
  const { open } = useEstimate();
  return (
    <button type="button" className={`btn btn-${variant} ${className}`} onClick={() => open(source)} aria-haspopup="dialog">
      {children}
    </button>
  );
}

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "phone" | "location" | "projectType", string>>;

export function EstimateProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [source, setSource] = useState<string | undefined>();
  const id = useId();

  const open = useCallback((src?: string) => {
    setSource(src);
    setStatus((s) => (s === "sent" ? "idle" : s));
    dialogRef.current?.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Add your name so we know who we're calling.";
    const digits = (data.phone || "").replace(/\D/g, "");
    if (digits.length < 10) next.phone = "Add a 10-digit phone number so Nathan can call you back.";
    if (!data.location?.trim()) next.location = "Add your street address or ZIP code.";
    if (!data.projectType) next.projectType = "Pick the closest project type. \"Not sure yet\" is fine.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "mt-1.5 block w-full min-h-12 rounded-[2px] border border-line-strong bg-white px-3.5 text-[16px] text-charcoal focus:border-teal focus:outline-2 focus:outline-offset-0 focus:outline-teal aria-[invalid=true]:border-charcoal aria-[invalid=true]:border-2";
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${id}-${k}-err`} className="mt-1.5 flex gap-1.5 text-[14px] text-charcoal">
        <span aria-hidden="true">⚠</span>
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof Errors) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined,
  });

  return (
    <EstimateContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        className="estimate m-auto w-[calc(100%-32px)] max-w-[560px] max-h-[calc(100dvh-32px)] overflow-y-auto rounded-[2px] bg-paper p-0 text-charcoal shadow-2xl"
        aria-labelledby={`${id}-title`}
        onClose={() => setErrors({})}
      >
        <div className="flex items-start justify-between gap-4 border-b border-greige-deep px-6 pt-6 pb-5 md:px-8">
          <div>
            <p className="eyebrow text-teal">Free estimate</p>
            <h2 id={`${id}-title`} className="mt-2 font-display text-[2rem] leading-[1.1] font-semibold">
              Tell us about your project
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            className="-mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-[2px] text-charcoal-soft hover:bg-greige"
            aria-label="Close estimate form"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {status === "sent" ? (
          <div className="px-6 py-8 md:px-8" role="status">
            <p className="font-display text-[1.75rem] leading-tight font-semibold">Thanks, we've got it.</p>
            <p className="mt-3 text-charcoal-soft">
              {business.owner.split(" ")[0]} will call you at the time you picked to talk through the project and set up a
              visit.
            </p>
            <button type="button" className="btn btn-secondary mt-6" onClick={close}>
              Close
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="grid gap-5 px-6 py-6 md:px-8">
            <p className="text-[15px] text-charcoal-soft">Five quick questions. We'll call you back to set up a visit.</p>

            <div>
              <label htmlFor={`${id}-name`} className="text-[14px] font-medium">Name</label>
              <input id={`${id}-name`} name="name" autoComplete="name" className={fieldClass} {...a11y("name")} />
              {err("name")}
            </div>

            <div>
              <label htmlFor={`${id}-phone`} className="text-[14px] font-medium">Phone</label>
              <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" className={fieldClass} {...a11y("phone")} />
              {err("phone")}
            </div>

            <div>
              <label htmlFor={`${id}-location`} className="text-[14px] font-medium">Address or ZIP code</label>
              <input id={`${id}-location`} name="location" autoComplete="street-address" className={fieldClass} {...a11y("location")} />
              {err("location")}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-type`} className="text-[14px] font-medium">Project type</label>
                <select id={`${id}-type`} name="projectType" defaultValue="" className={fieldClass} {...a11y("projectType")}>
                  <option value="" disabled>Choose one</option>
                  {projectTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {err("projectType")}
              </div>
              <div>
                <label htmlFor={`${id}-time`} className="text-[14px] font-medium">Best time to reach you</label>
                <select id={`${id}-time`} name="bestTime" defaultValue="Any time" className={fieldClass}>
                  {contactTimes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {status === "error" && (
              <p className="rounded-[2px] border border-charcoal bg-greige px-4 py-3 text-[15px]" role="alert">
                ⚠ That didn't go through. Please try again, or call us at{" "}
                <a className="link" href={`tel:${business.phone.value.tel}`}>{business.phone.value.display}</a>.
              </p>
            )}

            <div className="flex flex-col-reverse items-start gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <a href={`tel:${business.phone.value.tel}`} className="inline-flex min-h-11 items-center gap-2 text-[15px] text-charcoal-soft">
                <PhoneIcon className="h-4 w-4" />
                Rather talk? <span className="link">{business.phone.value.display}</span>
              </a>
              <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Request my estimate"}
              </button>
            </div>
          </form>
        )}
      </dialog>
    </EstimateContext.Provider>
  );
}
