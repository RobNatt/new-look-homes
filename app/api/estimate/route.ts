import { NextResponse } from "next/server";

/**
 * Estimate form endpoint.
 *
 * PLACEHOLDER: delivery. Right now this only validates and logs the request.
 * Before launch, send it somewhere Nathan will see it, e.g. email via Resend/Postmark,
 * a text via Twilio, or a CRM webhook. Set the destination in env vars, not in code.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const str = (k: string, max = 200) => (typeof body[k] === "string" ? (body[k] as string).trim().slice(0, max) : "");
  const lead = {
    name: str("name"),
    phone: str("phone", 40),
    location: str("location"),
    projectType: str("projectType", 60),
    bestTime: str("bestTime", 60),
    source: str("source", 60),
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || lead.phone.replace(/\D/g, "").length < 10 || !lead.location || !lead.projectType) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 422 });
  }

  console.log("[estimate request]", lead);
  return NextResponse.json({ ok: true });
}
