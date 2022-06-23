// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATUoUK6fw1d5GojAkbOSWAFtzW9QHD8TM",
  authDomain: "email-password-auth-b5835.firebaseapp.com",
  projectId: "email-password-auth-b5835",
  storageBucket: "email-password-auth-b5835.appspot.com",
  messagingSenderId: "267711319090",
  appId: "1:267711319090:web:a795f8933c20158630c02b",
  measurementId: "G-04NY7YTXWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;