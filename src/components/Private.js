import React from 'react';
import {Route, Redirect} from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
    <Route {...rest} render={(props) => (
      rest.user 
        ? <Component {...props}  {...rest}/>
        : <Redirect to='/login' />
    )} />
  )}

export default PrivateRoute;