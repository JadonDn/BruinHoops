import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getAnalytics } from "firebase/analytics"
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDM50IoA5Ah4Na_h5fyHBIHDPrONjtZ9jk",
  authDomain: "bruin-hoops.firebaseapp.com",
  databaseURL: "https://bruin-hoops-default-rtdb.firebaseio.com",
  projectId: "bruin-hoops",
  storageBucket: "bruin-hoops.appspot.com",
  messagingSenderId: "133820248934",
  appId: "1:133820248934:web:20b9bb7e3729c3f2668ea7",
  measurementId: "G-JNL13FVSXB"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const storage = getStorage();


