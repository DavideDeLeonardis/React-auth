import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";

import "../../assets/scss/partials/_profile.module.scss";

const ProfileForm = () => {
   const history = useHistory();

   const newPasswordInputRef = useRef();
   const authCtx = useContext(AuthContext);

   const submitHandler = (event) => {
      event.preventDefault();

      const enteredNewPassword = newPasswordInputRef.current.value;

      // add validation

      fetch(
         "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDHYQqiDnEnH1nhZGySks4rMmMcVXYs-p4",
         {
            method: "POST",
            body: JSON.stringify({
               idToken: authCtx.token,
               password: enteredNewPassword,
               returnSecureToken: false,
            }),
            headers: {
               "Content-Type": "application/json",
            },
         }
      ).then(() => {
         history.replace("/");
      });
   };

   return (
      <form onSubmit={submitHandler}>
         <div>
            <label htmlFor="new-password">New Password</label>
            <input
               type="password"
               id="new-password"
               minLength="7"
               ref={newPasswordInputRef}
            />
         </div>
         <div>
            <button>Change Password</button>
         </div>
      </form>
   );
};

export default ProfileForm;
