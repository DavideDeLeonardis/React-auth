import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";

import "./assets/scss/index.scss";

function App() {
   return (
      <Layout>
         <Switch>
            <Route path="/" exact>
               <HomePage />
            </Route>
            <Route path="*">
               <Redirect to="/" />
            </Route>
         </Switch>
      </Layout>
   );
}

export default App;
