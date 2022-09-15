import React, { Fragment } from 'react';
// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@styles/Login.css';

const Login = ({ children }) => {
  const element = document.querySelector('#body');
  element.className = 'dark-mode login-page';

  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

export default Login;
