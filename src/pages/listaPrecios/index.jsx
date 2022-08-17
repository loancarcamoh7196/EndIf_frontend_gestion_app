/**
 ** Archivo Lista de Precio Index
 *? url: /lista_precio
 */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//* Textos
import { price, priceList, universal } from '@utils/texts/modGestion';
//* Redux
import { getListaPreciosAction } from '@redux/listaPreciosDuck';
//* Componentes
import Layout from '@layouts/Main';
import Table from '@components/listaPrecio/Table';
import Card from '@common/Card';
import Canvas from '@common/OffCanvas';
import Loader from '@common/Loader';
//* Paginas
import New from '@pages/listaPrecios/new';
import Edit from '@pages/listaPrecios/edit';
//* BreadCrum
const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre:'Lista Precio', url: '/lista_precio' }
];

const Index = () => {
  const dispatch = useDispatch();
  const loading = useSelector(store => store.listaPrecios.loading);
  
  //* Declaración State
  const [formShow, setFormShow] = useState({ 
    edit: false,
    new: false,
  });

  let listaPrecios = useSelector((store) => store.listaPrecios.list);
  useEffect(() => { dispatch(getListaPreciosAction()) }, []);

  return (
    <Layout title={priceList.title.index} links={link} haveLink={true}>
      <Card style='card-default' > 
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
      </Card>
      <Card style='card-default'>
        { loading ? <Loader /> : <Table data={listaPrecios} setFormShow={setFormShow} /> }
      </Card>
      <Canvas 
        key='Lista' 
        title={(formShow.new && priceList.title.new )||(formShow.edit && priceList.title.edit)}
      >
        { formShow.new ? <New /> : (formShow.edit) ? <Edit /> : <h1> No hay acciones disponibles </h1> }
      </Canvas>
    </Layout>
  )
}

export default Index;