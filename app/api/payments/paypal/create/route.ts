import { NextResponse } from "next/server";
import { getPayPalAccessToken } from "@/lib/paypal";

export async function POST(req: Request) {
  try {
    const { amount, botId, userId } = await req.json();

    if (!amount || !botId || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const accessToken = await getPayPalAccessToken();

    const return_url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/paypal/capture?botId=${botId}`;
    const cancel_url = `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`;

    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: process.env.PAYPAL_CURRENCY_CODE || "USD",
            value: amount.toString()
          },
          description: "Entrestate DM AI – 1 Month"
        }
      ],
      application_context: {
        return_url,
        cancel_url
      }
    };

    const resp = await fetch(`${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error("PayPal create error:", data);
      return NextResponse.json({ error: "PayPal error", details: data }, { status: 500 });
    }

    const approvalLink = (data.links || []).find((l: any) => l.rel === "approve")?.href;
    if (!approvalLink) {
      return NextResponse.json({ error: "No approval URL from PayPal" }, { status: 500 });
    }

    return NextResponse.json({
      orderId: data.id,
      approval_url: approvalLink
    });
  } catch (err: any) {
    console.error("PayPal create error", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
