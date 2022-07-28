/**
 * * Archivo Familia Index
 ** Archivo de pagina: /familias
 */
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { role } from '../../utils/texts/modAdmin';
import { universal } from '../../utils/texts/general';
import { Link } from 'react-router-dom';
//* Redux
import { getRolesAction } from '@redux/rolesDuck';
//* Componentes
import Layout from '@layouts/Main';
import Table from '@components/roles/Table';
import Card from '@common/Card';

const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre:'Family', url: '/familias' }
];

const Index = () => {
  const dispatch = useDispatch();
  let roles = useSelector((store) => store.roles.list);
  useEffect(() => { dispatch(getRolesAction()) }, []);
  

  return (
    <Layout title={role.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 
        <div className='row'>
          <div className='col-4 mb-3 float-sm-right'>
            <Link to='/admin/roles/new' className='btn btn-sm btn-block btn-outline-success float-sm-right'> <i className='fa-solid fa-plus' />{universal.btn.new}</Link>
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