import { doc, getDoc } from "firebase/firestore";
import db from "./firebase-config";

const getData = async (code) => {
  const docRef = doc(db, "Redeemed", code);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export default getData;
