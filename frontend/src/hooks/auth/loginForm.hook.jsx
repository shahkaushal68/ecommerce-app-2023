import { useState } from "react";
import { loginValidation } from "../../validation/loginValidation";

const useLoginForm = () => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  console.log("errors", errors);
  const handleChange = (event) => {
    event.persist();
    let name = event.target.name;
    let value = event.target.value;
    loginValidation(name, value, errors);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (
      Object.keys(errors).length === 0 &&
      Object.keys(formValues).length !== 0
    ) {
      console.log("formVal", formValues);
    } else {
      alert("There is an Error!");
    }
  };
  return {
    formValues,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
  };
};

export default useLoginForm;
