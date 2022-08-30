/**
 ** Archivo Tienda Lista Precio Index
 *? url: /productos/:id/lista_precios
 */
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//* Texto
import { universal, retailPrice } from '@utils/texts/modGestion';
//* Redux
import { getListasAction } from '@redux/tiendaListaPrecioDuck';
//* Componentes
import Layout from '@layouts/Main';
import Card from '@common/Card';
import Canvas from '@common/OffCanvas';
import Loader from '@common/Loader';
import Table from '@components/tiendaListaPrecio/Table';

import New from '@pages/tiendaListaPrecio/new';
import Edit from '@pages/tiendaListaPrecio/edit';

const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre: 'Lista Precio', url: '/lista_precio' },
  { nombre:'Lista de Precio x Tienda', url: '/tienda_lista' }
];

const Index = () => {
  const dispatch = useDispatch();
  let tiendaLista = useSelector((store) => store.tiendaLista.list);
  const loading = useSelector((store) => store.tiendaLista.loading);

  useEffect(() => { dispatch(getListasAction()) }, []);
  
    //* Declaración State
  const [formShow, setFormShow] = useState({ 
    edit: false,
    new: false,
  });

  return (
    <Layout title={retailPrice.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 
        <div className='col-11'>

        </div>
        <div className='col-1 mb-3 '>
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
          {
            loading ? <Loader /> : <Table data={tiendaLista} />

          }
            
          </div>
        </div>  
      </Card>

      <Canvas>
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