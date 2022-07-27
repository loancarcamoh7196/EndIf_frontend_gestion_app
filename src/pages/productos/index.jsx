/**
 ** Archivo de pagina: /productos
 */
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { product, universal } from '../../utils/texts/modGestion';
import { Link } from 'react-router-dom';

//redux
import { getProductosAction } from '@redux/productosDuck';

// Componentes
import Layout from '@layouts/Main';
import Table from '@components/roles/Table';
import Card from '@common/Card';

const link = [
  { nombre: 'Home', url: '/dashboard' },
  { nombre:'Productos', url: '/productos' }
];

const Index = () => {
  const dispatch = useDispatch();
  
  useEffect(() => { dispatch(getProductosAction()) }, []);
  let productos = useSelector((store) => store.productos.list);

  return (
    <Layout title={product.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 
        <div className='row'>
          <div className='col-4 mb-3 float-sm-right'>
            <Link to='/productos/new' className='btn btn-sm btn-block btn-outline-success float-sm-right'> <i className='fa-solid fa-plus' />{universal.lbl.nueva}</Link>
          </div>

          <div className='col-12 col-md-12 col-xl-12'>
            <Table data={productos} />
          </div>
        </div>  
      </Card>
    </Layout>
  )
}

export default Index;