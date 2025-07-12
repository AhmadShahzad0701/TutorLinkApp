// Import Firebase SDKs
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDbxnjtTjwlh7RjRA3ocJGttMkdb15ApJ4",
  authDomain: "tutorlink-d91bd.firebaseapp.com",
  projectId: "tutorlink-d91bd",
  storageBucket: "tutorlink-d91bd.firebasestorage.app",
  messagingSenderId: "736175499828",
  appId: "1:736175499828:web:12da09e77c20e65d4b3861"
};

// Initialize app once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { app, auth, db };

