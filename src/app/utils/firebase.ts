// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBybDsFVSdWz2Ff5rQeSOI5u79cFPzKHTA",
  authDomain: "resume-37183.firebaseapp.com",
  projectId: "resume-37183",
  storageBucket: "resume-37183.firebasestorage.app",
  messagingSenderId: "223052394849",
  appId: "1:223052394849:web:ae265a262407b393d89520",
  measurementId: "G-76CJR9DYR4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
