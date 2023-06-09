import { omit } from "lodash";
import { emailRegex } from "../helpers/regex";

export const validateOnChangeSignIn = (name, value, errorMessages) => {
  let errors = { ...errorMessages };
  const newErrors = omit(errors, "loginError");
  errors = newErrors;
  //console.log("errorMeg", errorMessages);
  switch (name) {
    case "email":
      if (value === null || value === "" || value === undefined) {
        errors.emailError = "Email is required.";
      } else if (!emailRegex.test(value)) {
        errors.emailError = "Please enter a valid email";
      } else {
        const newErrors = omit(errors, "emailError");
        errors = newErrors;
      }
      break;
    case "password":
      if (value === null || value === "" || value === undefined) {
        errors.passwordError = "Password is required.";
      } else {
        const newErrors = omit(errors, "passwordError");
        errors = newErrors;
      }
      break;
    default:
      break;
  }
  return errors;
};

// validate On Submit method SignIn

export const validateOnSubmitSignIn = (value) => {
  let errors = {};
  const email = value?.email;
  const password = value?.password;

  if (email === null || email === "" || email === undefined) {
    errors.emailError = "This field is required.";
  } else if (!emailRegex.test(email)) {
    errors.emailError = "Please enter a valid email";
  }

  if (password === null || password === "" || password === undefined) {
    errors.passwordError = "This field is required.";
  }
  return errors;
};
