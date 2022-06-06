import React, { Fragment } from 'react';

import Loader from '@common/Loader';
import Menu from '@containers/Menu';
import Header from '@common/Breadcrum';
import Footer from '@common/Footer';

const Main = ({ children, breadKey='Bread',title='Default', links, haveLink=false }) => {
  const element = document.querySelector('#body');
  element.className = 'dark-mode sidebar-mini layout-fixed sidebar-closed sidebar-collapse layout-navbar-fixed layout-footer-fixed';

  return (
    <Fragment>
      <div className='wrapper'>
        <Loader  />
        <Menu />
        <div className='content-wrapper'>
          <Header key={breadKey} title={title} links={links} haveLink={haveLink} />
          
          <section className='content'>
            {children}
          </section>
        </div>
        <Footer  />
      </div>
    </Fragment>
  );
};

export default Main;
