import React, { Fragment } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

import Layout from '@layouts/Main';
import Table from '@components/EmpresaTable';
import DataTable from '@containers/DataTable'; 


const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Empresas', url: '/admin/empresas' }
];

const head = [
  { nombre: 'RUT' },
  { nombre: 'Razon Social' },
  { nombre: 'Giro' },
  { nombre: 'Fono' },
  { nombre: 'Email' },
  { nombre: 'Activa'},
  { nombre: 'mod Gestión' },
  { nombre: 'mod Contabilidad' },
  { nombre: 'mod Inventario' },
  { nombre: 'mod Inventario Movil' },
  { nombre: 'Dirección' },
];
const data = [{ id:1, email:'prueba@prueba.cl', username: 'prueba'}];
const Index = () => {
  return (
    <Layout title='Empresas' links={link} haveLink={true}>
      <hr  />

      <DataTable  data={data} />
      <Outlet  />
    </Layout>
  )
}

export default Index;
