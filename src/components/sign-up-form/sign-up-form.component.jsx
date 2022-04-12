import { useState } from "react";

const defultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmationPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defultFormFields);
  const { displayName, email, password, confirmationPassword } = formFields;
  const handelChange = (e) => {
      const {name,value}=e.target;
      setFormFields({...formFields,[name]:value});
  };
  return (
    <div>
      <h1>Sign Up with you email and password</h1>
      <form onSubmit={() => {}}>
        <label htmlFor="">Display Name</label>
        <input
          type="text"
          required
          onChange={handelChange}
          name="displayName"
          value={displayName}
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          required
          onChange={handelChange}
          name="email"
          value={email}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          required
          onChange={handelChange}
          name="password"
          value={password}
        />
        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          required
          onChange={handelChange}
          name="confirmationPasswordß"
          value={confirmationPassword}
        />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default SignUpForm;
