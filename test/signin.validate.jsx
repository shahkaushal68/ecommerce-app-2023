import { omit } from "lodash";
import { counts } from "../../constOptions";
import { emailRegex } from "../../regex";

// validateSignin
export const validateSignin = (user) => {
  let errors = {};
  const email = user?.email;
  const password = user?.password;

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

// validateOnChangeSignIn
export const validateOnChangeSignIn = (name, value, preserveError) => {
  let errors = { ...preserveError };
  const newErrors = omit(errors, "loginError");
  errors = newErrors;
  switch (name) {
    case "email":
      if (value === null || value === "" || value === undefined) {
        errors.emailError = "This field is required.";
      } else if (!emailRegex.test(value)) {
        errors.emailError = "Please enter a valid email";
      } else {
        const newErrors = omit(errors, "emailError");
        errors = newErrors;
      }
      break;
    case "password":
      if (value === null || value === "" || value === undefined) {
        errors.passwordError = "This field is required.";
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

export const onSubmitEmailPasswordReset = (user) => {
  let errors = {};
  const email = user.email;
  if (email === null || email === "" || email === undefined) {
    errors.emailPasswordError = "This field is required.";
  } else if (!emailRegex.test(email)) {
    errors.emailPasswordError = "Please enter a valid email id";
  }
  return errors;
};

export const onSubmitOtpPasswordReset = (data) => {
  let errors = {};
  const otp = data.otp;

  if (otp === null || otp === "" || otp === undefined) {
    errors.otpPasswordError = "This field is required.";
  } else if (otp.length !== counts.otpCount) {
    errors.otpPasswordError = `OTP should be of ${counts.otpCount} digits`;
  }
  return errors;
};

export const onSubmitResetPassword = (data) => {
  let errors = {};
  const { password, confirmPassword } = data;

  if (password === "" || password === null || password === undefined) {
    errors.resetPasswordError = "This field is required.";
  } else if (password.length < 8) {
    errors.resetPasswordError = "Password must be at least 8 characters";
  }
  if (confirmPassword === "" || confirmPassword === null || confirmPassword === undefined) {
    errors.cnfPasswordError = "This field is required.";
  } else if (confirmPassword !== password) {
    errors.cnfPasswordError = "Password did not match";
  }
  return errors;
};

export const validateOnChangeResetPassword = (name, value, preserveError, password) => {
  let errors = { ...preserveError };
  switch (name) {
    case "email":
      if (value === null || value === "" || value === undefined) {
        errors.emailPasswordError = "This field is required.";
      } else if (!emailRegex.test(value)) {
        errors.emailPasswordError = "Please enter a valid email id";
      } else {
        const newErrors = omit(errors, "emailPasswordError");
        errors = newErrors;
      }
      break;
    case "otp":
      if (value === "" || value === null || value === undefined) {
        errors.otpPasswordError = "This field is required.";
      } else if (value.length !== counts.otpCount) {
        errors.otpPasswordError = `OTP should be of ${counts.otpCount} digits`;
      } else {
        const newErrors = omit(errors, "otpPasswordError");
        errors = newErrors;
      }
      break;
    case "password":
      if (value === "" || value === null || value === undefined) {
        errors.resetPasswordError = "This field is required.";
      } else if (value.length < 8) {
        errors.resetPasswordError = "Password must be at least 8 characters";
      } else {
        let newErrors = omit(errors, "resetPasswordError");
        errors = newErrors;
      }
      break;
    case "confirmPassword":
      value = value?.trim()
      if (value === "" || value === null || value === undefined) {
        errors.cnfPasswordError = "This field is required.";
      } else if (value !== password) {
        errors.cnfPasswordError = "Password did not match";
      } else {
        const newErrors = omit(errors, "cnfPasswordError");
        errors = newErrors;
      }
      break;
    default:
      break;
  }
  return errors;
};
