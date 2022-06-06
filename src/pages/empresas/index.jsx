import React, { Fragment } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

import Layout from '@layouts/Main';
import Table from '@components/EmpresaTable';


const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Empresas', url: '/admin/empresas' }
];

const Index = () => {
  return (
    <Layout title='Empresas' links={link} haveLink={true}>
      <hr  />

      <Table></Table>
      <Outlet  />
    </Layout>
  )
}

export default Index;
  