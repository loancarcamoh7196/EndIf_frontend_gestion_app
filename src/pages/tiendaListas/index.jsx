/**
 * * Archivo Tienda Lista Precio Index
 * ? url: /lista_precio/:id/teinda
 */
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
//* 
import useSWR from 'swr';
import axios from 'axios';
//* Texto
import { shopPriceList, product, universal, priceList } from '@utils/texts/modGestion';
import endPoints from '@services/api';
//* Redux
import { getTiendaListasAction } from '@redux/tiendaListaPrecioDuck';
import { getTiendasAction } from '@redux/tiendasDuck';
//* Componentes
import Layout from '@layouts/Main';
import Table from '@components/tiendaListaPrecio/Table';  
import Card from '@common/Card';
import Loader from '@common/Loader';
import Canvas from '@common/OffCanvas';
import New from '@pages/tiendaListas/new';
import Edit from '@pages/tiendaListas/edit';
//* Breadcrum
const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre: 'Lista Precio', url: '/lista_precio' },
  { nombre:'Tiendas', url: '' }
];
//* Fetcher
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Index = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params; //? Extraes ID de URL
  
  const tiendaListas = useSelector((store) => store.tiendaListas.list);
  const loading = useSelector((store) => store.tiendaListas.loading);

  //* Declaración State para Formulario
  const [formShow, setFormShow] = useState({  edit: false, new: false, });

  //* Ejecutar al renderizar 
  useEffect(() => {
    dispatch(getTiendaListasAction({ listaPrecioId: id }));
    dispatch(getTiendasAction());
  }, []);

  //? Consulta para descripción de Producto
  const { data: listaPrecio, error } = useSWR( id ? (endPoints.listaPrecios.get(id)) : null, fetcher );
  if (error) return <p className="container is-medium">Falló en la carga...</p>;
  if (!listaPrecio) return (
    <Layout title={shopPriceList.title.index} links={link} haveLink={true}>
      <Loader  />
    </Layout>
  );

  return (
  <Layout title={shopPriceList.title.index} links={link} haveLink={true}>
    <Card>
      <div className='row'>
        <div className='col-8'>
          <div className='form-group'>
            <label className='label'>{priceList.lbl.id}</label>
            <span className='form-input'>{listaPrecio.id}</span>
          </div>
          <div className='form-group'>
            <label className='label'>{priceList.lbl.lista}</label>
            <span className='form-input'>{listaPrecio.lista}</span>
          </div>
        </div>

        <div className='col-4 mb-3 float-sm-right'>
          <button
            type='button'
            onClick={()=>setFormShow({ edit: false, new: true })}
            className='btn btn-sm btn-block btn-outline-success mb-2'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasRight'
            aria-controls='offcanvasRight'
          > 
            <i className='fa-solid fa-plus' />
            {universal.btn.new}
          </button>

          <Link
            to='/lista_precio'
            className='btn btn-sm btn-block btn-outline-danger'
          >
            {universal.btn.volver}
          </Link>
        </div>
      </div>
    </Card>

    <Card style='card-default' > 
      { loading ? <Loader /> : <Table data={tiendaListas} setFormShow={setFormShow} formShow={formShow} /> }
    </Card>

    <Canvas
      key='tiendaListas'
      title={(formShow.new && shopPriceList.title.new )||(formShow.edit && shopPriceList.title.edit)}
    >
      { formShow.new ?
        <New />
        : (formShow.edit) ?
          <Edit  />
          : <h1> No hay acciones disponibles </h1>
      }
    </Canvas>
  </Layout>
  );
}

export default Index;