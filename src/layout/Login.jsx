import React, { Fragment } from 'react';
import '@styles/Login.css';

const Login = ({ children }) => {
  return (
    <Fragment>
      <body className='login-page' >
        { children }
      </body> 
    </Fragment>
  )
}

export default Login;
