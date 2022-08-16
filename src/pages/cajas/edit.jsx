/**
 * * Pagina: /cajas/:id/edit
 */
import { useParams  } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
// ? Texto
import { cashRegister, universal } from '@utils/texts/modGestion';
import endPoints from '@services/api';
// ? Componentes
import Layout from '@layouts/Main';
import Form from '@components/caja/Form';

const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre:'Cajas', url: '/cajas' },
	{ nombre:'Editar', url: '' }
];
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
  const params = useParams();
	const { id } = params; //? Extraes ID de URL
	const { data: cajas, error } = useSWR( id ? (endPoints.cajas.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!cajas) return <p className="column is-medium is-active">Cargando...</p>;

  let cajaForm = {
		id: cajas.id,
		nombre: cajas.nombre,
		numero: cajas.numero,
		puerto: cajas.puerto,
		serv: cajas.serv,
		serv2: cajas.serv2,
		cnx: cajas.cnx,
		esFabrica: cajas.esFabrica,
		activa: cajas.activa,
		sincroniza: cajas.sincroniza,
		tiendaId: cajas.tiendaId
  };

  return (
    <Layout title={cashRegister.title.edit} links={link} haveLink={true}>
			<Form cajaForm={cajaForm} formNewCaja={false} />
		</Layout>
  )
}

export default Edit;
