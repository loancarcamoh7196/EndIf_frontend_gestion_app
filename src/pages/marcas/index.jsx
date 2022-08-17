/**
 * * Archivo Marca Index
 ** Archivo de pagina: /admin/marcas
 */
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//* Texto
import { brand } from '@utils/texts/modAdmin';
import { universal } from '@utils/texts/general';
//* Redux
import { getMarcasAction } from '@redux/marcasDuck';
//* Componentes
import Layout from '@layouts/Main';
import Table from '@components/marca/Table';
import Card from '@common/Card';
import Canvas from '@common/OffCanvas';
//* Paginas
import New from '@pages/marcas/new';
import Edit from '@pages/marcas/edit';

const link = [
  { nombre: 'Admin', url: '/admin' },
  { nombre:'Marca', url: '/admin/marcas' }
];

const Index = () => {
  const dispatch = useDispatch();
  const loading = useSelector(store => store.marcas.loading); 
  let marcas = useSelector((store) => store.marcas.list);

    //* Declaración State
  const [formShow, setFormShow] = useState({ 
    edit: false,
    new: false,
  });

  useEffect(() => { dispatch(getMarcasAction()) }, []);
  
  return (
    <Layout title={brand.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 
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
              <i className='fa-solid fa-plus' />{universal.btn.new}
            </button>
          </div>
          <div className='col-12 col-md-12 col-xl-12'>
            {
              loading ?
              <div className='d-flex justify-content-center'>
                <div className='spinner-border' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              </div>
              : <Table data={marcas} setFormShow={setFormShow} formShow={formShow} />
            }
          </div>
        </div>  
      </Card>
      <Canvas 
        key='Marca' 
        title={(formShow.new && brand.title.new )||(formShow.edit && brand.title.edit)}
      >
        { formShow.new ?
          <New />
          : (formShow.edit) ?
            <Edit />
            : <h1> No hay acciones disponibles </h1>
        }
      </Canvas>
    </Layout>
  )
}

export default Index;