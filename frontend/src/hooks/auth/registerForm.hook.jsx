import { useState } from "react";
import { toast } from "react-toastify";
import {
  validateOnChangeRegister,
  validateOnSubmitRegister,
} from "../../validation/registerValidation";
import { doRegister } from "../../actions/authAction";
import { useNavigate } from "react-router-dom";

const useRegisterForm = () => {
  const [formValues, setFormValues] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  //console.log("errors", errors);
  const handleChange = (event) => {
    const { name, value } = event.target;
    const errors = validateOnChangeRegister(name, value, errorMessages);
    setErrorMessages(errors);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateOnSubmitRegister(formValues);
    if (Object.keys(errors).length === 0) {
      //console.log(formValues);
      const registerResponse = await doRegister(formValues);
      console.log("registerResponse", registerResponse);
      if (registerResponse.status === 200) {
        toast.success("Register successfully");
        navigate("/login");
      } else {
        toast.error(registerResponse.message);
      }
    } else {
      setErrorMessages(errors);
    }
  };
  return {
    formValues,
    errorMessages,
    handleChange,
    handleSubmit,
  };
};

export default useRegisterForm;
