import React, { Fragment, useEffect } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmpresasAction } from '@redux/empresasDuck';
import Layout from '@layouts/Main';
import Table from '../../components/EmpresaTable';
// import DataTable from '@containers/DataTable'; 
import Card from '@common/Card';
import Form from '@pages/empresas/new';

const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Empresas', url: '/admin/empresas' }
];

const Index = () => {
  const dispatch = useDispatch();
  let empresas = useSelector((store) => store.empresas.results);

  useEffect(() => { dispatch(getEmpresasAction()) }, []);

  return (
    <Layout title='Empresas' links={link} haveLink={true}>
      
      <button data-bs-toggle="modal" data-bs-target="#modal" className='btn btn-success btn-sm float-right'> <i class="fa-solid fa-plus" />Nueva</button>
      <Card >  
        
        <Table data={empresas} />
      </Card>
      
      <Form />
    </Layout>
  )
}

export default Index;
