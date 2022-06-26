import AuthContext from "./auth-context";

const AuthProvider = (props) => {
   return <AuthContext.Provider>{props.children}</AuthContext.Provider>;
};

export default AuthProvider;
