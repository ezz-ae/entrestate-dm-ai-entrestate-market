
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import OpenAI from "openai";

// IMPORTANT! Set the runtime to nodejs
export const runtime = "nodejs";

// Extend the NextRequest to handle potential null bodies
declare module "next/server" {
  interface NextRequest {
    json: () => Promise<any>;
  }
}

// Main API handler
export async function POST(req: NextRequest, { params }: { params: { botId: string } }) {
  const { botId } = params;
  if (!botId) {
    return NextResponse.json({ error: "botId is required" }, { status: 400 });
  }

  // For the public demo bot, we don't need authentication
  if (botId !== "onboarding-demo") {
    // 1. Authenticate the user
    const bearer = req.headers.get("Authorization");
    if (!bearer) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = bearer.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const decodedToken = await adminAuth.verifyIdToken(token);
      const botRef = doc(db, "bots", botId);
      const botSnap = await getDoc(botRef);

      if (!botSnap.exists()) {
        return NextResponse.json({ error: "Bot not found" }, { status: 404 });
      }

      const bot = botSnap.data();
      if (bot.tenantId !== decodedToken.uid) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    } catch (error) {
      console.error("Authentication error", error);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // 2. Parse the request body
  let body;
  try {
    body = await req.json();
  } catch (e) {
    console.warn("Could not parse request body");
    body = {};
  }
  const { messages } = body;
  if (!messages) {
    return NextResponse.json({ error: "messages are required" }, { status: 400 });
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    // 3. Handle the "onboarding-demo" bot separately
    if (botId === "onboarding-demo") {
      const systemPrompt = `
        You are a real estate agent AI assistant. Your goal is to be helpful and professional, and to answer questions about the company and its listings.
        Use the provided context to answer the user\'s question. If you don\'t know the answer, say that you don\'t know.
      `;
      
      const payloadMessages = [
        { role: "system", content: systemPrompt },
        ...messages
      ];

      const completion = await client.chat.completions.create({
        model: "gpt-4-mini",
        messages: payloadMessages as any,
        temperature: 0.4
      });

      const reply = completion.choices[0]?.message?.content ?? "";
      return NextResponse.json({ reply });
    }

    // 4. For other bots, proceed with database lookups
    const botRef = doc(db, "bots", botId);
    const botSnap = await getDoc(botRef);
    const bot = botSnap.data();

    if (!bot) {
      // This case should ideally not be hit due to the earlier check
      return NextResponse.json({ error: "Bot not found" }, { status: 404 });
    }

    await addDoc(collection(db, `bots/${botId}/messages`), {
      ...messages.slice(-1)[0],
      createdAt: new Date()
    });
    
    // Construct system prompt
    const systemPrompt = `
      You are ${bot.name}, a real estate expert representing ${bot.companyName}.
      Your personality should be ${bot.personality}. Your goal is to qualify leads and book meetings.
      
      Company Description: ${bot.companyDescription}
      Market Knowledge: ${bot.marketKnowledge.join(", ")}
      Exclusive Listings: ${bot.exclusiveListings.split('\n').join(', ')}

      Respond to the user, and try to guide them towards a call to action if appropriate.
    `;

    const payloadMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4-mini",
      messages: payloadMessages as any,
      temperature: 0.4
    });

    const reply = completion.choices[0]?.message?.content ?? "";

    await addDoc(collection(db, `bots/${botId}/messages`), {
      role: "assistant",
      content: reply,
      createdAt: new Date()
    });

    return NextResponse.json({ reply });

  } catch (err: any) {
    console.error(`Error for bot ${botId}:`, err.message);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
