// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const FBconfig = process.env;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FBconfig.FIREBASE_API_KEY,
  authDomain: FBconfig.FIREBASE_AUTH_DOMAIN,
  projectId: FBconfig.FIREBASE_PROJECT_ID,
  storageBucket: FBconfig.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FBconfig.FIREBASE_MESSAGING_SENDER_ID,
  appId: FBconfig.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);