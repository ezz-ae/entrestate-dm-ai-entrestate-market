import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { buildSystemPrompt } from "@/lib/prompt";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(
  req: Request,
  { params }: { params: { botId: string } }
) {
  try {
    const { messages } = await req.json();
    const botId = params.botId;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 });
    }

    const lastUser = [...messages].reverse().find((m: any) => m.role === "user");
    const userQuestion = lastUser?.content ?? "";

    const botSnap = await getDoc(doc(db, "bots", botId));
    if (!botSnap.exists()) {
      return NextResponse.json({ error: "Bot not found" }, { status: 404 });
    }

    const botData = botSnap.data() as any;

    const listingsRef = collection(db, "listings");
    const listingsQ = query(listingsRef, where("botId", "==", botId), where("active", "==", true));
    const listingsSnap = await getDocs(listingsQ);
    const listings = listingsSnap.docs.map((d) => d.data() as any);

    const eventsRef = collection(db, "events");
    const eventsQ = query(eventsRef, where("botId", "==", botId), where("active", "==", true));
    const eventsSnap = await getDocs(eventsQ);
    const events = eventsSnap.docs.map((d) => d.data() as any);

    const systemPrompt = buildSystemPrompt(
      {
        brand_name: botData.brand_name ?? "Your Brand",
        city_focus: botData.city_focus ?? "Dubai",
        tone: botData.tone ?? "friendly expert",
        whatsapp_number: botData.whatsapp_number ?? "+9715xxxxxxx"
      },
      listings,
      events,
      userQuestion
    );

    const payloadMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: payloadMessages as any,
      temperature: 0.4
    });

    const reply = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("Bot chat error", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
