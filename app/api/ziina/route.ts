
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

const ZIINA_API_KEY = process.env.ZIINA_API_KEY;
const ZIINA_API_URL = "https://api.ziina.com/v2/charges";

async function createZiinaCharge(amount: number, userEmail: string, userId: string, plan: string) {
  if (!ZIINA_API_KEY) {
    throw new Error("Ziina API key is not configured.");
  }

  const response = await fetch(ZIINA_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${ZIINA_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount * 100, // Amount in fils
      currency: "AED",
      payment_method_types: ["card"],
      metadata: {
        userId,
        userEmail,
        plan,
      },
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding/payment/success?session_id={session_id}`,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Ziina API error: ${error.message || 'Unknown error'}`);
  }

  return response.json();
}

export async function POST(req: NextRequest) {
  try {
    const { userId, userEmail, plan } = await req.json();

    if (!userId || !userEmail || !plan) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let amount = 0;
    if (plan === "standard") {
      amount = 399; // Price in AED
    } else if (plan === "premium") {
      amount = 799;
    } else {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const charge = await createZiinaCharge(amount, userEmail, userId, plan);

    // Save the payment intent details to the user's profile
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      "subscription.plan": plan,
      "subscription.status": "pending",
      "subscription.paymentId": charge.id,
      "subscription.createdAt": new Date(),
    });

    return NextResponse.json({ paymentUrl: charge.url });

  } catch (error: any) {
    console.error("Ziina payment initiation failed:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
