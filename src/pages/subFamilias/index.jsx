/**
 ** Archivo de pagina: /subfamilias/:id
 */
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
//* Textos
import { subfamily, universal } from '../../utils/texts/modGestion';
import endPoints from '@services/api';
//* Redux
import { getSubFamiliasAction } from '@redux/subFamiliasDuck';
//* Componentes
import Layout from '@layouts/Main';
import Table from '@components/subfamilia/Table';
import Card from '@common/Card';
import FamiliaData from '@components/subfamilia/FamiliaData';
import Canvas from '@common/OffCanvas';
//* Paginas
import New from '@pages/subFamilias/new';
import Edit from '@pages/subFamilias/edit';
//* Fetcher
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

export default function Index() {
  const params = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(store => store.subfamilias.loading); 
  const subfamilias = useSelector((store) => store.subfamilias.list); //? Store de SubFamilia
  //* Declaración State
  const [formShow, setFormShow] = useState({ 
    edit: false,
    new: false,
  });

  const { id } = params; //? Parametros
  //? Texto del Breadcrum
  const link = [
    { nombre: 'Home', url: '/dashboard' },
    { nombre:'Familias', url: '/familias' },
    { nombre: 'SubFamilias', url: `/subfamilias/${id}` }
  ];

  //? Carga de lista de subfamilias
  useEffect(() => {
    dispatch(getSubFamiliasAction({familiaId: id}));
  }, [dispatch]);
  

  //? Recuperacion Data de Familia
  const { data: familia, error } = useSWR( id ? (endPoints.familias.get(id)) : null, fetcher );
	if (error) return <p className='container is-medium'>Falló en la carga...</p>;
	if (!familia) return <p className='column is-medium is-active'>Cargando...</p>;

  return (
    <Layout title={subfamily.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 
        <div className='row'>
          <div className='col-8'>
            <FamiliaData familia={familia} />
          </div>

          <div className='col-4'>
            <button 
              type='button'
              onClick={()=>setFormShow({ edit: false, new: true })}
              className='btn btn-sm btn-block btn-outline-success mb-2'
              data-bs-toggle='offcanvas'
              data-bs-target='#offcanvasRight'
              aria-controls='offcanvasRight'
            >
              <i className='fa-solid fa-plus' />{universal.lbl.nueva}
            </button>
            <Link to='/familias' className='btn btn-sm btn-block btn-outline-danger '>{universal.btn.volver}</Link>
          </div>
        </div>
      </Card>

      <Card style='card-default'>
        {
          loading ?
          <div className='d-flex justify-content-center'>
            <div className='spinner-border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
          : <Table data={subfamilias} setFormShow={setFormShow} formShow={formShow} />
        }
      </Card>

      <Canvas 
        key='newSubFamily' 
        title={(formShow.new && subfamily.title.new )||(formShow.edit && subfamily.title.edit)}
      >
        { formShow.new ?
          <New familiaId={id} />
          : (formShow.edit) ?
            <Edit familiaId={id} />
            : <h1> No hay acciones disponibles </h1>
        }
      </Canvas>
    </Layout>
  )
}


