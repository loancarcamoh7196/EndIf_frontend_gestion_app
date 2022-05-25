import React, { Fragment } from 'react';

import Loader from '@common/Loader';
import Menu from '@common/Menu';
import Header from '@common/Breadcrum'

const Main = ({ children }) => {
  return (
    <body class="hold-transition dark-mode sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
      <div className='wrapper'>
        <Loader  />
        <Menu />

        <div class="content-wrapper">
          <Header title={'Home'} url={''} />
          {children}
        </div>
      </div>
    </body>
    
  );
};

export default Main;
