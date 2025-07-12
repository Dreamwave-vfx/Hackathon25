import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJUIfAAQp7LcZ5_-QdmJrePQODa__SwKg",
  authDomain: "hackathon25-86504.firebaseapp.com",
  projectId: "hackathon25-86504",
  storageBucket: "hackathon25-86504.firebasestorage.app",
  messagingSenderId: "796636444626",
  appId: "1:796636444626:web:1a6a8c2f6b84195b8afa0b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Save to localStorage
    localStorage.setItem("email", user.email);
    localStorage.setItem("uid", user.uid);
    localStorage.setItem("profilePic", user.photoURL);

    return user; // ✅ VERY IMPORTANT
  } catch (error) {
    console.error("Sign-in failed:", error);
    throw error;
  }
};
