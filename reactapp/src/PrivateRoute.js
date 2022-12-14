import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      auth === true)
        ? <Redirect to="/lk" />
        : <Component {...props} />
    }
  />
);

export default PrivateRoute;
