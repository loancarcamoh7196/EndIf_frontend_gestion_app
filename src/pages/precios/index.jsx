/**
 * * Archivo Precio Index
 * ? url: /productos/:id/precios
 */
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
//* 
import useSWR from 'swr';
import axios from 'axios';
//* Texto
import { price, product, universal, priceList } from '@utils/texts/modGestion';
import endPoints from '@services/api';
//* Redux
import { getPreciosAction } from '@redux/preciosDuck';
import { getListaPreciosAction } from '@redux/listaPreciosDuck';
//* Componentes
import Layout from '@layouts/Main';
import Table from '@components/precio/Table';  
import Card from '@common/Card';
import Loader from '@common/Loader';
import Canvas from '@common/OffCanvas';
import New from '@pages/precios/new';
import Edit from '@pages/precios/edit';
//* Breadcrum
const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre: 'Productos', url: '/productos' },
  { nombre:'Precios', url: '' }
];
//* Fetcher
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Index = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { id } = params; //? Extraes ID de URL
  const precios = useSelector((store) => store.precios.list);
  const loading = useSelector((store) => store.precios.loading);

  //* Declaración State para Formulario
  const [formShow, setFormShow] = useState({ 
    edit: false,
    new: false,
  });

  //* Ejecutar al renderizar 
  useEffect(() => {
    dispatch(getPreciosAction({ productoId: id }));
    dispatch(getListaPreciosAction());
  }, []);

	//? Consulta para descripción de Producto
	const { data: producto, error } = useSWR( id ? (endPoints.productos.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!producto) return (
    <Layout title={price.title.index} links={link} haveLink={true}>
      <Loader  />
    </Layout>
  );

  return (
  <Layout title={price.title.index} links={link} haveLink={true}>
    <Card>
      <div className='row'>
        <div className='col-8'>
          <div className='form-group'>
            <label className='label'>{product.lbl.id}</label>
            <span className='form-input'>{producto.id}</span>
          </div>
          <div className='form-group'>
            <label className='label'>{product.lbl.codigo}</label>
            <span className='form-input'>{producto.codigoInterno}</span>
          </div>
          <div className='form-group'>
            <label className='label'>{product.lbl.nombre}</label>
            <span className='form-input'>{producto.nombre}</span>
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
            to='/productos'
            className='btn btn-sm btn-block btn-outline-danger'
          >
            {universal.btn.volver}
          </Link>
        </div>
      </div>
    </Card>

    <Card style='card-default' > 
      { loading ? <Loader /> : <Table data={precios} setFormShow={setFormShow} formShow={formShow} /> }
    </Card>

    <Canvas
      key='precios'
      title={(formShow.new && price.title.new )||(formShow.edit && price.title.edit)}
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