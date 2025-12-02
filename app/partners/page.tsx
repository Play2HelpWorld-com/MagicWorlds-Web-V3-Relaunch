import { Metadata } from "next";
import PartnerProgramSection from "@/components/Play/PartnerProgramSection";

export const metadata: Metadata = {
  title: "Partner Program - Magic Worlds",
  description:
    "Apply to the Magic Worlds partner program, track referrals, and access the Tapfiliate-powered incentive plan.",
};

interface PartnerPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const PartnerPage = async ({ searchParams }: PartnerPageProps) => {
  const resolvedParams = (await searchParams) ?? {};
  const rawReferral = resolvedParams.ref;
  const referralCode = Array.isArray(rawReferral)
    ? rawReferral[0]
    : rawReferral;

  return (
    <main>
      <PartnerProgramSection initialReferralCode={referralCode} />
    </main>
  );
};

export default PartnerPage;
