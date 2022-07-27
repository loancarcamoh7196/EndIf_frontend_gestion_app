/**
 ** Archivo de pagina: /admin/usuarios
 */
import { Fragment, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { universal } from '../../utils/texts/modAdmin';

import { NavLink, Link } from 'react-router-dom';

//redux
import { getUsuariosAction } from '@redux/usuariosDuck';

// Componentes
import Layout from '@layouts/Main';
import Table from '@components/usuario/Table';
import Card from '@common/Card';

const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Usuarios', url: '/admin/usuarios' }
];

const Index = () => {
  const dispatch = useDispatch();
  
  useEffect(() => { dispatch(getUsuariosAction()) }, []);
  let usuarios = useSelector((store) => store.usuarios.list);

  return (
    <Layout title='Usuarios' links={link} haveLink={true}>
      <Card style={'card-default'}> 
        <div className='row'>
          <div className='col-4 mb-3 float-sm-right'>
            <Link to='/admin/usuarios/new' className='btn btn-sm btn-block btn-outline-success float-sm-right'> <i className="fa-solid fa-plus" />Nueva</Link>
          </div>

          <div className='col-12 col-md-12 col-xl-12'>
            <Table data={usuarios} />
          </div>
        </div>  
      </Card>
    </Layout>
  )
}

export default Index;