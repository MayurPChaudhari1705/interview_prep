import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyABYD8sspWOgi6C6zXRadkFfeIm-1cSDCM",
  authDomain: "interview-prep-abef4.firebaseapp.com",
  projectId: "interview-prep-abef4",
  storageBucket: "interview-prep-abef4.firebasestorage.app",
  messagingSenderId: "609342040721",
  appId: "1:609342040721:web:159957cba675b17f24ed30",
  measurementId: "G-C6EQ9Q1W1B"
};


const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app);
export const db = getFirestore(app);


