/**
 * * Archivo Promociones Index
 * ? url: /promociones
 */
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
//* 
import useSWR from 'swr';
import axios from 'axios';
//* Texto
import { promo, universal } from '@utils/texts/modGestion';
import endPoints from '@services/api';
//* Redux
import { getPromocionesAction } from '@redux/promocionesDuck';

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
  { nombre: 'Promociones', url: '/promociones' },
];
//* Fetcher
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Index = () => {
  const dispatch = useDispatch();
  const params = useParams();
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
    dispatch(getPromocionesAction({ }));
  }, []);


  return (
  <Layout title={promo.title.index} links={link} haveLink={true}>
    <Card>
      <div className='row'>
        

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
        </div>
      </div>
    </Card>

    <Card style='card-default' > 
      { loading ? <Loader /> : <Table data={precios} setFormShow={setFormShow} formShow={formShow} /> }
    </Card>

    <Canvas
      key='precios'
      title={(formShow.new && promo.title.new )||(formShow.edit && promo.title.edit)}
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