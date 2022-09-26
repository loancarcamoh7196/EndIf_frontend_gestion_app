/**
 * * Archivo Turno Index
 * ? url: /turnos
 */
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//* Texto
import { universal, shift } from '@utils/texts/modGestion';
import { Link } from 'react-router-dom';
//* Redux
import { getTurnosAction } from '@redux/turnosDuck';
import { getTiendasAction } from '@redux/tiendasDuck';
//* Componentes
import Layout from '@layouts/Main';
import Table from '@components/turno/Table';
import Card from '@common/Card';
import Canvas from '@common/OffCanvas';
import Loader from '@common/Loader';
import New from '@pages/turnos/new';
import Edit from '@pages/turnos/edit';
//* Breadcrum
const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre:'Turnos', url: '/admin/turnos' }
];

const Index = () => {
  const dispatch = useDispatch();
  let turnos = useSelector((store) => store.turnos.list);
  const loading = useSelector((store) => store.turnos.loading);
  useEffect(() => {
    dispatch(getTurnosAction());
    dispatch(getTiendasAction());
  }, []);

  //* Declaración State para Formulario
  const [formShow, setFormShow] = useState({ edit: false, new: false, });
  
  return (
    <Layout title={shift.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 

        <div class="d-grid gap-1 d-md-flex justify-content-md-end">
          <button
            type='button'
            onClick={()=>setFormShow({ edit: false, new: true })}
            className='btn btn-sm btn-outline-success mb-2'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasRight'
            aria-controls='offcanvasRight'
          > 
            <i className='fa-solid fa-plus'/>
            {universal.btn.new}
          </button>
        </div> 

        { loading ? <Loader /> : <Table data={turnos} setFormShow={setFormShow} formShow={formShow} /> }
      </Card>

    <Canvas
      key='precios'
      title={(formShow.new && shift.title.new )||(formShow.edit && shift.title.edit)}
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