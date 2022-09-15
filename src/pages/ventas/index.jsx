/**
 * * Archivo Ventas Index
 * ? url: /ventas
 */
import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//* Texto
import { universal, sales } from '@utils/texts/modGestion';
//* Redux
import { getVentasAction } from '@redux/ventasDuck';
//* Componentes
import Layout from '@layouts/Main';
import Table from '@components/venta/Table';
import Card from '@common/Card';
//* Breadcrum
const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre: 'Ventas', url: '/ventas' }
];

const Index = () => {
  const dispatch = useDispatch();
  let ventas = useSelector((store) => store.ventas.list);
  useEffect(() => { dispatch(getVentasAction()) }, []);
  
  return (
    <Layout title={sales.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 
        <div className='row'>
          <div className='col-4 mb-3 float-sm-right'>
            <Link to='/ventas/new' className='btn btn-sm btn-block btn-outline-success float-sm-right'> <i className='fa-solid fa-plus' />{universal.btn.new}</Link>
          </div>

          <div className='col-12 col-md-12 col-xl-12'>
            <Table data={ventas} />
          </div>
        </div>  
      </Card>
    </Layout>
  )
}

export default Index;