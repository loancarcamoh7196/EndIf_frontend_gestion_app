/**
 ** Archivo de pagina: /admin/roles
 */
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { role, universal } from '../../utils/texts/modAdmin';
import { Link } from 'react-router-dom';

//redux
import { getRolesAction } from '@redux/rolesDuck';

// Componentes
import Layout from '@layouts/Main';
import Table from '@components/roles/Table';
import Card from '@common/Card';

const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Roles', url: '/admin/roles' }
];

const Index = () => {
  const dispatch = useDispatch();
  
  useEffect(() => { dispatch(getRolesAction()) }, []);
  let roles = useSelector((store) => store.roles.list);

  return (
    <Layout title={role.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 
        <div className='row'>
          <div className='col-4 mb-3 float-sm-right'>
            <Link to='/admin/roles/new' className='btn btn-sm btn-block btn-outline-success float-sm-right'> <i className='fa-solid fa-plus' />{universal.lbl.nueva}</Link>
          </div>

          <div className='col-12 col-md-12 col-xl-12'>
            <Table data={roles} />
          </div>
        </div>  
      </Card>
    </Layout>
  )
}

export default Index;