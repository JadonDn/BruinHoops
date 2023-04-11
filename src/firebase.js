import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getAnalytics } from "firebase/analytics"
import { getStorage } from "firebase/storage";


const firebaseConfig = {
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const storage = getStorage();


