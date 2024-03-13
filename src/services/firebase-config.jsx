import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHqxQkvpyGMf1dObMpZH_WE1lMTwsO1l0",
  authDomain: "obatagxr.firebaseapp.com",
  projectId: "obatagxr",
  storageBucket: "obatagxr.appspot.com",
  messagingSenderId: "770015029510",
  appId: "1:770015029510:web:4461e64db5647e258ed687",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;

export const storage = getStorage(app);
