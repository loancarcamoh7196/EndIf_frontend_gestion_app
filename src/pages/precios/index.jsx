/**
 * * Archivo Precio Index
 ** Archivo de pagina: /productos/:id/lista_precios
 */
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
//* Texto
import { price, product, universal } from '@utils/texts/modGestion';
import endPoints from '@services/api';
//* Redux
import { getPreciosAction } from '@redux/preciosDuck';
//* Componentes
import Layout from '@layouts/Main';
import Table from '@components/precio/Table';  
import Card from '@common/Card';
import Loader from '@common/Loader';
//* Breadcrum
const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre: 'Productos', url: '/productos' },
  { nombre:'Precios', url: '' }
];

const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Index = () => {
  const params = useParams();
  const dispatch = useDispatch();

  let precios = useSelector((store) => store.precios.list);
  useEffect(() => { dispatch(getPreciosAction()) }, []);

	const { id } = params; //? Extraes ID de URL
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
            <Link to='/'
              className='btn btn-sm btn-block btn-outline-success '
            > 
              <i className='fa-solid fa-plus' />
              {universal.btn.new}
            </Link>

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
        <Table data={precios} /> 
      </Card>
    </Layout>
  )
}

export default Index;