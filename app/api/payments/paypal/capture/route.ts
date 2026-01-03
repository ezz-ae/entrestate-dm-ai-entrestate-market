import { NextRequest, NextResponse } from "next/server";
import { getPayPalAccessToken } from "@/lib/paypal";
import { activateBot } from "@/lib/billing";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const botId = url.searchParams.get("botId");
    const token = url.searchParams.get("token");

    if (!botId || !token) {
      return NextResponse.redirect(new URL("/payment/error", req.url));
    }

    const accessToken = await getPayPalAccessToken();

    const resp = await fetch(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${token}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error("PayPal capture error:", data);
      return NextResponse.redirect(new URL("/payment/error", req.url));
    }

    await activateBot(botId, "paypal", token);
    return NextResponse.redirect(new URL(`/payment/success?botId=${botId}`, req.url));
  } catch (err: any) {
    console.error("PayPal capture route error", err);
    return NextResponse.redirect(new URL("/payment/error", req.url));
  }
}
