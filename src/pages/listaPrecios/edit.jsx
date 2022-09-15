/**
 * * Lista Precio - edit
 * ? Pagina: /lista_precio
 */
import { useSelector } from 'react-redux';
//* Complementos Request
import useSWR from 'swr';
import axios from 'axios';
//* Texto
import endPoints from '@services/api';
//* Componente
import Form from '@components/listaPrecio/Form';
import Loader from '@common/Loader';

//* Fetcher
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
	const id  = useSelector(store => store.listaPrecios.form); //? Extraes ID de URL
	// console.log(id);
	const { data: lista, error } = useSWR( id ? (endPoints.listaPrecios.get(id)) : null, fetcher );

	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!lista) return <Loader />;

  let listaForm = {
		id: lista.id,
		lista: lista.lista,
		empresaRut: lista.empresaRut
  };

  return ( <Form listaForm={listaForm} formNewLista={false} /> );
}

export default Edit;
