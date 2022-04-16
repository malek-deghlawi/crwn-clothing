import { async } from "@firebase/util";
import { useState } from "react";
import {
  creatAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.style.scss'

const defultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmationPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defultFormFields);
  const { displayName, email, password, confirmationPassword } = formFields;
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmationPassword) {
      alert("Password do not match");
      return;
    }
    try {
      const response = creatAuthUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // return user;
          // console.log("user : ",user);
          const userDocRef = createUserDocumentFromAuth(userCredential.user, {
            displayName,
          });
          // console.log("Done : ",userDocRef);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            alert("Cannot create user , Email already in use");
          }
          alert(error.message);
        });
    } catch (error) {
      console.log("sssss");
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user , Email already in use");
      } else {
        console.error("user creat error : ", error);
      }
    }
  };
  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with you email and password</span>
      <form onSubmit={handelSubmit}>
        <FormInput
          label={"Display Name"}
          type="text"
          required
          onChange={handelChange}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label={"Confirm Passwordß"}
          type="password"
          required
          onChange={handelChange}
          name="confirmationPassword"
          value={confirmationPassword}
        />
        <Button buttonType={' '} type="submit">login </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
