/**
 * * Unidad - edit 
 * ? Pagina : /unidades
 */
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
import endPoints from '@services/api';
//* Componente
import Form from '@components/unidad/Form';
//* Fetcher
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
  const id = useSelector(store => store.unidades.form);
	
	const { data: unidad, error } = useSWR( id ? (endPoints.unidades.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!unidad) return <p className="column is-medium is-active">Cargando...</p>;

  let unidadForm = {
		id: unidad.id,
		nombre: unidad.nombre,
		plural: unidad.plural,
  };

  return (<Form unidadForm={unidadForm} formNewUnidad={false} />);
}

export default Edit;
