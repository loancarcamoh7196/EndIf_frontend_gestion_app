/**
 ** Pagina : /tiendas
 *? Mentenedor de sucursales
 */
import { Fragment } from 'react';
import { shop } from '@utils/textModGestion'

import Layout from '@layouts/Main';
import Form from '@components/tienda/Form';


const link = [
  { nombre: 'Home', url: '/dashboard' },
  { nombre:'Sucursales', url: '/tiendas' },
	{ nombre:'Nueva', url: '/tiendas/new' }
];


export default function NewTienda() {
  const tiendaForm = {
		id: 0,
		nombre: '',
		empresaRut: '',
		direccionId: 0,
		calle: '',
		ciudad: '',
		comunaId: 0
  };

  return (
		<Layout title={shop.title.new} links={link} haveLink={true}>
			<Form tiendaForm={tiendaForm} />
		</Layout>
  );
}


