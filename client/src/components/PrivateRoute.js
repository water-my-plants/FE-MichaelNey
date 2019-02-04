import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//If the user is not logged in, send them to the login page.
const PrivateRoute = ({ component: Component, currentUser, ...rest }) => {
    let token = localStorage.getItem('token');
    return <Route
    {...rest}
    render={props =>
        token
        ? <Component {...props} />
        : <Redirect
            to='/login'
          />}
  />;
}
  

export default PrivateRoute;