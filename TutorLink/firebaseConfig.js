// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCKmc0PjCQwCW9eGCQLPLPkeUc8MJDWOec",
  authDomain: "tutorlinkapp-a8eca.firebaseapp.com",
  projectId: "tutorlinkapp-a8eca",
  storageBucket: "tutorlinkapp-a8eca.firebasestorage.app",
  messagingSenderId: "111883632880",
  appId: "1:111883632880:web:e9665a801465aebc6c4235",
  measurementId: "G-M364P7VL1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Firebase features
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

