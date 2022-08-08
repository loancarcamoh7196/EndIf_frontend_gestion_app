import React, { Fragment } from 'react';
// import Logo from '@assets/img/AdminLTELogo.png';
import '@styles/Spiner.scss';

const Loader = () => {
  // return <div className='loader'></div>;
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border"
        role="status"
      >
        <span className="visually-hidden">
          Loading...
        </span>
      </div>
    </div>
  );
}

export default Loader;
