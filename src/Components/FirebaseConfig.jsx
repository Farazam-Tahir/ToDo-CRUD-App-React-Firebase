import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// configuring firbase
const firebaseConfig = {
  apiKey: "AIzaSyBC8Vvc-7M8g6uyBbJNmWJp7di-aPRvKGs",
  authDomain: "todoreact-cf669.firebaseapp.com",
  projectId: "todoreact-cf669",
  storageBucket: "todoreact-cf669.appspot.com",
  messagingSenderId: "99466755230",
  appId: "1:99466755230:web:8378f3c9def08407d6cf8f"
};

// initiallizing firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
