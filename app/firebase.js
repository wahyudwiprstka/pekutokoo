import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvJqcDq2miKAM9D_Je_3tw_zEVhlDu9-U",
  authDomain: "marketplace-desa-pekutatan.firebaseapp.com",
  projectId: "marketplace-desa-pekutatan",
  storageBucket: "marketplace-desa-pekutatan.appspot.com",
  messagingSenderId: "754948252710",
  appId: "1:754948252710:web:81026bdef3a174f647f2e7",
  measurementId: "G-ZFN4YB7WES",
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
