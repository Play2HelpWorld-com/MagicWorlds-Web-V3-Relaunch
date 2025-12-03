---
# 🌌 MagicWorlds V3

MagicWorlds V3 is the next-generation web experience for immersive digital adventures.
Built with **Next.js**, it combines performance, scalability, and modular architecture to power a connected world of creativity, gaming, and community.
---

## 🚀 Features

- ⚡ **Next.js 14 Framework** – Fast, modern, and optimized for performance
- 🎨 **Dynamic UI Components** – Modular and reusable interface blocks
- 🔗 **API-Ready Structure** – Built to integrate with backend and third-party APIs
- 🪙 **Web3-Ready (Optional)** – Supports blockchain-based features for in-game tokens and rewards
- 🧩 **Developer Friendly** – Organized codebase with clear folder structure and environment setup

---

## 🛠️ Installation

Follow these steps to install and set up the project on your local environment.

1. **Download and extract** the template from **Next.js Templates**

2. Navigate to the project directory:

```bash
   cd magicworlds-v3
```

3. **Install all dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   Once it’s ready, the app will be available at:
   👉 [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

Comprehensive documentation is included with the template, covering:

- Integration guides
- API setup and configuration
- Environment variables
- Deployment best practices

---

## 💡 Contributing

We welcome contributions!
Please fork the repository, create a new branch for your feature or bug fix, and submit a pull request.

---

## 🧠 License

This project is licensed under the **MIT License** — free to use, modify, and distribute with attribution.

---

## 🌠 About

**MagicWorlds** is a digital universe — blending technology, creativity, and community.
Stay tuned for new module updates, in-game integrations, and ecosystem tools.

> “Where imagination meets innovation — welcome to MagicWorlds.”

---

## 🔁 Tapfiliate S2S Proof of Concept

Use this runbook to validate the `/api/tapfiliate/events` route against the Tapfiliate v1.7 API. The dev server (`npm run dev`) must be running and the following environment variables configured:

- `TAPFILIATE_API_KEY` – Required, provided by Tapfiliate dashboard.
- `TAPFILIATE_BASE_URL` – Optional. Defaults to `https://tapfiliate.com/api/1.7`.

### Step A · Capture the referral

Visit the play page with the referral query parameter so the browser stores it locally:

```
http://localhost:3000/play?ref=TESTPOC_DAMI_001
```

> Replace the host with your deployed URL if you are testing in staging or production.

### Step B/C · Fire wallet + revenue events

Run the helper script to trigger both S2S calls through the Next.js route:

```bash
npm run tapfiliate:poc -- \
   --base-url http://localhost:3000 \
   --wallet 0xYourWalletHere \
   --ref TESTPOC_DAMI_001 \
   --amount 10 \
   --currency USD
```

The script performs three actions:

1. `GET /play?ref=…` (sanity check)
2. `POST /api/tapfiliate/events` with `eventType="wallet_connect"`
3. `POST /api/tapfiliate/events` with `eventType="conversion"`

Every request logs a trace ID plus Tapfiliate status in the Next.js server console. Confirm that both events return HTTP 200 and then verify the Tapfiliate dashboard shows a customer and a $10 conversion attributed to `TESTPOC_DAMI_001`.

To customize values, pass `--conversion-id`, `--amount`, or set the corresponding `TAPFILIATE_POC_*` environment variables before running the script.

```

```
