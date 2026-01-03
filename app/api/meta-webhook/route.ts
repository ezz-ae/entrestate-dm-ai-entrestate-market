
import { type NextRequest } from 'next/server'
import crypto from 'crypto';
import { getBotByInstagramPageId } from '@/lib/datastore';

/**
 * Handles GET requests for webhook verification.
 * https://developers.facebook.com/docs/messenger-platform/webhooks#verification-requests
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  // Check if a token and mode is in the query string of the request
  if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
    // Responds with the challenge token from the request
    console.log('WEBHOOK_VERIFIED');
    return new Response(challenge, { status: 200 })
  } else {
    // Responds with '403 Forbidden' if verify tokens do not match
    return new Response('Forbidden', { status: 403 })
  }
}

/**
 * Handles POST requests with webhook events.
 * https://developers.facebook.com/docs/messenger-platform/webhooks#event-notifications
 */
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-hub-signature-256') || '';

  if (!validateSignature(rawBody, signature)) {
    return new Response('Invalid signature', { status: 401 });
  }

  const body = JSON.parse(rawBody);
  console.log('Received webhook event:', JSON.stringify(body, null, 2));

  if (body.object === 'instagram') {
    for (const entry of body.entry) {
      for (const event of entry.messaging) {
        if (event.message) {
          await handleMessage(event, request.nextUrl.origin);
        }
      }
    }
  }

  // Respond with 200 OK to acknowledge receipt
  return new Response('EVENT_RECEIVED', { status: 200 });
}

async function handleMessage(event: any, origin: string) {
  const senderId = event.sender.id; // User's Instagram ID
  const messageText = event.message.text;
  const recipientId = event.recipient.id; // Your Instagram Page ID

  // 1. Find the corresponding bot using the Instagram Page ID
  const bot = await getBotByInstagramPageId(recipientId);

  if (!bot) {
    console.error(`No bot found for Instagram Page ID: ${recipientId}`);
    return; // Stop processing if no bot is configured
  }

  // 2. Forward message to the bot API
  const botResponse = await fetch(`${origin}/api/bot/${bot.id}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [{ role: 'user', content: messageText }],
      sessionId: senderId, // Use the user's ID as the session ID
    }),
  });

  if (!botResponse.ok) {
    console.error(`Error calling bot API for bot ${bot.id}:`, await botResponse.text());
    return;
  }

  const botReply = await botResponse.text();

  // 3. Send the bot's response back to the user
  await sendInstagramMessage(senderId, botReply, recipientId);
}

async function sendInstagramMessage(recipientId: string, messageText: string, pageId: string) {
  const accessToken = process.env.META_PAGE_ACCESS_TOKEN;
  // Using /me/messages is preferred, but requires the page access token to have the correct permissions.
  // The /<PAGE_ID>/messages endpoint is a fallback.
  const url = `https://graph.facebook.com/v19.0/${pageId}/messages`;

  const payload = {
    recipient: { id: recipientId }, // The user's Instagram ID
    message: { text: messageText },
    messaging_type: 'RESPONSE',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error sending Instagram message:", JSON.stringify(errorData, null, 2));
    }
  } catch (error) {
    console.error("Error in sendInstagramMessage:", error);
  }
}

function validateSignature(rawBody: string, signature: string): boolean {
  if (!process.env.META_APP_SECRET) {
    console.warn("META_APP_SECRET is not set. Signature validation skipped for development.");
    return true; 
  }

  const hash = crypto
    .createHmac('sha256', process.env.META_APP_SECRET)
    .update(rawBody)
    .digest('hex');

  const expectedSignature = `sha256=${hash}`;
  
  if (signature.length !== expectedSignature.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}
