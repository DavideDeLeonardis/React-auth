import { useState, useEffect, useCallback } from "react";

import AuthContext from "./auth-context";

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
   const currentTime = new Date().getTime();
   const adjExpirationTime = new Date(expirationTime).getTime();

   const remainingDuration = adjExpirationTime - currentTime;

   return remainingDuration;
};

const retrieveStoredToken = () => {
   const storedToken = localStorage.getItem("token");
   const storedExpirationDate = localStorage.getItem("expirationTime");

   const remainingTime = calculateRemainingTime(storedExpirationDate);

   if (remainingTime <= 60000) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      return null;
   }

   return {
      token: storedToken,
      duration: remainingTime,
   };
};

const AuthProvider = (props) => {
   const tokenData = retrieveStoredToken();

   let initialToken;
   if (tokenData) {
      initialToken = tokenData.token;
   }

   const [token, setToken] = useState(initialToken);

   const userIsLoggedIn = !!token;

   const loginHandler = (token, expirationTime) => {
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);

      const remainingTime = calculateRemainingTime(expirationTime);

      logoutTimer = setTimeout(logoutHandler, remainingTime);
   };

   const logoutHandler = useCallback(() => {
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");

      if (logoutTimer) {
         clearTimeout(logoutTimer);
      }
   }, []);

   useEffect(() => {
      if (tokenData) {
         console.log(tokenData.duration);
         logoutTimer = setTimeout(logoutHandler, tokenData.duration);
      }
   }, [tokenData, logoutHandler]);

   const contextValue = {
      token,
      isLoggedIn: userIsLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
   };

   return (
      <AuthContext.Provider value={contextValue}>
         {props.children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
