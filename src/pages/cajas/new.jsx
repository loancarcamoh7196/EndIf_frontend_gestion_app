/**
 ** Pagina : /cajas/new
 */
import { Fragment } from 'react';
import { cashRegister } from '@utils/texts/modGestion';

import Layout from '@layouts/Main';
import Form from '@components/caja/Form';

const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre:'Cajas', url: '/cajas' },
	{ nombre:'Nueva', url: '/cajas/new' }
];

export default function NewCaja() {
  const cajaForm = {
		id: 0,
		nombre: '',
		numero: 0,
		puerto: 0,
		serv: 0,	
		serv2: 0,
		cnx: '',
		esFabrica: false,
		activa: false,
		sincroniza: false,
		tiendaId: 0
  };

  return (
		<Layout title={cashRegister.title.new} links={link} haveLink={true}>
			<Form cajaForm={cajaForm} />
		</Layout>
  );
}


