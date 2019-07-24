import React, { useContext } from "react";
import { Redirect, Route } from 'react-router-dom';
import TokenContext from '../contexts/TokenContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const tokenContext = useContext(TokenContext);
    return (
      <Route
        {...rest}
        render={props =>
          tokenContext.token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }