import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

const TAPFILIATE_API_KEY = process.env.TAPFILIATE_API_KEY;
const TAPFILIATE_BASE_URL =
  process.env.TAPFILIATE_BASE_URL ?? "https://api.tapfiliate.com/1.7";

type EventType = "wallet_connect" | "conversion";

interface TapfiliateEventPayload {
  eventType: EventType;
  walletAddress?: string;
  referralCode?: string;
  amount?: number;
  currency?: string;
  conversionId?: string;
  commission?: number;
  metadata?: Record<string, unknown>;
}

const TAPFILIATE_ENDPOINTS: Record<EventType, string> = {
  wallet_connect: "/pb/cus/c/",
  conversion: "/pb/con/c/",
};

export async function POST(request: Request) {
  if (!TAPFILIATE_API_KEY) {
    return NextResponse.json(
      {
        error: "Tapfiliate API key is not configured on the server.",
      },
      { status: 500 },
    );
  }

  let payload: TapfiliateEventPayload;
  try {
    payload = (await request.json()) as TapfiliateEventPayload;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON payload", details: (error as Error).message },
      { status: 400 },
    );
  }

  const { eventType, walletAddress, referralCode } = payload;
  const traceId = randomUUID();

  if (!eventType || !(eventType in TAPFILIATE_ENDPOINTS)) {
    return NextResponse.json(
      { error: "eventType must be 'wallet_connect' or 'conversion'" },
      { status: 400 },
    );
  }

  if (!walletAddress || !referralCode) {
    return NextResponse.json(
      { error: "walletAddress and referralCode are required" },
      { status: 400 },
    );
  }

  if (payload.metadata && typeof payload.metadata !== "object") {
    return NextResponse.json(
      { error: "metadata must be an object if provided" },
      { status: 400 },
    );
  }

  const normalizedWallet = walletAddress.toLowerCase();
  const endpointPath = TAPFILIATE_ENDPOINTS[eventType];
  const userAgent = request.headers.get("user-agent") ?? undefined;
  const baseBody: Record<string, unknown> = {
    referral_code: referralCode,
    meta_data: payload.metadata ?? {},
  };

  if (userAgent) {
    baseBody.user_agent = userAgent;
  }

  let tapfiliateBody: Record<string, unknown>;

  if (eventType === "conversion") {
    if (!payload.conversionId) {
      return NextResponse.json(
        { error: "conversionId is required for conversion events" },
        { status: 400 },
      );
    }

    tapfiliateBody = {
      ...baseBody,
      customer_id: normalizedWallet,
      external_id: payload.conversionId,
    };

    if (payload.amount !== undefined) {
      if (typeof payload.amount !== "number" || Number.isNaN(payload.amount)) {
        return NextResponse.json(
          { error: "amount must be a number when provided" },
          { status: 400 },
        );
      }
      tapfiliateBody.amount = payload.amount;
    }

    if (payload.currency) {
      tapfiliateBody.currency = payload.currency;
    }

    if (payload.commission !== undefined) {
      tapfiliateBody.commission = payload.commission;
    }
  } else {
    tapfiliateBody = {
      ...baseBody,
      customer_id: normalizedWallet,
    };
  }

  console.info(
    `[Tapfiliate][${traceId}] Dispatching ${eventType} for wallet ${normalizedWallet} with referral ${referralCode}`,
  );

  const tapfiliateResponse = await fetch(
    `${TAPFILIATE_BASE_URL.replace(/\/$/, "")}${endpointPath}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": TAPFILIATE_API_KEY,
      },
      body: JSON.stringify(tapfiliateBody),
    },
  );

  const rawResponse = await tapfiliateResponse.text();
  let parsedResponse: unknown = null;

  if (rawResponse) {
    try {
      parsedResponse = JSON.parse(rawResponse);
    } catch (error) {
      parsedResponse = { raw: rawResponse };
    }
  }

  if (!tapfiliateResponse.ok) {
    console.error(
      `[Tapfiliate][${traceId}] Failed ${eventType} for ${normalizedWallet}. Status ${tapfiliateResponse.status}. Response:`,
      parsedResponse,
    );
    return NextResponse.json(
      {
        error: "Tapfiliate request failed",
        status: tapfiliateResponse.status,
        response: parsedResponse,
      },
      { status: tapfiliateResponse.status },
    );
  }

  console.info(
    `[Tapfiliate][${traceId}] Success ${eventType} for ${normalizedWallet}. Tapfiliate status ${tapfiliateResponse.status}`,
  );

  return NextResponse.json({ ok: true, response: parsedResponse ?? {} });
}
