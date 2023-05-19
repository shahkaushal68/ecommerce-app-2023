import { omit } from "lodash";
import { emailRegex } from "../helpers/regex";

export const validateOnChangeRegister = (name, value, errorMessages) => {
  let errors = { ...errorMessages };
  const newErrors = omit(errors, "loginError");
  errors = newErrors;
  //console.log("errorMeg", errorMessages);
  switch (name) {
    case "userName":
      if (value === null || value === "" || value === undefined) {
        errors.userNameError = "Username is required.";
      } else {
        const newErrors = omit(errors, "userNameError");
        errors = newErrors;
      }
      break;
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
    case "phone":
      if (value === null || value === "" || value === undefined) {
        errors.phoneError = "Phone Number is required.";
      } else {
        const newErrors = omit(errors, "phoneError");
        errors = newErrors;
      }
      break;
    case "address":
      if (value === null || value === "" || value === undefined) {
        errors.addressError = "Address is required.";
      } else {
        const newErrors = omit(errors, "addressError");
        errors = newErrors;
      }
      break;
    default:
      break;
  }
  return errors;
};

// validate On Submit method SignIn

export const validateOnSubmitRegister = (value) => {
  let errors = {};
  const email = value?.email;
  const password = value?.password;
  const userName = value?.userName;

  if (userName === null || password === "" || password === undefined) {
    errors.userNameError = "Username is required.";
  }

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
