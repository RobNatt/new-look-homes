import type { ReactNode } from "react";

/** Inline, clearly marked placeholder text for anything Nathan hasn't confirmed. */
export function Ph({ children }: { children: ReactNode }) {
  return (
    <span className="ph" data-placeholder>
      {children}
    </span>
  );
}

/**
 * An empty photo slot waiting for one of Nathan's real project photos.
 * It says plainly which photo goes here and which file to add, so it can't be mistaken for a finished image.
 */
export function PhotoSlot({
  kind,
  project,
  file,
  ratio = "3 / 2",
  align = "center",
  compact = false,
  className = "",
}: {
  kind: "before" | "after" | "portrait";
  project: string;
  file: string;
  ratio?: string;
  align?: "left" | "right" | "center";
  compact?: boolean;
  className?: string;
}) {
  const heading = kind === "portrait" ? "Photo" : kind === "before" ? "Before photo" : "After photo";
  const pos =
    align === "left" ? "items-start text-left pl-4 pr-[52%] sm:pl-6" : align === "right" ? "items-end text-right pr-4 pl-[52%] sm:pr-6" : "items-center text-center px-4";

  return (
    <div
      className={`photo-slot relative flex flex-col justify-center ${pos} ${className}`}
      data-kind={kind}
      style={ratio === "auto" ? undefined : { aspectRatio: ratio }}
      role="img"
      aria-label={`Empty photo slot: ${heading.toLowerCase()}, ${project}`}
    >
      <span className="photo-slot-frame" aria-hidden="true" />
      <span className="relative flex flex-col gap-1.5" style={{ alignItems: "inherit" }}>
        <span className={`photo-slot-badge ${compact ? "text-[10px]" : ""}`}>{heading}</span>
        {!compact && <span className="font-display text-[1.125rem] leading-tight font-semibold text-charcoal sm:text-[1.375rem]">{project}</span>}
        <span className={`break-all font-mono text-charcoal-soft ${compact ? "text-[10px]" : "text-[11px] sm:text-[12px]"}`}>
          {compact ? file.replace(/^public\/projects\//, "") : `Add: ${file}`}
        </span>
      </span>
    </div>
  );
}
