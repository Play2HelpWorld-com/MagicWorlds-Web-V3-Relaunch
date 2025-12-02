export type TapfiliateEventType = "wallet_connect" | "conversion";

export interface NotifyTapfiliateParams {
  eventType: TapfiliateEventType;
  walletAddress: string;
  referralCode: string;
  amount?: number;
  currency?: string;
  conversionId?: string;
  commission?: number;
  metadata?: Record<string, unknown>;
}

export const notifyTapfiliateEvent = async (params: NotifyTapfiliateParams) => {
  const response = await fetch("/api/tapfiliate/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody?.error || "Unable to forward event to Tapfiliate",
    );
  }

  return response.json().catch(() => ({}));
};
