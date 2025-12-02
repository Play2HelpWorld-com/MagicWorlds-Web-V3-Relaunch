const STORAGE_KEY = "tmw_referral_code";

export const saveReferralCode = (code: string) => {
  if (typeof window === "undefined") return;
  if (!code) return;
  window.localStorage.setItem(STORAGE_KEY, code);
};

export const getReferralCode = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY);
};

export const clearReferralCode = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
};

export const REFERRAL_STORAGE_KEY = STORAGE_KEY;
