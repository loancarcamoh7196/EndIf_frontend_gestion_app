/**
 * * Pagina Precio - Edit
 * ? url: /lista_precio/:id/tienda [Editar]
 */
import { useDispatch, useSelector } from 'react-redux';
//* Complementos Request
import useSWR from 'swr';
import axios from 'axios';
//* Texto
import { price, universal } from '@utils/texts/modGestion';
import endPoints from '@services/api';
//* Componentes
import Form from '@components/tiendaListaPrecio/Form';
import Loader from '@common/Loader';

//* Fetcher
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
  // const params = useParams();
	const id  = useSelector((store) => store.tiendaListas.form ); //? Extraes ID de URL
	const { data: tiendaLista, error } = useSWR( id ? (endPoints.tiendaListaPrecio.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!tiendaLista) return <Loader />;

  let tiendaListaForm = {
		id: tiendaLista.id,
		tiendaId: tiendaLista.tiendaId,
		precioId: tiendaLista.listaPrecioId
  };

  return ( <Form tiendaListaForm={tiendaListaForm} formNewLista={false} /> );
}

export default Edit;
