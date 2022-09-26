/**
 * * Archivo Roles Index
 * ? url: /roles
 */
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//* Texto
import { role } from '../../utils/texts/modAdmin';
import { universal } from '../../utils/texts/general';
//* Redux
import { getRolesAction } from '@redux/rolesDuck';
//* Componentes
import Layout from '@layouts/Main';
import Table from '@components/roles/Table';
import Card from '@common/Card';

const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre:'Roles', url: '/roles' }
];

const Index = () => {
  const dispatch = useDispatch();
  let roles = useSelector((store) => store.roles.list);
  useEffect(() => { dispatch(getRolesAction()) }, []);
  
  return (
    <Layout title={role.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <Link
            to='/admin/roles/new'
            title='Nuevo Rol'
            className='btn btn-md btn-outline-success me-md-2'
          > 
            <i className='fa-solid fa-plus' />
            {universal.btn.new}
          </Link>
        </div>

        <div className='row'>
          <div className='col-12 col-md-12 col-xl-12'>
            <Table data={roles} />
          </div>
        </div>  
      </Card>
    </Layout>
  )
}

export default Index;