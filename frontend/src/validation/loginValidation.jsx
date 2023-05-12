import omit from "lodash/omit";

export const loginValidation = (name, value, errors = {}) => {
  //A function to validate each input values

  switch (name) {
    case "email":
      if (
        !new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).test(value)
      ) {
        errors = {
          ...errors,
          email: "Enter a valid email address",
        };
      } else {
        let errors = omit(errors, "email");
        // setErrors(errors);
      }
      break;

    case "password":
      if (
        !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
      ) {
        errors = {
          ...errors,
          password:
            "Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers",
        };
      } else {
        let errors = omit(errors, "password");
        // setErrors(newObj);
      }
      break;

    default:
      break;
  }
  console.log("errors1", errors);
  return errors;
};
