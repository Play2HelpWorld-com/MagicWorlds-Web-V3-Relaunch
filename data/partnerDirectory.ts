export type PartnerStatus = "approved" | "pending" | "rejected";

export interface PartnerDirectoryEntry {
  walletAddress: string;
  referralCode: string;
  status: PartnerStatus;
  lastUpdated?: string;
  name?: string;
  email?: string;
  notes?: string;
  source?: string;
}

export const mockPartnerDirectory: PartnerDirectoryEntry[] = [
  {
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    referralCode: "MAGICSPARK",
    status: "approved",
    lastUpdated: "2025-11-20T18:00:00.000Z",
    name: "Spark Creator",
    email: "spark@example.com",
    source: "mock",
  },
  {
    walletAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    referralCode: "MWGPLAY",
    status: "approved",
    lastUpdated: "2025-11-28T15:30:00.000Z",
    name: "Guild Captain",
    email: "captain@example.com",
    source: "mock",
  },
  {
    walletAddress: "0xfeedfeedfeedfeedfeedfeedfeedfeedfeedfeed",
    referralCode: "MAGICWAITLIST",
    status: "pending",
    lastUpdated: "2025-12-01T12:15:00.000Z",
    name: "Pending Creator",
    email: "pending@example.com",
    source: "mock",
  },
];
