import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from '@common/Navbar';
import Sidebar from '@common/Sidebar'

const Menu = ({ color='navbar-dark' }) => {
  return (
    <Fragment>
      <Navbar  />
      <Sidebar  />
    </Fragment>
  );
}

export default Menu;