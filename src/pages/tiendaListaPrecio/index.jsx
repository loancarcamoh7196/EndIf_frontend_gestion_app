/**
 ** Archivo Tienda Lista Precio Index
 *? url: /listaPrecio/:id/lista_precios
 */
import { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//* Texto
import { universal, shopPriceList } from '@utils/texts/modGestion';
//* Redux
import { getTiendaListasAction } from '@redux/tiendaListaPrecioDuck';
//* Componentes
import Layout from '@layouts/Main';
import Card from '@common/Card';
import Canvas from '@common/OffCanvas';
import Loader from '@common/Loader';
import Table from '@components/tiendaListaPrecio/Table';
//* Paginas para 
import New from '@pages/tiendaListaPrecio/new';
import Edit from '@pages/tiendaListaPrecio/edit';

const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre: 'Lista Precio', url: '/lista_precio' },
  { nombre:'Lista de Precio x Tienda', url: '/tienda_lista' }
];

const Index = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params; //? Extraes ID de URL

  let tiendaLista = useSelector((store) => store.tiendaListas.list);
  const loading = useSelector((store) => store.tiendaListas.loading);
  let listasPrecio = useSelector((store) => store.listaPrecios.list);
  // console.log(listasPrecio);
  //? Lista de Precio
  let listaSelected = listasPrecio.find( e => e.id == id);
  // console.log(listaSelected)

  //?  
  useEffect(() => { dispatch(getTiendaListasAction({listaPrecioId: id})) }, []);
  
  //* Declaración State
  const [formShow, setFormShow] = useState({ edit: false, new: false });

  return (
  <Layout title={shopPriceList.title.index} links={link} haveLink={true}>
    <Card style='card-default' > 
      <div className='row'>
        <div className='col-8'>
          <div className='form-group'>
            <label className='form-label'>ID</label>
            <label className='form-input'>{listaSelected.id}</label>
          </div>
          <div className=''>
            <label>Nombre</label>
            <label>{listaSelected.lista}</label>
          </div>
        </div>
        <div className='col-4 mb-3 '>
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

          <Link
            to='/lista_precio'
            className='btn btn-sm btn-outline-danger btn-block' 
          >
            {universal.btn.volver}
          </Link>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 col-md-12 col-xl-12'>
        { loading ? <Loader /> : <Table data={tiendaLista} setFormShow={setFormShow} formShow={formShow} /> }
        </div>
      </div>  
    </Card>

    <Canvas
      key='TiendaListaPrecio'
      title={(formShow.new && shopPriceList.title.new) || (formShow.edit && shopPriceList.title.edit)}
    >
      { formShow.new ?
        <New listaId={id} />
        : (formShow.edit) ?
          <Edit listaId={id} />
          : <h1> No hay acciones disponibles </h1>
      }
    </Canvas>
  </Layout>
  )
}

export default Index; 