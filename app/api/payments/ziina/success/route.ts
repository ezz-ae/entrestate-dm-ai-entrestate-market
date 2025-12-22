import { NextResponse } from "next/server";
import { activateBot } from "@/lib/billing";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const botId = url.searchParams.get("botId");
  const paymentIntentId = url.searchParams.get("payment_intent_id") || "unknown";

  if (!botId) {
    return NextResponse.redirect("/payment/error");
  }

  await activateBot(botId, "ziina", paymentIntentId);
  return NextResponse.redirect(`/payment/success?botId=${botId}`);
}
