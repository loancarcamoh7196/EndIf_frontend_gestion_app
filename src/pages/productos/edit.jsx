/**
 * * Página: /producto/:id/new
 */
import { useParams  } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import { product, universal } from '@utils/texts/modGestion';
import endPoints from '@services/api';

import Layout from '@layouts/Main';
import Form from '@components/producto/Form';

const link = [
  { nombre: 'Home', url: '/dashboard' },
  { nombre:'Productos', url: '/productos' },
	{ nombre:'Editar', url: '' }
];
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
  const params = useParams();
	const { id } = params; // Extraes ID de URL
	const { data: producto, error } = useSWR( id ? (endPoints.productos.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!producto) return <p className="column is-medium is-active">Cargando...</p>;

  let productForm = {
		id: producto.id,	
		nombre: producto.nombre,
		codigoInterno: producto.codigoInterno,
		activo: producto.activo,
		exento: producto.exeto,
		esInvetario: producto.esInventario,
		comanda: producto.comanda,
		esIngrediente: producto.esIngrediente,
		tieneEnvase: producto.tieneEnvase,
		empresaRut: producto.empresaRut,
		unidadId: producto.unidadId,
		subfamiliaId: producto.subfamiliaId
  };

  return (
    <Layout title={product.title.edit} links={link} haveLink={true}>
			<Form product={productForm} formNewProduct={false} />
		</Layout>
  )
}

export default Edit;
