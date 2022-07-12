/**
 ** Archivo de pagina: /tiendas
 */
import { Fragment, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { shop, universal } from '../../utils/textModGestion';
import { NavLink, Link } from 'react-router-dom';

//redux
import { getRolesAction } from '@redux/rolesDuck';

// Componentes
import Layout from '@layouts/Main';
import Table from '@components/RolesTable';
import Card from '@common/Card';

const link = [
  { nombre: 'Home', url: '/dashboard' },
  { nombre:'Roles', url: '/tiendas' }
];

const Index = () => {
  const dispatch = useDispatch();
  
  useEffect(() => { dispatch(getRolesAction()) }, []);
  let tiendas = useSelector((store) => store.tiendas.list);

  return (
    <Layout title={shop.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 
        <div className='row'>
          <div className='col-4 mb-3 float-sm-right'>
            <Link to='/tiendas/new' className='btn btn-sm btn-block btn-outline-success float-sm-right'> <i className='fa-solid fa-plus'/>{universal.lbl.nueva}</Link>
          </div>

          <div className='col-12 col-md-12 col-xl-12'>
            <Table data={tiendas} />
          </div>
        </div>  
      </Card>
    </Layout>
  )
}

export default Index;