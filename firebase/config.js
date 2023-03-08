import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDewRqCi0SIs9cr-AeA7FumUCZfsDYjnKY",
  authDomain: "native-c21f9.firebaseapp.com",
  projectId: "native-c21f9",
  storageBucket: "native-c21f9.appspot.com",
  messagingSenderId: "721635560521",
  appId: "1:721635560521:web:657ba171915a4086148398"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app);

export const storage = getStorage(app);