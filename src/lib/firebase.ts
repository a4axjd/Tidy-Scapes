// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcCs2cWNYiPaanSJXb72nMNXxO_vq6fk4",
  authDomain: "tidyscapes-digital.firebaseapp.com",
  projectId: "tidyscapes-digital",
  storageBucket: "tidyscapes-digital.firebasestorage.app",
  messagingSenderId: "122387321115",
  appId: "1:122387321115:web:d4e7bea5493a8e4ac683be"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
