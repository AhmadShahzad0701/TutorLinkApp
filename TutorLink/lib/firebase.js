
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbxnjtTjwlh7RjRA3ocJGttMkdb15ApJ4",
  authDomain: "tutorlink-d91bd.firebaseapp.com",
  projectId: "tutorlink-d91bd",
  storageBucket: "tutorlink-d91bd.appspot.com",
  messagingSenderId: "736175499828",
  appId: "1:736175499828:web:12da09e77c20e65d4b3861",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

const db = getFirestore(app);

export { app, auth, db };

