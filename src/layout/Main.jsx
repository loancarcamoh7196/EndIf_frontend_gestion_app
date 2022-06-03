import React, { Fragment } from 'react';

import Loader from '@common/Loader';
import Menu from '@containers/Menu';
import Header from '@common/Breadcrum';

const Main = ({ children }) => {
  const element =document.querySelector('#body');
  element.className = 'hold-transition dark-mode sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed';

  return (
    <Fragment>
      <div className='wrapper'>
        <Loader  />
        <Menu />

        <div className='content-wrapper'>
          <Header title={'Home'} url={''} />
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default Main;
