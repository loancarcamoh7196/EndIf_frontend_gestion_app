/**
 * * Lista Precio - edit
 * ? Pagina: /lista_precio
 */
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
import { pricelist, universal } from '../../utils/texts/modGestion';
import endPoints from '@services/api';
//* Componente
import Form from '@components/listaPrecio/Form';

//* Fetcher
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
	const id  = useSelector(store => store.listaPrecios.form); //? Extraes ID de URL
	const { data: lista, error } = useSWR( id ? (endPoints.listaPrecios.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!lista) return <p className="column is-medium is-active">Cargando...</p>;

  let listaForm = {
		id: lista.id,
		lista: lista.lista,
		empresaRut: lista.empresaRut,
  };

  return ( <Form listaForm={listaForm} formNewLista={false} /> );
}

export default Edit;
