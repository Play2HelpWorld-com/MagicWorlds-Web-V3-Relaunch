import { NextResponse } from "next/server";

const WEBHOOK_URL =
  process.env.PARTNER_APPLICATION_WEBHOOK_URL ||
  process.env.NEXT_PUBLIC_PARTNER_APPLICATION_WEBHOOK ||
  "";

interface PartnerApplicationBody {
  name?: string;
  email?: string;
  channelUrl?: string;
  audienceSize?: string;
  region?: string;
  platforms?: string;
  notes?: string;
  referralCode?: string | null;
}

const REQUIRED_FIELDS: Array<keyof PartnerApplicationBody> = [
  "name",
  "email",
  "channelUrl",
];

export async function POST(request: Request) {
  let payload: PartnerApplicationBody;
  try {
    payload = (await request.json()) as PartnerApplicationBody;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON body", details: (error as Error).message },
      { status: 400 },
    );
  }

  const missingField = REQUIRED_FIELDS.find((field) => !payload[field]);
  if (missingField) {
    return NextResponse.json(
      { error: `Missing required field: ${missingField}` },
      { status: 400 },
    );
  }

  const finalPayload = {
    ...payload,
    submitted_at: new Date().toISOString(),
  };

  if (!WEBHOOK_URL) {
    console.info("[PartnerApplication] Webhook not configured", finalPayload);
    return NextResponse.json({ ok: true, simulated: true });
  }

  const webhookResponse = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(finalPayload),
  });

  if (!webhookResponse.ok) {
    const errorBody = await webhookResponse.text();
    return NextResponse.json(
      {
        error: "Webhook request failed",
        status: webhookResponse.status,
        response: errorBody,
      },
      { status: webhookResponse.status },
    );
  }

  return NextResponse.json({ ok: true });
}
