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
		encabezado: {
      id: 0,
      fecha: '',
      nroDocumento: '',
      neto: 0,
      iva: 0,
      exento: 0,  
      total: 0,
      usuarioId: 0,
      cajaId: 0,
      documentoTipoId: 0
    },
    detalle: {
      id: 0,
      cantidad: 0,
      neto: 0,
      iva: 0,
      total: 0,
      totalDcto: 0,
      esExento: 0,
      ventaEncabezadoId: 0,
      productoId: 0
    },
    pago: {
      id: 0,
      montoPago: 0,
      ventaEncabezadoId: 0,
      formaPagoId: 0
    }
  };

  return (
		<Layout title={sales.title.new} links={link} haveLink={true}>
			<Form ventaForm={ventaForm} />
		</Layout>
  );
}


