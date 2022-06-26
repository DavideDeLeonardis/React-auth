import { Fragment, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";

import "../../assets/scss/partials/_nav.module.scss";

const Nav = () => {
   const authCtx = useContext(AuthContext);
   const history = useHistory();

   const logoutHandler = () => {
      authCtx.logout();
      history.replace("/");
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
            <ul>{authCtx.isLoggedIn ? loggedInContent : loggedOutContent}</ul>
         </nav>
      </header>
   );
};

export default Nav;
