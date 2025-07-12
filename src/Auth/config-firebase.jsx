import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const email = result.user.email;
      const uid = result.user.uid;
      const profilePic = result.user.photoURL;
      localStorage.setItem("email", email);
      localStorage.setItem("uid", uid);
      localStorage.setItem("profilePic", profilePic);
      window.location.href = "/";
    })
    .catch((error) => {
      console.log(error);
    });
};
