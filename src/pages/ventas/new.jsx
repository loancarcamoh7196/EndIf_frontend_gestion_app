/**
 * * Venta - new 
 * ? url : /ventas/new
 */
import { sales } from '@utils/texts/modGestion';
//* Componente
import Layout from '@layouts/Main';
import Form from '@components/venta/Form';
//* Breadcrum
const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre:'Ventas', url: '/ventas' },
	{ nombre:'Nueva', url: '/ventas/new' }
];

export default function NewVentas() {
  const ventaForm = {
		id: 0,
		fecha: '',
		nroDocumento: 0,
		neto: 0,
		iva: 0,
		exento: 0,
		total: 0,
		usuarioId: 0,
		cajaId: 0,
		docTipoId: 0
  };

  return (
		<Layout title={sales.title.new} links={link} haveLink={true}>
			<Form ventaForm={ventaForm} />
		</Layout>
  );
}


