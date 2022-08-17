/**
 ** Pagina : /admin/marcas/[edit]
 */
import { useSelector } from 'react-redux';
//* Utilidades de envios a API
import useSWR from 'swr';
import axios from 'axios';
import endPoints from '@services/api';
//* Marcas
import Form from '@components/marca/Form';
//* 
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
	const id = useSelector(store => store.marcas.form);	
	console.log(id);	

	const { data: marca, error } = useSWR( id ? (endPoints.marcas.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!marca) return <p className="column is-medium is-active">Cargando...</p>;
	console.log('Marcas: ', marca);

  let marcaForm = {
		id: marca.id,
		nombre: marca.nombre,
  };

  return (
		<Form marcaForm={marcaForm} formNewMarca={false} />
	)
}

export default Edit;
