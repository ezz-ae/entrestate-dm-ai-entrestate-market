import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { amount, botId, userId, message } = await req.json();

    if (!amount || !botId || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const operation_id = crypto.randomUUID();

    const payload = {
      amount,
      currency_code: process.env.ZIINA_CURRENCY_CODE,
      message: message ?? "Entrestate DM AI – 1 Month",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/ziina/success?botId=${botId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
      failure_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failure`,
      test: process.env.ZIINA_TEST_MODE === "true",
      expiry: (Date.now() + 2 * 60 * 60 * 1000).toString(),
      allow_tips: false,
      operation_id
    };

    const resp = await fetch(`${process.env.ZIINA_BASE_URL}/api/payment_intent`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.ZIINA_SECRET_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (!resp.ok) {
      console.error("Ziina error:", data);
      return NextResponse.json({ error: "Ziina error", details: data }, { status: 500 });
    }

    return NextResponse.json({
      redirect_url: data.redirect_url,
      paymentIntentId: data.id,
      operation_id
    });
  } catch (err: any) {
    console.error("Ziina create error", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
