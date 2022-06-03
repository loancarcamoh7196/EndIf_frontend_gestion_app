import React, { Fragment } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

import Layout from '@layouts/Main';

const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Empresas', url: '/admin/empresas' }
];

const Index = () => {
  return (
    <Layout title='Empresas' links={link} >
      
      <div className=''>
        Hola este es ele index de empresa
      </div>
      <Outlet  />
    </Layout>
  )
}

export default Index;
