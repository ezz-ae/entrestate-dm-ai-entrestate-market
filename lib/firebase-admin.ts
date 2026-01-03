
import * as admin from 'firebase-admin';

// Check if the app is already initialized to prevent errors
if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (projectId && clientEmail && privateKey) {
    try {
      // Initialize the app with credentials from environment variables.
      // This is the recommended approach for server-side environments like Vercel.
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: projectId,
          clientEmail: clientEmail,
          privateKey: privateKey,
        }),
      });
    } catch (error) {
      console.error('Firebase admin initialization error', error);
    }
  } else {
    console.warn('Firebase admin SDK environment variables not fully set. Skipping initialization.');
  }
}

// Export the admin services
export const adminAuth = admin.apps.length ? admin.auth() : ({} as admin.auth.Auth);
export const adminDb = admin.apps.length ? admin.firestore() : ({} as admin.firestore.Firestore);
