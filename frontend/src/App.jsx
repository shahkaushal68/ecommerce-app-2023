import "./App.css";
import { Routes, Route } from "react-router-dom";
import { routeList } from "./routes";
import { ProtectedRoute } from "./routes/protectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addLoginUserData } from "./redux/features/userSlice";

function App() {
  const dispatch = useDispatch();
  //const state = useSelector((state) => state.user);
  //const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("_token");
    if (token) {
      dispatch(addLoginUserData());
    }
  }, [dispatch]);

  return (
    <Routes>
      {routeList &&
        routeList?.map((routeItem, routeIndex) => {
          //console.log("routeItem", routeItem);
          return (
            <Route
              key={`routeIndex${routeIndex}`}
              path={routeItem.path}
              element={
                <ProtectedRoute
                  isAuth={routeItem.isAuth}
                  roles={routeItem.accessRoles}
                  isVisible={routeItem?.isVisible}
                >
                  {routeItem.element}
                </ProtectedRoute>
              }
            />
          );
        })}
    </Routes>
  );
}

export default App;
