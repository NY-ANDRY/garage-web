import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signOut, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBqj800od4AEAls_-i0HohmX7hQA36jj-I",
  authDomain: "garage-44cc0.firebaseapp.com",
  databaseURL: "https://garage-44cc0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "garage-44cc0",
  storageBucket: "garage-44cc0.firebasestorage.app",
  messagingSenderId: "984512474289",
  appId: "1:984512474289:web:6a4162d7f8ddae20d78690",
  measurementId: "G-0GMMY6VPJN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const realtimeDb = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const messaging = getMessaging(app);

export {
  app, realtimeDb, firestore, analytics,
  auth, googleProvider, getRedirectResult,
  signInWithRedirect, signInWithPopup, signOut,
  messaging
};