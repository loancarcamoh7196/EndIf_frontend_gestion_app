/**
 * * Archivo Oferta Index
 * ? url: /ofertas
 */
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
//* 
import useSWR from 'swr';
import axios from 'axios';
//* Texto
import {  universal, offer, offerList } from '@utils/texts/modGestion';
import endPoints from '@services/api';
//* Redux
import { getOfertasAction } from '@redux/ofertasDuck';
//* Componentes
import Layout from '@layouts/Main';
import Table from '@components/oferta/Table';  
import Card from '@common/Card';
import Loader from '@common/Loader';
import Canvas from '@common/OffCanvas';
import New from '@pages/ofertas/new';
import Edit from '@pages/ofertas/edit';
//* Breadcrum
const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre: 'Ofertas', url: '/ofertas' }
];
//* Fetcher
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Index = () => {
  const dispatch = useDispatch();
  
  const ofertas = useSelector((store) => store.ofertas.list);
  const loading = useSelector((store) => store.ofertas.loading);

  //* Declaración State para Formulario
  const [formShow, setFormShow] = useState({ edit: false, new: false });

  //* Ejecutar al renderizar 
  useEffect(() => {
    dispatch(getOfertasAction());
  }, []);

  
  return (
  <Layout title={offer.title.index} links={link} haveLink={true}>
    <Card>
      <div className='row'>

        <div className='col-4 mb-3 float-sm-right'>
          <button
            type='button'
            onClick={()=>setFormShow({ edit: false, new: true })}
            title={offer.txt.new}
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
      { loading ? <Loader /> : <Table data={ofertas} setFormShow={setFormShow} formShow={formShow} /> }
    </Card>

    <Canvas
      key='ofertas'
      title={(formShow.new && offer.title.new )||(formShow.edit && offer.title.edit)}
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