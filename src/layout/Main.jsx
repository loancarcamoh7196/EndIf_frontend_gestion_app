import React, { Fragment, useEffect } from 'react';
// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Menu from '@containers/Menu';
import Header from '@common/Breadcrum';
import Footer from '@common/Footer';
import '@styles/Global.css';

const Main = ({ children, breadKey='Bread',title='Default', links, haveLink=false }) => {
  const element = document.querySelector('#body');
  element.className = ' layout-fixed sidebar-mini-xs control-sidebar-slide-open layout-navbar-fixed sidebar-closed  sidebar-collapse';

  return (
    <Fragment>
      <div className='wrapper'>
        <Menu />
        <div className='content-wrapper'>
          <Header key={breadKey} title={title} links={links} haveLink={haveLink} />

          <section className='content'>
            <div className='container-fluid'>
              {children}
            </div>
          </section>
        </div>
        <Footer  />
        <ToastContainer />
      </div>
    </Fragment>
  );
};

export default Main;
