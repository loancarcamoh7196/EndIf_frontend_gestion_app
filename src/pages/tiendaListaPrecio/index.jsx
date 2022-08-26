/**
 ** Archivo Tienda Lista Precio Index
 *? url: /tienda_lista
 */
import { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//* Texto
import { universal, retailPrice } from '@utils/texts/modGestion';
//* Redux
import { getListasAction } from '@redux/tiendaListaPrecioDuck';
//* Componentes
import Layout from '@layouts/Main';
import Table from '@components/tiendaListaPrecio/Table';
import Card from '@common/Card';

const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre: 'Lista Precio', url: '/lista_precio' },
  { nombre:'Lista de Precio x Tienda', url: '/tienda_lista' }
];

const Index = () => {
  const dispatch = useDispatch();
  let tiendaLista = useSelector((store) => store.tiendaLista.list);
  useEffect(() => { dispatch(getListasAction()) }, []);
  

  return (
    <Layout title={retailPrice.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 
        <div className='col-11'>

        </div>
        <div className='col-1 mb-3 '>
            <Link
              to='/admin/roles/new'
              className='btn btn-sm btn-block btn-outline-success float-sm-right'
            > 
              <i className='fa-solid fa-plus' />
              {universal.btn.new}
            </Link>
          </div>
        <div className='row'>
          

          <div className='col-12 col-md-12 col-xl-12'>
            <Table data={tiendaLista} />
          </div>


        </div>  
      </Card>
    </Layout>
  )
}

export default Index;