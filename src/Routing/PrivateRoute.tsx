/* eslint-disable react/jsx-props-no-spreading */
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

const PrivateRoute = ({ component: Component,redirected, ...rest}) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.getAuth() || (localStorage.getItem('activeUser')!==null)? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: `/${redirected}`,
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
