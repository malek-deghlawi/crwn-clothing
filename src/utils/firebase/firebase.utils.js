import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore/lite";
// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiujFo0ih7z7GIctqj06zcSOE7JdoSfB4",
  authDomain: "crwn-clothing-db-fcef1.firebaseapp.com",
  projectId: "crwn-clothing-db-fcef1",
  storageBucket: "crwn-clothing-db-fcef1.appspot.com",
  messagingSenderId: "538751824129",
  appId: "1:538751824129:web:eac37b71c1adef29b6eb00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider  =new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
});

export const auth=getAuth();
export const signInWithGooglePopup = ()=>signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth)=>{
    const userDocRef=doc(db,'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot =  await getDoc(userDocRef);

    console.log(userSnapshot.exists());
    if(!userSnapshot.exists()){
        const {displayName , email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log("error creating the user ",error.message);
        }
    }
    return userDocRef;
};
