// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "khabarghor-2133d.firebaseapp.com",
  projectId: "khabarghor-2133d",
  storageBucket: "khabarghor-2133d.firebasestorage.app",
  messagingSenderId: "665072193856",
  appId: "1:665072193856:web:f061a2e3b816b04338aaa5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app, auth}