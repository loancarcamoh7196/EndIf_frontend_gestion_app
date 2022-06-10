/**
 * * Archivo de pagina: /admin/empresas
 */
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
  let empresas = useSelector((store) => store.empresas.res);

  useEffect(() => { dispatch(getEmpresasAction()) }, []);

  return (
    <Layout title='Empresas' links={link} haveLink={true}>
      
      <Card style={'card-default'}> 
        <div className='row'>
          <div className='col-4 mb-3 float-sm-right'>
            <Link to='/admin/empresas/new' className='btn btn-sm btn-block btn-outline-success float-sm-right'> <i class="fa-solid fa-plus" />Nueva</Link>
        </div>
        {/* </div> */}
      
        {/* <div className='row'> */}
          <div className='col-12 col-md-12 col-xl-12'>
            <Table data={empresas} />
          </div>
        </div>
      </Card>
    </Layout>
  )
}

export default Index; 
