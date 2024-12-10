// src/firebase/FirebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAo6c4uJrnXrmLtmRP6pJMemHuUnru-wx8",
  authDomain: "auth-2242e.firebaseapp.com",
  projectId: "auth-2242e",
  storageBucket: "auth-2242e.firebasestorage.app",
  messagingSenderId: "337503772086",
  appId: "1:337503772086:web:cd45a3b5e7f9d84c927517"
};

const app = initializeApp(firebaseConfig);

// Get Firebase Authentication instance
export const auth = getAuth(app);
