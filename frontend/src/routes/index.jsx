import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import PageNotFound from "../pages/PageNotFound";
import Register from "../pages/auth/Register";
import UserDashboard from "../pages/user/UserDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";

export const routeList = [
  {
    path: "/",
    element: <Home />,
    isVisible: true,
    isAuth: false,
    accessRoles: [],
  },
  {
    path: "/about",
    element: <About />,
    isVisible: true,
    isAuth: false,
    accessRoles: [],
  },
  {
    path: "/contact",
    element: <Contact />,
    isVisible: true,
    isAuth: false,
    accessRoles: [],
  },
  {
    path: "/login",
    element: <Login />,
    isVisible: true,
    isAuth: false,
    accessRoles: [],
  },
  {
    path: "/register",
    element: <Register />,
    isVisible: true,
    isAuth: false,
    accessRoles: [],
  },
  {
    path: "/user/dashboard",
    element: <UserDashboard />,
    isVisible: true,
    isAuth: true,
    accessRoles: ["user"],
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    isVisible: true,
    isAuth: true,
    accessRoles: ["admin"],
  },
  {
    path: "*",
    element: <PageNotFound />,
    isVisible: true,
    isAuth: false,
    accessRoles: [],
  },
];
