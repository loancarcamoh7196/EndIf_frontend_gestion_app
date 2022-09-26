/**
 * * Pagina Precio - Edit
 * ? url: /productos/:id/lista_precios [Editar]
 */
import { useDispatch, useSelector } from 'react-redux';
//* Complementos Request
import useSWR from 'swr';
import axios from 'axios';
//* Texto
import { price, universal } from '@utils/texts/modGestion';
import endPoints from '@services/api';
//* Componentes
import Form from '@components/precio/Form';
import Loader from '@common/Loader';

//* Fetcher
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
  // const params = useParams();
	const id  = useSelector((store) => store.precios.form ); //? Extraes ID de URL
	const { data: precio, error } = useSWR( id ? (endPoints.precios.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!precio) return <Loader />;

  let precioForm = {
		id: precio.id,
		neto: precio.neto,
		iva: precio.iva,
		precioPublico: precio.precioPublico,
		esExento: precio.esExento,
		esMayorista: precio.esMayorista,
		productoId: precio.productoId,
		listaPrecioId: precio.listaPrecioId,
  };

  return ( <Form precioForm={precioForm} formNewPrecio={false} /> );
}

export default Edit;
