import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";

import "../../assets/scss/partials/_nav.scss";

const Nav = () => {
   const authCtx = useContext(AuthContext);

   const isLoggedIn = authCtx.isLoggedIn;

   const logoutHandler = () => {
      authCtx.logout();
      // redirect the user
   };

   const loggedInContent = (
      <Fragment>
         <li>
            <Link to="/profile">Profile</Link>
         </li>
         <li>
            <button onClick={logoutHandler}>Logout</button>
         </li>
      </Fragment>
   );

   const loggedOutContent = (
      <li>
         <Link to="/auth">Login</Link>
      </li>
   );

   return (
      <header>
         <Link to="/">
            <h3>React Auth</h3>
         </Link>
         <nav>
            <ul>{isLoggedIn ? loggedInContent : loggedOutContent}</ul>
         </nav>
      </header>
   );
};

export default Nav;
