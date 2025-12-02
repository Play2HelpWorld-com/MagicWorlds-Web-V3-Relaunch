export interface QueueInstantBonusPayload {
  walletAddress: string;
  referralCode?: string | null;
  source?: string;
}

export const queueInstantBonus = async (payload: QueueInstantBonusPayload) => {
  const response = await fetch("/api/partners/bonus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody?.error || "Unable to queue instant partner bonus",
    );
  }

  return response.json().catch(() => ({}));
};
