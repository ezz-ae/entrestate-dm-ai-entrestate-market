import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// NOTE: This file is for client-side Firebase initialization.
// For server-side operations, use lib/firebase-admin.ts.

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// --- User Data Structure ---
// This is a reference for the expected structure of user documents in Firestore.
export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: 'admin' | 'user'; // Added role for access control
}

// --- Firebase Services ---

// Initialize Firebase app if it hasn't been already
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get a Firestore instance
export const db = getFirestore(app);
