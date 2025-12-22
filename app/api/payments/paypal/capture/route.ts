import { NextResponse } from "next/server";
import { getPayPalAccessToken } from "@/lib/paypal";
import { activateBot } from "@/lib/billing";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const botId = url.searchParams.get("botId");
    const token = url.searchParams.get("token");

    if (!botId || !token) {
      return NextResponse.redirect("/payment/error");
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
      return NextResponse.redirect("/payment/error");
    }

    await activateBot(botId, "paypal", token);
    return NextResponse.redirect(`/payment/success?botId=${botId}`);
  } catch (err: any) {
    console.error("PayPal capture route error", err);
    return NextResponse.redirect("/payment/error");
  }
}
