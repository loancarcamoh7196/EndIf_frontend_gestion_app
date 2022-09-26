/**
 * * Pagina Precio - Edit
 * ? url: /ofertas[Editar]
 */
import { useDispatch, useSelector } from 'react-redux';
//* Complementos Request
import useSWR from 'swr';
import axios from 'axios';
//* Texto
import endPoints from '@services/api';
//* Componentes
import Form from '@components/oferta/Form';
import Loader from '@common/Loader';

//* Fetcher
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
	const id  = useSelector((store) => store.ofertas.form ); //? Extraes ID de URL
	const { data: oferta, error } = useSWR( id ? (endPoints.ofertas.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!oferta) return <Loader />;

  let ofertaForm = {
		id: oferta.id,
		descripcion: oferta.descripcion,
		precio: oferta.precio,
		activa: oferta.activa
  };

  return ( <Form ofertaForm={ofertaForm} formNewOferta={false} /> );
}

export default Edit;
