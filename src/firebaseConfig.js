// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbfBetiZWxBqN1qSl4E4tpqjX5fUJltyw",
  authDomain: "contacts-bb7a1.firebaseapp.com",
  projectId: "contacts-bb7a1",
  storageBucket: "contacts-bb7a1.firebasestorage.app",
  messagingSenderId: "519409435907",
  appId: "1:519409435907:web:78c597fb4f211a0fc9d536",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
