import { NextResponse } from "next/server";

const BONUS_WEBHOOK_URL =
  process.env.PARTNER_BONUS_WEBHOOK_URL ||
  process.env.NEXT_PUBLIC_PARTNER_BONUS_WEBHOOK ||
  "";

const BONUS_WEBHOOK_SECRET =
  process.env.PARTNER_BONUS_WEBHOOK_SECRET ||
  process.env.NEXT_PUBLIC_PARTNER_BONUS_WEBHOOK_SECRET ||
  "";

interface BonusRequestBody {
  walletAddress?: string;
  referralCode?: string | null;
  source?: string;
}

export async function POST(request: Request) {
  let payload: BonusRequestBody;
  try {
    payload = (await request.json()) as BonusRequestBody;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload", details: (error as Error).message },
      { status: 400 },
    );
  }

  if (!payload.walletAddress) {
    return NextResponse.json(
      { error: "walletAddress is required" },
      { status: 400 },
    );
  }

  const normalizedWallet = payload.walletAddress.toLowerCase();
  const finalBody = {
    wallet: normalizedWallet,
    referral_code: payload.referralCode ?? null,
    source: payload.source ?? "play-page",
    requested_at: new Date().toISOString(),
  };

  if (!BONUS_WEBHOOK_URL) {
    console.info("[PartnerBonus] Webhook not configured", finalBody);
    return NextResponse.json({ ok: true, simulated: true });
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (BONUS_WEBHOOK_SECRET) {
    headers["X-Partner-Bonus-Secret"] = BONUS_WEBHOOK_SECRET;
  }

  const webhookResponse = await fetch(BONUS_WEBHOOK_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(finalBody),
  });

  if (!webhookResponse.ok) {
    const errorBody = await webhookResponse.text();
    return NextResponse.json(
      {
        error: "Bonus webhook request failed",
        status: webhookResponse.status,
        response: errorBody,
      },
      { status: webhookResponse.status },
    );
  }

  return NextResponse.json({ ok: true });
}
