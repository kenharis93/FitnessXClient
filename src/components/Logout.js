import React from "react";
import { Redirect } from 'react-router-dom';

export default function Logout(props) {
    
    sessionStorage.clear();
    
    return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          );
}
    