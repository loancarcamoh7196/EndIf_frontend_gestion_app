/**
 * * Pagina Barra - Edit
 * ? url: /productos/:id/barras [Editar]
 */
import { useDispatch, useSelector } from 'react-redux';
//* Complementos Request
import useSWR from 'swr';
import axios from 'axios';
//* Texto
import endPoints from '@services/api';
//* Componentes
import Form from '@components/barra/Form';
import Loader from '@common/Loader';

//* Fetcher
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
  // const params = useParams();
	const id  = useSelector((store) => store.barras.form ); //? Extraes ID de URL
	const { data: barra, error } = useSWR( id ? (endPoints.barras.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!barra) return <Loader />;

  let barraForm = {
		id: barra.id,
		codigo: barra.codigo,
		productoId: barra.productoId,
		unidadId: barra.unidadId
  };

  return ( <Form barraForm={barraForm} formNewBarra={false} /> );
}

export default Edit;
