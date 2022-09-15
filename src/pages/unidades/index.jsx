/**
 * * Archivo Unidad Index
 *? url: /unidades
 */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//* Texto
import { unit } from '@utils/texts/modAdmin';
import { universal } from '@utils/texts/general';
//* Redux
import { getUnidadesAction } from '@redux/unidadesDuck';
//* Componentes
import Layout from '@layouts/Main';
import Table from '@components/unidad/Table';
import Card from '@common/Card';
import Canvas from '@common/OffCanvas';
import Loader from '@common/Loader';
//* Paginas
import New from '@pages/unidades/new';
import Edit from '@pages/unidades/edit';
//* Breadcrum
const link = [
  { nombre: 'Admin', url: '/admin' },
  { nombre:'Unidad', url: '/unidades' }
];

const Index = () => {
  const dispatch = useDispatch();
  const loading = useSelector(store => store.unidades.loading); 

  //* Declaración State
  const [formShow, setFormShow] = useState({ 
    edit: false,
    new: false,
  });

  let unidades = useSelector((store) => store.unidades.list);
  useEffect(() => { dispatch(getUnidadesAction()) }, []);
  
  return (
    <Layout title={unit.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 
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
      </Card>
      <Card style='card-default'>
        { loading ? <Loader /> : <Table data={unidades} setFormShow={setFormShow} /> }
      </Card>

      <Canvas
        key='Unidades'
        title={(formShow.new && unit.title.new )||(formShow.edit && unit.title.edit)}
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