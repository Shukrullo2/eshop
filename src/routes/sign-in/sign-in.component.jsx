import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";
import { useState } from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import "./sign-in.styles.scss";

const SignIn = () => {
  const defaultFields = {
    email: '',
    password: '',
  };
  const [ formFields, setFormFields ] = useState(defaultFields);
  const { email, password } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <div className="sign-in-container">
      <h1>I am the sign in</h1>
      <FormInput
        label="Email"
        type="text"
        name="email"
        value={email}
        onChange={handleChange}
        required
      />
      <FormInput
        label="Email"
        type="text"
        name="email"
        value={password}
        onChange={handleChange}
        required
      />
      <Button onClick={logGoogleUser}>Sign In</Button>
      <Button buttonType="google" onClick={logGoogleUser}>
        Sign in with Google
      </Button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
