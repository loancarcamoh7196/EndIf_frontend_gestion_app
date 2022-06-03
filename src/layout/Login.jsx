import React, { Fragment } from 'react';
import '@styles/Login.css';

const Login = ({ children }) => {
  const element =document.querySelector('#body');
  element.className = 'login-page';

  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

export default Login;
