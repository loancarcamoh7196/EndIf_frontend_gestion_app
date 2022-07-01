/**
 ** Pagina : /admin/roles/new
 */
import { Fragment } from 'react';
import { role } from '../../utils/textModAdmin'

import Layout from '@layouts/Main';
import Form from '@components/RolesForm';


const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Roles', url: '/admin/roles' },
	{ nombre:'Nueva', url: '/admin/roles/new' }
];


export default function NewRoles() {
  const rolForm = {
		id: 0,
		nombre: '',
		accesoGestion: false,
		accesoPv: false,
		accesoContabilidad: false,
		accesoInventario: false,
		accesoInventarioMovil: false,
  };

  return (
		<Layout title={role.title.new} links={link} haveLink={true}>
			<Form rolForm={rolForm} />
		</Layout>
  );
}


