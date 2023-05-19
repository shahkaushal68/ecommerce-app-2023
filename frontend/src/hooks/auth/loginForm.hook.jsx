import { useEffect, useState } from "react";
import {
  validateOnChangeSignIn,
  validateOnSubmitSignIn,
} from "../../validation/loginValidation";
import { doLogin } from "../../actions/authAction";
import { toast } from "react-toastify";

import { setAuthHeader } from "../../utils/mainApi";
import { useDispatch } from "react-redux";
import { addLoginUserData } from "../../redux/features/userSlice";

const useLoginForm = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState({});

  const dispatch = useDispatch();

  //console.log("errors", errors);

  useEffect(() => {}, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const errors = validateOnChangeSignIn(name, value, errorMessages);
    setErrorMessages(errors);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateOnSubmitSignIn(formValues);
    if (Object.keys(errors).length === 0) {
      const loginResponse = await doLogin(formValues);
      if (loginResponse.status === 200) {
        //console.log("login response", loginResponse);
        localStorage.setItem("_token", loginResponse?.data?.token);
        await setAuthHeader(`Bearer ${loginResponse?.data?.token}`);
        toast.success("Successfully Login");
        dispatch(addLoginUserData());
      } else {
        toast.error(loginResponse.message);
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

export default useLoginForm;
