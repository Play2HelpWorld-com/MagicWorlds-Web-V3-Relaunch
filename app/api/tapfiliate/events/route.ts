import { NextResponse } from "next/server";

const TAPFILIATE_API_KEY = process.env.TAPFILIATE_API_KEY;
const TAPFILIATE_BASE_URL =
  process.env.TAPFILIATE_BASE_URL ?? "https://tapfiliate.com/api/1.7";

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
  wallet_connect: "/cus/c/",
  conversion: "/con/c/",
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

  const normalizedWallet = walletAddress.toLowerCase();
  const endpointPath = TAPFILIATE_ENDPOINTS[eventType];

  let tapfiliateBody: Record<string, unknown> = {
    customer_id: normalizedWallet,
    referral_code: referralCode,
    meta_data: payload.metadata ?? {},
  };

  if (eventType === "conversion") {
    if (typeof payload.amount !== "number" || !payload.currency) {
      return NextResponse.json(
        { error: "amount (number) and currency are required for conversions" },
        { status: 400 },
      );
    }

    tapfiliateBody = {
      ...tapfiliateBody,
      amount: payload.amount,
      currency: payload.currency,
      commission: payload.commission,
      external_id: payload.conversionId,
    };
  }

  const tapfiliateResponse = await fetch(
    `${TAPFILIATE_BASE_URL.replace(/\/$/, "")}${endpointPath}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": TAPFILIATE_API_KEY,
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
    return NextResponse.json(
      {
        error: "Tapfiliate request failed",
        status: tapfiliateResponse.status,
        response: parsedResponse,
      },
      { status: tapfiliateResponse.status },
    );
  }

  return NextResponse.json({ ok: true, response: parsedResponse ?? {} });
}
