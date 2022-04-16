import { async } from "@firebase/util";
import { useState } from "react";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  creatAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.style.scss";

const defultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defultFormFields);
  const { email, password } = formFields;
  const resetForm = () => {
    setFormFields(defultFormFields);
  };
  // This Commented Code is for Sigin in with Google Redirect
  //   useEffect(async () => {
  //     const response =  await getRedirectResult(auth);
  //     console.log(response);
  //     if(response){
  //         const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   }, []);
  const SignInWithGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetForm();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("no user found for this email");
          break;
        case "auth/wrong-password":
          alert("incorrect password");
          break;
        default:
          console.log(error.code);
          break;
      }
    }
  };
  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign In with you email and password</span>
      <form onSubmit={handelSubmit}>
        <FormInput
          label={"Email"}
          type="email"
          required
          onChange={handelChange}
          name="email"
          value={email}
        />
        <FormInput
          label={"Password"}
          type="password"
          required
          onChange={handelChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            value="Cancel"
            buttonType={"google"}
            onClick={SignInWithGoogleUser}
          >
            Google SignIn
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
