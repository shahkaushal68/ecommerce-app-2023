import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routeList } from "./routes";
import { ProtectedRoute } from "./routes/protectedRoute";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
