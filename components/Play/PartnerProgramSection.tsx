"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Coins,
  Wallet,
  Gift,
  ClipboardCheck,
  TrendingUp,
  ShieldCheck,
  Users,
  Link2,
  Sparkles,
  BellRing,
  Mail,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { getReferralCode, saveReferralCode } from "@/utils/lib/referralStorage";
import { motion } from "framer-motion";

const PARTNER_SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_PARTNER_SUPPORT_EMAIL ??
  "partners@themagicworlds.com";

interface PartnerProgramSectionProps {
  initialReferralCode?: string | null;
}

interface ApplyFormState {
  name: string;
  email: string;
  channelUrl: string;
  audienceSize: string;
  region: string;
  platforms: string;
  notes: string;
}

const motionFade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const PartnerProgramSection = ({
  initialReferralCode,
}: PartnerProgramSectionProps) => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [playUrl, setPlayUrl] = useState<string>(
    process.env.NEXT_PUBLIC_PLAY_URL ?? "https://www.themagicworlds.com/play",
  );
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [isCopying, setIsCopying] = useState(false);
  const [applyStatus, setApplyStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [applyFeedback, setApplyFeedback] = useState<string | null>(null);
  const [applyForm, setApplyForm] = useState<ApplyFormState>({
    name: "",
    email: "",
    channelUrl: "",
    audienceSize: "",
    region: "",
    platforms: "",
    notes: "",
  });

  useEffect(() => {
    if (initialReferralCode) {
      saveReferralCode(initialReferralCode);
      setReferralCode(initialReferralCode);
      return;
    }
    const stored = getReferralCode();
    if (stored) {
      setReferralCode(stored);
    }
  }, [initialReferralCode]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_PLAY_URL) {
      return;
    }
    if (typeof window !== "undefined") {
      setPlayUrl(`${window.location.origin}/play`);
    }
  }, []);

  const shareUrl = referralCode ? `${playUrl}?ref=${referralCode}` : playUrl;

  const incentiveCards = useMemo(
    () => [
      {
        icon: Coins,
        title: "20% Lifetime Revenue",
        description: "Weekly MWG payouts on every referred purchase.",
        stat: "Paid Saturdays",
      },
      {
        icon: Gift,
        title: "Instant $TOKEN Bonus",
        description: "Wallet connect (PCE) locks in the player + bonus.",
        stat: "Auto-triggered",
      },
      {
        icon: Wallet,
        title: "Tapfiliate S2S",
        description: "Ref= capture + wallet-as-customer ID for full LTV.",
        stat: "V1.7 API",
      },
      {
        icon: ShieldCheck,
        title: "Hybrid Approvals",
        description: "Auto green-light low-risk creators, review others.",
        stat: "<48h SLA",
      },
    ],
    [],
  );

  const trackingSteps = useMemo(
    () => [
      {
        title: "1. Capture referral",
        body: "`ref` query is stored client-side and sent with every wallet event.",
      },
      {
        title: "2. Wallet connect (PCE)",
        body: "S2S `/cus/c/` call fires, instant bonus queued, LTV link created.",
      },
      {
        title: "3. Revenue event",
        body: "Game backend triggers `/con/c/` so the 20% share posts weekly.",
      },
    ],
    [],
  );

  const riskSignals = useMemo(
    () => [
      {
        label: "Tapfiliate history",
        body: "Click → wallet ratio, refunds, disputes feed the score.",
      },
      {
        label: "CRM tags",
        body: "Tier, contract, region, and NDA status synced from HubSpot/SF.",
      },
      {
        label: "Social proof",
        body: "Verified Twitch/YouTube/Twitter metrics confirm authenticity.",
      },
    ],
    [],
  );

  const handleScrollTo = (targetId: string) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCopyShareLink = async () => {
    if (!referralCode) {
      setShareFeedback("Apply or log in to unlock your unique share link.");
      handleScrollTo("partner-apply");
      return;
    }
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(shareUrl);
      setShareFeedback("Link copied—share it everywhere ✨");
    } catch (error) {
      console.error("Clipboard copy failed", error);
      setShareFeedback("Copy not available. Manually copy the link below.");
    } finally {
      setIsCopying(false);
    }
  };

  const handleApplyInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setApplyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApplyStatus("submitting");
    setApplyFeedback(null);
    const payload = { ...applyForm, referralCode };
    try {
      const response = await fetch("/api/partners/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseBody = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(responseBody?.error || "Application submission failed");
      }

      setApplyStatus("success");
      setApplyFeedback(
        "Thanks! Ops will review and reply within 48 hours (Mon–Sat).",
      );
      setApplyForm({
        name: "",
        email: "",
        channelUrl: "",
        audienceSize: "",
        region: "",
        platforms: "",
        notes: "",
      });
    } catch (error) {
      console.error("Partner application submission failed", error);
      setApplyStatus("error");
      setApplyFeedback(
        `We could not submit automatically. Email ${PARTNER_SUPPORT_EMAIL} and include your links.`,
      );
    }
  };

  return (
    <div className="relative isolate bg-[#040111] text-white">
      <section
        id="partner-hero"
        className="relative overflow-hidden border-b border-white/5 px-4 py-16 sm:py-20 lg:py-24"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-purple-500/10 to-black" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Tapfiliate + Wallet Connect
            </p>
            <motion.h1
              className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={motionFade}
            >
              Magic Worlds Partner Program
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-gray-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={motionFade}
              custom={2}
            >
              Dual incentive stack designed for creators: earn a weekly 20%
              revenue share forever and grant players an instant $TOKEN bonus
              the moment they connect their wallet. `/play` captures referrals,
              while Tapfiliate S2S keeps payouts accurate.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={motionFade}
              custom={3}
            >
              <button
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
                onClick={() => handleScrollTo("partner-apply")}
              >
                Apply to Program
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white"
                onClick={handleCopyShareLink}
              >
                <Link2 className="h-4 w-4" /> Get Share Link
              </button>
            </motion.div>
            {shareFeedback && (
              <p className="mt-3 text-sm text-cyan-200">{shareFeedback}</p>
            )}
          </div>
          <motion.div
            className="flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={motionFade}
            custom={4}
          >
            <div className="mb-6 flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-pink-300">
              <Sparkles className="h-5 w-5" />
              Dual Incentive Snapshot
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {incentiveCards.map((card, index) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4"
                >
                  <card.icon className="mb-3 h-6 w-6 text-cyan-300" />
                  <p className="text-sm font-semibold text-gray-300">
                    {card.stat}
                  </p>
                  <h3 className="text-lg font-bold">{card.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="partner-share"
        className="border-b border-white/5 px-4 py-16 lg:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <motion.div
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={motionFade}
          >
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
              <ClipboardCheck className="h-5 w-5" /> Tracking Blueprint
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Seamless referral capture
            </h2>
            <p className="mt-3 text-gray-300">
              `/play` listens for `?ref=` parameters, stores them securely, and
              forwards the code alongside every wallet and conversion event.
            </p>
            <div className="mt-6 space-y-4">
              {trackingSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4"
                >
                  <p className="text-sm font-semibold text-cyan-200">
                    Step {index + 1}
                  </p>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={motionFade}
            custom={2}
          >
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">
              <BellRing className="h-5 w-5" /> Your Share Link
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Copy-ready URL
            </h2>
            <p className="mt-3 text-gray-300">
              When you are approved, we auto-populate your unique referral URL
              below. Share it anywhere to trigger Tapfiliate tracking instantly.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="text-sm text-gray-400">Referral URL</p>
              <div className="font-mono mt-2 break-all text-sm text-white">
                {shareUrl}
              </div>
            </div>
            <button
              className="mt-4 w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-black disabled:opacity-40"
              onClick={handleCopyShareLink}
              disabled={isCopying}
            >
              {isCopying ? "Copying..." : "Copy link"}
            </button>
            {!referralCode && (
              <p className="mt-3 text-sm text-yellow-300">
                No referral detected yet. Submit an application or sign in to
                the partner portal.
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="border-b border-white/5 px-4 py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={motionFade}
          >
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-300">
              <Users className="h-5 w-5" /> Risk Signals
            </div>
            <h2 className="mt-4 text-3xl font-bold">Auto/Manual blend</h2>
            <p className="mt-3 text-gray-300">
              We auto-approve trusted creators (score ≥ 70) and route everyone
              else to ops within 48 hours. Data sources include:
            </p>
            <ul className="mt-6 space-y-4">
              {riskSignals.map((signal) => (
                <li
                  key={signal.label}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4"
                >
                  <h3 className="text-lg font-bold">{signal.label}</h3>
                  <p className="text-sm text-gray-400">{signal.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-gray-400">
              Score ≥ 70 → instant approval. 40–69 → manual review. &lt; 40 →
              rejection/escalation with fraud checks.
            </p>
          </motion.div>
          <motion.div
            id="partner-apply"
            className="rounded-3xl border border-white/10 bg-gradient-to-bl from-pink-500/10 via-cyan-500/5 to-black p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={motionFade}
            custom={2}
          >
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-pink-300">
              <Mail className="h-5 w-5" /> Apply Now
            </div>
            <h2 className="mt-4 text-3xl font-bold">Tell us about you</h2>
            <p className="mt-3 text-gray-200">
              Complete the quick intake so we can score you and release your
              share link.
            </p>
            <form className="mt-6 space-y-4" onSubmit={handleApplySubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-gray-300">Full Name</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                    name="name"
                    value={applyForm.name}
                    onChange={handleApplyInputChange}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Email</label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                    name="email"
                    value={applyForm.email}
                    onChange={handleApplyInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-300">
                  Primary channel URL
                </label>
                <input
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                  name="channelUrl"
                  value={applyForm.channelUrl}
                  onChange={handleApplyInputChange}
                  placeholder="https://twitch.tv/yourname"
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-gray-300">Audience size</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                    name="audienceSize"
                    value={applyForm.audienceSize}
                    onChange={handleApplyInputChange}
                    placeholder="e.g., 250K followers"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Region</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                    name="region"
                    value={applyForm.region}
                    onChange={handleApplyInputChange}
                    placeholder="US / EU / LATAM / APAC"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-300">Key platforms</label>
                <input
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                  name="platforms"
                  value={applyForm.platforms}
                  onChange={handleApplyInputChange}
                  placeholder="YouTube, TikTok, Discord"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">
                  Notes / campaign ideas
                </label>
                <textarea
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                  rows={3}
                  name="notes"
                  value={applyForm.notes}
                  onChange={handleApplyInputChange}
                  placeholder="Share upcoming drops or audience insights"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-pink-500 px-4 py-3 font-semibold text-white transition hover:bg-pink-400 disabled:opacity-40"
                disabled={applyStatus === "submitting"}
              >
                {applyStatus === "submitting"
                  ? "Submitting..."
                  : "Submit application"}
              </button>
            </form>
            {applyFeedback && (
              <div
                className={`mt-4 flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
                  applyStatus === "success"
                    ? "border-green-400/40 bg-green-400/10 text-green-200"
                    : applyStatus === "error"
                      ? "border-yellow-400/40 bg-yellow-500/10 text-yellow-200"
                      : "border-white/10 bg-white/5 text-gray-200"
                }`}
              >
                {applyStatus === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4" />
                ) : (
                  <AlertTriangle className="mt-0.5 h-4 w-4" />
                )}
                <span>{applyFeedback}</span>
              </div>
            )}
            <p className="mt-4 text-xs text-gray-400">
              Need help? Email{" "}
              <a
                className="text-cyan-300"
                href={`mailto:${PARTNER_SUPPORT_EMAIL}`}
              >
                {PARTNER_SUPPORT_EMAIL}
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={motionFade}
          >
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
              <TrendingUp className="h-5 w-5" /> Weekly Ops
            </div>
            <h2 className="mt-4 text-3xl font-bold">Manual payout runbook</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-gray-300">
              <li>Friday: export Tapfiliate performance, validate S2S logs.</li>
              <li>
                Saturday: send MWG payouts (wallet + bonus) via ops wallet.
              </li>
              <li>Log confirmation tx hashes + notify affiliates via email.</li>
            </ul>
            <p className="mt-4 text-sm text-gray-400">
              Future sprint: automate payouts once MWG treasury multi-sig is
              live.
            </p>
          </motion.div>
          <motion.div
            className="rounded-3xl border border-white/10 bg-black/40 p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={motionFade}
            custom={2}
          >
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-purple-200">
              <ShieldCheck className="h-5 w-5" /> Support scripts
            </div>
            <h2 className="mt-4 text-3xl font-bold">Ops-ready messaging</h2>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              <li>
                <strong>Payout status:</strong> &ldquo;Rewards are processed
                every Saturday after Tapfiliate export. Expect MWG within
                24h.&rdquo;
              </li>
              <li>
                <strong>Approval ETA:</strong> &ldquo;Applications are reviewed
                within 2 business days. Priority for creators with verified
                gameplay content.&rdquo;
              </li>
              <li>
                <strong>Wallet issues:</strong> &ldquo;Ensure you connect the
                wallet submitted in your application to trigger the instant
                bonus.&rdquo;
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnerProgramSection;
