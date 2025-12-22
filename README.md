# Entrestate DM AI

Turn your Instagram DMs into a Dubai real estate expert.

This repo is a Next.js 14 + Firebase + OpenAI project wired with:

- Multi-tenant bot architecture (one bot per brand)
- AI chat endpoint using OpenAI
- Shareable chat page per bot
- Dashboard skeleton for brand, listings, and market data
- Ziina payment gateway integration (UAE)
- PayPal payment integration (global)
- **Entrestate Market Engine** snapshot integrated as Dubai projects brain
- CSV export of all projects for sheets and reports

## Tech

- Next.js 14 (App Router)
- React 18
- TailwindCSS
- Firebase (Firestore)
- OpenAI Chat Completions
- Ziina PaymentIntent API
- PayPal Orders API
- Local JSON snapshot of Entrestate projects

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy env:

```bash
cp .env.example .env.local
```

Fill in:

- `OPENAI_API_KEY`
- Firebase public config
- Ziina token and base URL
- PayPal client credentials
- `ENTRESTATE_CITY_LABEL` if you want a custom city label
- `NEXT_PUBLIC_CLIENT_BOT_BASE_URL` for the public share link (`https://entrestate.com/bot`)
- `NEXT_PUBLIC_DEFAULT_BOT_ID` so the dashboard knows which bot to load on boot

3. Firestore collections:

Create:

- `bots`
- `listings`
- `events` (optional for v1)

`bots/{botId}` fields:

- `brand_name`, `city_focus`, `tone`, `whatsapp_number`
- `active` (boolean), `expiresAt` (epoch ms), `startedAt` (epoch ms)

`listings` documents (scoped by `botId`):

- `botId`
- `title`, `area`, `type`, `purpose`, `status`, `handover`
- `price_aed`, `beds`, `baths`
- `key_points` (string array)
- `active` (boolean)

`events` documents (also scoped by `botId`):

- `title`, `type`
- `start_datetime` (epoch ms) and `location`
- `related_project`, `short_description`, `cta_text`
- `active` (boolean)

Create a demo bot doc with id `demo-bot`:

```json
{
  "brand_name": "Demo Real Estate",
  "city_focus": "Dubai",
  "tone": "friendly expert",
  "whatsapp_number": "+9715XXXXXXX",
  "active": true
}
```

4. Run dev:

```bash
npm run dev
```

Open http://localhost:3000.

- Demo bot: `/bot/demo-bot`
- Dashboard: `/dashboard`
- Market Engine viewer: `/dashboard/projects`
- Projects API: `/api/projects`
- Projects CSV export: `/api/projects/export`

## Dashboard + multi-brand control

- Append `?botId=<id>` on any dashboard URL or use the in-app switcher to jump between clients. Every Firestore query filters by the active bot ID.
- The banner surfaces the share link (`NEXT_PUBLIC_CLIENT_BOT_BASE_URL`), iframe embed code, and the IG DM instructions PDF.

### Brand tab

- Writes to `bots/{botId}` for brand name, tone, city focus, and WhatsApp routing. Billing webhooks still manage `active` and `expiresAt`.

### Listings tab

- CRUD for Firestore `listings`. Add/edit/delete listings, toggle `active`, and maintain key bullets. These listings flow straight into the system prompt.

### Events tab

- CRUD for Firestore `events`. Schedule webinars, launches, or open houses. Only `active` events are injected into the prompt so the bot can pitch them.

### IG DM instructions PDF

- `/api/instructions/ig?botId=<id>&brand=<name>` streams a PDF checklist (linked directly in the dashboard). It includes the webhook steps plus ready-to-paste embed snippet for `https://entrestate.com/bot/<id>`.

### Projects dataset schema

- `data/entrestate_projects_raw.json` = raw dump from Entrestate/Realiste
- `scripts/buildFullProjects.ts` + `npm run build:projects` = generates `data/entrestate_projects_full.json`
- `lib/entrestate.ts` + the dashboard = read/edit/export the enriched schema

Each record exposes:

- `id`, `name`, `slug`, `city`
- `developer`, `area`, `subArea`
- `propertyTypes`, `status`
- `priceFromAED`, `priceNote`
- `handover`, `paymentPlan`
- `yieldEstimate`, `bestFor`
- `keyPoints`, `description`
- `imageUrl`, `externalRef`
- `tags`, `updatedAt`

Workflow: regenerate the skeleton with `npm run build:projects`, fill the JSON (or export to Sheets and re-import), and keep quick overrides in `data/project_overrides.json` if you need fast fixes. Everything merges automatically into the dashboard and prompt builder.

If you receive the richer AI datastore (`data/entrestate_ai_datastore_v2.json`), drop it into `data/` and call the helpers in
`lib/datastore.ts`. Those helpers let you fetch project/developer entities, places, and pre-written project briefs so the
bot prompt can quote developer, area, price, and yield data without extra scraping.

## Payments

### Ziina (UAE)

Endpoint: `POST /api/payments/ziina/create`

Body:

```json
{
  "amount": 3700,
  "botId": "demo-bot",
  "userId": "USER_ID",
  "message": "Entrestate DM AI – 1 Month"
}
```

Server calls Ziina `/api/payment_intent` and returns `redirect_url`.

Success URL: `/api/payments/ziina/success?botId=...`  
This marks the bot active for 30 days.

### PayPal (Global)

Endpoint: `POST /api/payments/paypal/create`

Body:

```json
{
  "amount": 10,
  "botId": "demo-bot",
  "userId": "USER_ID"
}
```

Server creates a PayPal order and returns `approval_url`.

Return URL: `/api/payments/paypal/capture?botId=...&token=ORDER_ID`  
This captures the order and activates the bot.

## Entrestate Market Engine

- `data/entrestate_projects_raw.json` holds the raw dump from Realiste/Entrestate.
- `data/entrestate_projects_full.json` is the enriched dataset generated by `npm run build:projects`.
- `scripts/buildFullProjects.ts` creates the skeleton so you can work from Sheets or JSON without touching code.
- `lib/entrestate.ts` loads the full dataset, applies `data/project_overrides.json`, and exposes it to the prompt + dashboard.
- `data/entrestate_ai_datastore_v2.json` (optional) is the WhatMap-style datastore containing entities, places, and project documents.
- `lib/datastore.ts` exposes helpers (`getProjectEntities`, `getDeveloperEntities`, `getProjectDocuments`, etc.) to query that datastore.
- `lib/prompt.ts` injects up to 60 projects into the system prompt, plus your listings and events.
- `/api/projects` exposes all projects as JSON.
- `/api/projects/export` provides a CSV for sheets and reports.

The bot will:

- Prefer your own listings when they exist.
- Fall back to the Entrestate Market Engine projects list when answering about Dubai market.
- Always drive WhatsApp capture when the user shows buying or investing intent.

## What You Still Need To Wire

- Auth (Firebase Auth or NextAuth) to provide real `userId`.
- Dashboard forms to actually write to Firestore (`bots`, `listings`, `events`).
- IG DM integration (Meta API or a bridge) that forwards messages to `/api/bot/[botId]/chat`.

The AI core, Entrestate Market Engine brain, and payment flows are ready.
