import { useContext } from "react";

import AuthContext from "../store/auth-context";

import "../assets/scss/partials/_home.module.scss";

const HomePage = () => {
   const authCtx = useContext(AuthContext);

   return (
      <section>
         {authCtx.isLoggedIn ? (
            <h1>
               Welcome,
               <br /> you are Logged In
            </h1>
         ) : (
            <h1>Register or Login</h1>
         )}
      </section>
   );
};

export default HomePage;
