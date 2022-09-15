/**
 ** Archivo Tienda Lista Precio Index
 *? url: /lista_precios
 */
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//* Texto
import { universal, retailPrice, price, priceList } from '@utils/texts/modGestion';
//* Redux
import { getListaPreciosAction } from '@redux/listaPreciosDuck';
import { getTiendasAction } from '@redux/tiendasDuck';

//* Componentes
import Layout from '@layouts/Main';
import Card from '@common/Card';
import Canvas from '@common/OffCanvas';
import Loader from '@common/Loader';
import Table from '@components/listaPrecio/Table';

import New from '@pages/listaPrecios/new';
import Edit from '@pages/listaPrecios/edit';

const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre: 'Lista Precio', url: '/lista_precio' }
];
  
const Index = () => {
  const dispatch = useDispatch();
  let listaPrecio = useSelector((store) => store.listaPrecios.list);
  const loading = useSelector((store) => store.listaPrecios.loading);

  useEffect(() => { 
    dispatch(getListaPreciosAction());
    dispatch(getTiendasAction());
  }, []);
  
  //* Declaración State
  const [formShow, setFormShow] = useState({ 
    edit: false,
    new: false,
  });

  return (
  <Layout title={priceList.title.index} links={link} haveLink={true}>
    <Card style='card-default' > 
      <div className='col-3 mb-3 '>
        <button 
          type='button'
          onClick={()=>setFormShow({ edit: false, new: true })}
          className='btn btn-sm btn-block btn-outline-success mb-2'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasRight'
          aria-controls='offcanvasRight'
        >
          <i className='fa-solid fa-plus' />{universal.btn.new}
        </button>
      </div>
      <div className='row'>
        <div className='col-12 col-md-12 col-xl-12'>
          { loading ? <Loader /> : <Table data={listaPrecio} setFormShow={setFormShow} formShow={formShow} /> }
        </div>
      </div>  
    </Card>

    <Canvas
      key='Lista'
      title={(formShow.new && priceList.title.new )||(formShow.edit && priceList.title.edit)}
    >
      { formShow.new ?
        <New />
        : (formShow.edit) ?
          <Edit  />
          : <h1> No hay acciones disponibles </h1>
      }
    </Canvas>
  </Layout>
  )
}

export default Index;