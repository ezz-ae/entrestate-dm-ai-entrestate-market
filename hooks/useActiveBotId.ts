"use client";

import { useSearchParams } from "next/navigation";

const DEFAULT_BOT_ID = process.env.NEXT_PUBLIC_DEFAULT_BOT_ID || "demo-bot";

export function useActiveBotId() {
  const params = useSearchParams();
  const queryBotId = params.get("botId")?.trim();
  return queryBotId && queryBotId.length > 0 ? queryBotId : DEFAULT_BOT_ID;
}
