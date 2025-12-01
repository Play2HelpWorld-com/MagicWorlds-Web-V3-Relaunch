import React from "react";
import { Metadata } from "next";
import GameDownloads from "@/components/Play";

export const metadata: Metadata = {
  title: "Play Page - Download our Games",
  description: "Built by MagicWorlds",
  // other metadata
};

interface PlayPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const PlayPage = async ({ searchParams }: PlayPageProps) => {
  const resolvedSearchParams = (await searchParams) ?? {};
  const rawReferral = resolvedSearchParams.ref;
  const referralCode = Array.isArray(rawReferral)
    ? rawReferral[0]
    : rawReferral;

  return (
    <main>
      <GameDownloads initialReferralCode={referralCode} />
    </main>
  );
};

export default PlayPage;
