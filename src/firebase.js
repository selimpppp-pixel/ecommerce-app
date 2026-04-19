import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDavojWCJEf3xVNj_5uRXu3fuzb3jt8imM",
  authDomain: "ecommerce-app-12da4.firebaseapp.com",
  projectId: "ecommerce-app-12da4",
  storageBucket: "ecommerce-app-12da4.firebasestorage.app",
  messagingSenderId: "532249871345",
  appId: "1:532249871345:web:a608eb31cf427bef0f7a50",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);