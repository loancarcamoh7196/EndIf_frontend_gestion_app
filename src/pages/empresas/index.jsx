/**
 * * Archivo de pagina: /admin/empresas
 */
import React, { Fragment, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

//redux
import { getEmpresasAction, deleteEmpresaAction } from '@redux/empresasDuck';

// Componentes
import Layout from '@layouts/Main';
import Table from '@components/empresa/Table';
import Card from '@common/Card';

const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Empresas', url: '/admin/empresas' }
];

const Index = () => {
  const dispatch = useDispatch();
  
  useEffect(() => { dispatch(getEmpresasAction()) }, []);
  let empresas = useSelector((store) => store.empresas.list);
  // console.log('Empresas ', empresas);

  return (
    <Layout title='Empresas' links={link} haveLink={true}>
      
      <Card style='card-default'> 
        <div className='row'>
          <div className='col-4 mb-3 float-sm-right'>
            <Link to='/admin/empresas/new' className='btn btn-sm btn-block btn-outline-success float-sm-right'> <i class="fa-solid fa-plus" />Nueva</Link>
        </div>

        <div className='col-12 col-md-12 col-xl-12'>
          <Table data={empresas}  />
        </div>
        </div>  
      </Card>
    </Layout>
  )
}


export default connect(null, { getEmpresasAction, deleteEmpresaAction })(Index) ; 
  