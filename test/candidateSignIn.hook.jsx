import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogin, getUserDetailsByToken } from "../../actions";
import { UserRoles } from "../../constOptions";
import { validateOnChangeSignIn, validateSignin } from "../../validations";

export const useCandidateSignIn = () => {
   const loginInitialData = {
      email: '',
      password: ''
   }

   const [checked, setChecked] = useState(false);
   const [validateMessages, setValidateMessages] = useState({});
   const [candidateLoginData, setCandidateLoginData] = useState(loginInitialData);

   const [isLoading, setIsLoading] = useState(false);

   const onCheckChange = (e) => {
      setChecked(e.target.checked);
   };
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleInputChange = (event) => {
      const { name, value } = event?.target;
      const errors = validateOnChangeSignIn(name, value, validateMessages);
      setValidateMessages(errors)
      setCandidateLoginData({ ...candidateLoginData, [name]: value });
   };

   const handleSubmit = async () => {
      try {
         setIsLoading(true)

         candidateLoginData.userType = UserRoles.candidate;
         candidateLoginData.email = candidateLoginData?.email?.toLocaleLowerCase() || '';

         const errors = validateSignin(candidateLoginData);
         if (Object.keys(errors).length === 0) {
            const loginResponse = await doLogin(candidateLoginData);
            if (loginResponse?.status === 200) {
               toast.success(loginResponse?.message);
               localStorage.setItem("_token", loginResponse?.data?.token);
               const userDetailsResponse = await getUserDetailsByToken();
               if (userDetailsResponse?.status === 200) {
                  const userData = userDetailsResponse?.data
                  dispatch({
                     type: "STORE_AUTH_USER",
                     payload: userData,
                  });

                  if (userData?.user?.isVerify) {
                     navigate("/candidate/home");
                  } else {
                     if (userData?.user?.candidate?._id) {
                        navigate("/candidate/home");
                     } else {
                        navigate("/candidate/create-profile");
                     }
                  }
               }
            }
         } else {
            setValidateMessages(errors);
         }

         setIsLoading(false)
      } catch (error) {
         console.log(error)
      }
   }

   return {
      isLoading,
      handleSubmit,
      onCheckChange,
      handleInputChange,
      validateMessages,
      candidateLoginData
   }
}
