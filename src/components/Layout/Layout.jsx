import { Fragment } from "react";

import Nav from "./Nav";

const Layout = (props) => {
   return (
      <Fragment>
         <Nav />
         <main>{props.children}</main>
      </Fragment>
   );
};

export default Layout;
