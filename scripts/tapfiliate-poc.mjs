#!/usr/bin/env node

const args = process.argv.slice(2);

const getArg = (flag, fallback) => {
  const index = args.indexOf(flag);
  if (index === -1) {
    return fallback;
  }
  return args[index + 1] ?? fallback;
};

const referralCode = getArg(
  "--ref",
  process.env.TAPFILIATE_POC_REF ?? "TESTPOC_DAMI_001",
);
const walletAddress = getArg(
  "--wallet",
  process.env.TAPFILIATE_POC_WALLET ??
    "0x7ab576c4be4ae12198de616e71a1ca876fcfb967",
);
const baseUrl = getArg(
  "--base-url",
  process.env.TAPFILIATE_POC_BASE_URL ?? "http://localhost:3000",
);
const amount = Number(
  getArg("--amount", process.env.TAPFILIATE_POC_AMOUNT ?? "10"),
);
const currency = getArg(
  "--currency",
  process.env.TAPFILIATE_POC_CURRENCY ?? "USD",
);
const defaultConversionId =
  process.env.TAPFILIATE_POC_CONVERSION_ID ??
  `${referralCode}-POC-${Date.now()}`;
const conversionId = getArg("--conversion-id", defaultConversionId);

if (!Number.isFinite(amount)) {
  console.error("Invalid amount provided.");
  process.exit(1);
}

const eventsEndpoint = new URL("/api/tapfiliate/events", baseUrl).toString();

const pretty = (obj) => JSON.stringify(obj, null, 2);

const stepBanner = (label) => {
  console.log("\n============================");
  console.log(label);
  console.log("============================\n");
};

const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch (error) {
    json = { raw: text };
  }
  if (!response.ok) {
    const message = json?.error || response.statusText;
    throw new Error(`${message} (status ${response.status})`);
  }
  return json;
};

const hitLandingPage = async () => {
  const landingUrl = `${baseUrl.replace(/\/$/, "")}/play?ref=${encodeURIComponent(
    referralCode,
  )}`;
  stepBanner(`Step A · Visiting ${landingUrl}`);
  const response = await fetch(landingUrl, {
    method: "GET",
    headers: { "User-Agent": "Tapfiliate-POC-Script" },
  });
  if (!response.ok) {
    throw new Error(
      `Landing page returned ${response.status} ${response.statusText}`,
    );
  }
  console.log(
    "Landing page fetched successfully. Continue with wallet connect.",
  );
};

const postWalletConnect = async () => {
  stepBanner("Step B · Wallet connect S2S");
  const body = {
    eventType: "wallet_connect",
    walletAddress,
    referralCode,
    metadata: { source: "tapfiliate-poc-script" },
  };
  console.log("Payload:\n", pretty(body));
  const response = await fetchJson(eventsEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  console.log("Tapfiliate wallet response:\n", pretty(response));
};

const postConversion = async () => {
  stepBanner("Step C · Conversion S2S");
  const body = {
    eventType: "conversion",
    walletAddress,
    referralCode,
    amount,
    currency,
    conversionId,
    metadata: { source: "tapfiliate-poc-script", description: "POC $10" },
  };
  console.log("Payload:\n", pretty(body));
  const response = await fetchJson(eventsEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  console.log("Tapfiliate conversion response:\n", pretty(response));
};

const run = async () => {
  await hitLandingPage();
  await postWalletConnect();
  await postConversion();
  console.log(
    "\nPOC complete. Check server logs and Tapfiliate dashboard for TEST data.",
  );
};

run().catch((error) => {
  console.error("Tapfiliate POC failed:", error.message);
  process.exit(1);
});
