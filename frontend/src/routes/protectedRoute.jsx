//import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, isAuth }) => {
  //const location = useLocation();
  //const { user = {} } = useSelector((state) => state.authReducer);

  const token = localStorage.getItem("_token");
  //const isUserAuthenticated = !!token;
  //const isUserHasAccess = roles?.includes(user?.roleName);

  //   console.log("isRole", {
  //     roles,
  //     //isUserHasAccess,
  //     isUserAuthenticated,
  //     isAuth,
  //     token,
  //     test: isAuth, // && (!isUserHasAccess || !isUserAuthenticated),
  //     path: location.pathname,
  //     isVisible,
  //   });

  // For hard refresh with alreday login user
  if (isAuth && token) {
    return children;
  }

  // If user has not access to this page then redirect to landing page
  if (isAuth) {
    return <Navigate to={"/"} />;
  }

  return children;
};
