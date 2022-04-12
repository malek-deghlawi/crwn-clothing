import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { async } from "@firebase/util";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
const SignIn = () => {
    // This Commented Code is for Sigin in with Google Redirect
//   useEffect(async () => {
//     const response =  await getRedirectResult(auth);
//     console.log(response);
//     if(response){
//         const userDocRef = await createUserDocumentFromAuth(response.user);
//     }
//   }, []);
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign In page</h1>
      <button onClick={logGoogleUser}>Sigin in with Google Poupup</button>
      <SignUpForm></SignUpForm>
    </div>
  );
};

export default SignIn;
