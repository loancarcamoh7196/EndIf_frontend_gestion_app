/**
 * * Componente Editar - Lista Prueba
 * ? url Pagina : /lista_precio/:id/tienda
 */
import { useDispatch, useSelector } from 'react-redux';
//* Complementos Request
import useSWR from 'swr';
import axios from 'axios';
//* Textos
import endPoints from '@services/api';
//* Componentes
import Form from '@components/listaPrecio/Form';
import Loader from '@common/Loader';
//* Fetcher
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
	const id = useSelector((store)=> store.tiendaListas.form); //? Extraes ID de URL
	const { data: lista, error } = useSWR( id ? (endPoints.tiendaListaPrecio.get(id)) : null, fetcher );

	if (error) return <p className='container is-medium'>Falló en la carga...</p>;
	if (!lista) return <Loader />;

  let listaForm = {
		id: lista.id,
		tiendaId: lista.tiendaId,
		listaPrecioid: lista.listaPrecioid
  };

  return ( <Form tiendaListaForm={listaForm} formNewLista={false} /> );
}

export default Edit;
