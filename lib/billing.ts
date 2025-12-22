import { db } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function activateBot(
  botId: string,
  paymentMethod: "ziina" | "paypal",
  paymentId: string
) {
  const now = Date.now();
  const expiresAt = now + 30 * 24 * 60 * 60 * 1000;

  const ref = doc(db, "bots", botId);
  await updateDoc(ref, {
    active: true,
    startedAt: now,
    expiresAt,
    paymentMethod,
    paymentId
  });
}
