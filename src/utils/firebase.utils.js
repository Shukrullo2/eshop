import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApjKyplIUynPl6Ii6DwIDBLGbM6ec77K8",
  authDomain: "crwn-clothin-db-e7de8.firebaseapp.com",
  projectId: "crwn-clothin-db-e7de8",
  storageBucket: "crwn-clothin-db-e7de8.firebasestorage.app",
  messagingSenderId: "496790932417",
  appId: "1:496790932417:web:a149d9716a30485fef7d40",
  measurementId: "G-L9213XJ031",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("eroor creating the user", error.message);
    }
  }
  return userDocRef;
};
