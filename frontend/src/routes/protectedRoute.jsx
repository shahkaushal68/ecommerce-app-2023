//import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, isAuth, roles }) => {
  //const location = useLocation();
  const { user = {} } = useSelector((state) => state.user);

  const token = localStorage.getItem("_token");
  //console.log("token", !!token);
  const isUserAuthenticated = !!token;
  const isUserHasAccess = roles?.includes(user?.role);

  console.log("isRole", {
    //     roles,
    //isUserHasAccess,
    //isUserAuthenticated,
    //isAuth,
    //token,
    //     token,
    //     test: isAuth, // && (!isUserHasAccess || !isUserAuthenticated),
    //     path: location.pathname,
    //     isVisible,
  });

  // For hard refresh with alreday login user
  if (isAuth && token && !user) {
    return children;
  }

  // If user has not access to this page then redirect to landing page
  if (isAuth && (!isUserHasAccess || !isUserAuthenticated)) {
    return <Navigate to={"/login"} />;
  }

  // If page is visible for every user then show that page
  if (!isAuth && !isUserAuthenticated) {
    return children;
  }

  // // User is alreday logedin then redirect to home page if they access sign-in and sign-up page
  const userRouteAccessWithoutAuth = ["/login", "/register"];
  if (
    isUserAuthenticated &&
    userRouteAccessWithoutAuth.includes(location?.pathname)
  ) {
    // if (user?.role === "admin") {
    //   return <Navigate to="/admin/dashboard" />;
    // } else if (user?.role === "user") {
    //   return <Navigate to="/user/dashboard" />;
    // }

    return <Navigate to="/" />;
  }

  return children;
};
