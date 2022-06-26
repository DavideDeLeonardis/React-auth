import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout.jsx";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./store/auth-context";

import "./assets/scss/index.scss";

function App() {
   const authCtx = useContext(AuthContext);

   return (
      <Layout>
         <Switch>
            <Route path="/" exact>
               <HomePage />
            </Route>
            {!authCtx.isLoggedIn && (
               <Route path="/auth">
                  <AuthPage />
               </Route>
            )}
            <Route path="/profile">
               {authCtx.isLoggedIn ? <ProfilePage /> : <Redirect to="/auth" />}
            </Route>
            <Route path="*">
               <Redirect to="/" />
            </Route>
         </Switch>
      </Layout>
   );
}

export default App;
