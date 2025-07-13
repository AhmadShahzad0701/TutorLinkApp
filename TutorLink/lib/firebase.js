// lib/firebase.js

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDbxnjtTjwlh7RjRA3ocJGttMkdb15ApJ4",
  authDomain: "tutorlink-d91bd.firebaseapp.com",
  projectId: "tutorlink-d91bd",
  storageBucket: "tutorlink-d91bd.appspot.com",
  messagingSenderId: "736175499828",
  appId: "1:736175499828:web:12da09e77c20e65d4b3861",
};

// Initialize Firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth for React Native with AsyncStorage persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  // Fallback if already initialized
  auth = getAuth(app);
}

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };

