import React, { Fragment } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import Layout from '@layouts/Main';

import Card from '@common/Card';
const link =[{nombre:'Administración', url:'/admin'}]
const Admin = () => {
  return (
    <Layout title='Panel Administración' links={link}>      
      <Card key='admin' title='Prueba' haveClose={true} body='Esto es una prueba' haveFooter={true} footer='EndIf' />

      <Outlet />
    </Layout>
  )
}

export default Admin;
