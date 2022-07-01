import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import Layout from '@layouts/Main';

const link = [{ nombre: 'Home', url: '/home'}];

const Home = ({children}) => {
  return (
    <Layout title='Home' links={link}>
      {children}
      <Outlet  />
    </Layout>
  );
}

export default Home;