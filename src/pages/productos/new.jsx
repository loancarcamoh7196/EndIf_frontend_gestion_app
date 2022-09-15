/**
 * * Productos - new
 * ? url : /productos/new
 */
import Layout from '@layouts/Main';
import Form from '@components/producto/Form';
//* Texto
import { product } from '@utils/texts/modGestion';
//*Breadcrum
const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre:'Producto', url: '/productos' },
	{ nombre:'Nueva', url: '/productos/new' }
];

export default function NewProducto() {
  const productoForm = {
		id: 0,
		nombre: '',
		codigoInterno: '',
		activo: false,
		exento: false,
		esInventario: false,
		comanda: false,
		esIngrediente: false,
		tieneEnvase: false,
		empresaRut: '',
		unidadId: 0,
		subFamiliaId: 0
  };

  return (
		<Layout title={product.title.new} links={link} haveLink={true}>
			<Form productoForm={productoForm} />
		</Layout>
  );
}


