import { useRoutes } from "react-router-dom";
import Header from "./components/header/Header.jsx";

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./router/index.js";

function RoutesComponent(isAuth) {
  const routes = isAuth ? PUBLIC_ROUTES : PRIVATE_ROUTES;

  return useRoutes(routes);
}

function App() {
  const isAuth = false;

  return (
    <>
      <Header isAuth={isAuth} />
      <RoutesComponent isAuth={isAuth} />
    </>
  );
}

export default App;
