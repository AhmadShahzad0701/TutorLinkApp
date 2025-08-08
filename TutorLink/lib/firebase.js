// lib/firebase.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDbxnjtTjwlh7RjRA3ocJGttMkdb15ApJ4",
  authDomain: "tutorlink-d91bd.firebaseapp.com",
  projectId: "tutorlink-d91bd",
  storageBucket: "tutorlink-d91bd.appspot.com",
  messagingSenderId: "736175499828",
  appId: "1:736175499828:web:12da09e77c20e65d4b3861",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth with AsyncStorage persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    console.log("Testing Firebase connection...");
    console.log("App name:", app.name);
    console.log("Project ID:", app.options.projectId);
    console.log("Storage bucket:", app.options.storageBucket);
    
    // Test auth
    console.log("Auth instance:", !!auth);
    console.log("Current user:", auth.currentUser?.uid || 'No user');
    
    // Test storage
    console.log("Storage instance:", !!storage);
    
    return true;
  } catch (error) {
    console.error("Firebase connection test failed:", error);
    return false;
  }
};

export { app, auth, db, storage };
