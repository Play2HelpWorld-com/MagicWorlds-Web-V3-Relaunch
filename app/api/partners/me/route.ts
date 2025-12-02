import { NextResponse } from "next/server";
import {
  mockPartnerDirectory,
  PartnerDirectoryEntry,
} from "@/data/partnerDirectory";

const PARTNER_DIRECTORY_URL = process.env.PARTNER_DIRECTORY_URL;

interface PartnerProfileRequestBody {
  walletAddress?: string;
}

const normalizeWallet = (address: string) => address.toLowerCase();

async function fetchRemoteProfile(
  walletAddress: string,
): Promise<PartnerDirectoryEntry | null> {
  if (!PARTNER_DIRECTORY_URL) {
    return null;
  }

  try {
    const response = await fetch(PARTNER_DIRECTORY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress }),
    });

    if (!response.ok) {
      console.warn(
        "[PartnerProfile] Remote directory returned non-200",
        response.status,
      );
      return null;
    }

    const data = (await response.json()) as PartnerDirectoryEntry | null;
    if (!data) return null;

    return {
      ...data,
      walletAddress: normalizeWallet(data.walletAddress),
      source: data.source ?? "remote",
    };
  } catch (error) {
    console.error("[PartnerProfile] Remote directory error", error);
    return null;
  }
}

function findMockProfile(walletAddress: string) {
  return (
    mockPartnerDirectory.find(
      (entry) => entry.walletAddress.toLowerCase() === walletAddress,
    ) ?? null
  );
}

export async function POST(request: Request) {
  let payload: PartnerProfileRequestBody;
  try {
    payload = (await request.json()) as PartnerProfileRequestBody;
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON body", details: (error as Error).message },
      { status: 400 },
    );
  }

  if (!payload.walletAddress) {
    return NextResponse.json(
      { error: "walletAddress is required" },
      { status: 400 },
    );
  }

  const normalizedWallet = normalizeWallet(payload.walletAddress);

  const remoteProfile = await fetchRemoteProfile(normalizedWallet);
  const profile = remoteProfile ?? findMockProfile(normalizedWallet);

  return NextResponse.json({
    walletAddress: normalizedWallet,
    referralCode: profile?.referralCode ?? null,
    status: profile?.status ?? "pending",
    lastUpdated: profile?.lastUpdated ?? null,
    name: profile?.name ?? null,
    email: profile?.email ?? null,
    source: profile?.source ?? (remoteProfile ? "remote" : "mock"),
  });
}
