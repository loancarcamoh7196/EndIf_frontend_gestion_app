/**
 * * Pagina  Turno [Editar]
 * ? url: /admin/turnos
 */
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
//? Texto
import endPoints from '@services/api';
//? Componentes
import Form from '@components/turno/Form';
import Loader from '@common/Loader';
//? Fetcher
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
  // const params = useParams();
	const id = useSelector((store) => store.turnos.form); //? Extraes ID de URL
	console.log(endPoints.turnos.get(id));
	const { data: turno, error } = useSWR( id ? (endPoints.turnos.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!turno) return <Loader />;

  let turnoForm = {
		id: turno.id,
		nombre: turno.nombre,
		tiendaId: turno.turnoId
  };

  return (<Form turnoForm={turnoForm} formNewTurno={false} /> );
}

export default Edit;
