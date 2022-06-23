/**
 ** Archivo de pagina: /admin/usuarios
 */
import { Fragment, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, Link } from 'react-router-dom';

// Componentes
import Layout from '@layouts/Main';

const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Usuarios', url: '/admin/usuarios' }
];

const Index = () => {
  return (
    <Layout title='Usuarios' links={link} haveLink={true}>
    </Layout>
  )
}

export default Index;