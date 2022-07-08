import React, { Fragment } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import Layout from '@layouts/Main';
import Footer from '@common/Footer';
import '@styles/Hero.scss';
import SiteIcon from '@assets/icons/logoendif_old.png';

const link = [{ nombre: 'Home', url: '/home'}];

const Home = () => {
  const element = document.querySelector('#body');
  element.className = 'layout-fixed sidebar-mini-xs control-sidebar-slide-open layout-navbar-fixed sidebar-closed  sidebar-collapse';
  return (
    <Fragment>
      <div className='content'>
        <section className='hero is-dark is-fullheight'>
          {/* <!-- Hero head: will stick at the top --> */}
          <div className='hero-head'>
            <img src={SiteIcon}  width={90}/>
            {/* <div className='card-header'> */}
              <p className='display-4'>Hello, world!</p>
            {/* </div> */}
          </div>

          {/* <!-- Hero content: will be in the middle --> */}
          <div className='hero-body'>
            <div className='container has-text-centered'>
              <p className='lead'>
                Si ingresar al sistema porfavor, inicie sesión
              </p>
              <Link to='/login' className='btn btn-info btn-block btn-sm'>Ir </Link>
            </div>
          </div>

          {/* <!-- Hero footer: will stick at the bottom --> */}
          <div className='hero-foot '>
            <div className='card-footer text-sm'>
              <strong>Copyright &copy; 2022 <a href='https://endif.cl'>EndIf</a>.</strong>
              All rights reserved.
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );  
}

export default Home;