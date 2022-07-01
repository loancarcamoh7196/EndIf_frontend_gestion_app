/**
 ** Pagina : /admin/usuarios/new
 */
import { Fragment } from 'react';

import Layout from '@layouts/Main';
import Form from '@components/UsuarioForm';


const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Usuarios', url: '/admin/usuarios' },
	{ nombre:'Nueva', url: '/admin/usuarios/new' }
];

const titlePage = 'Agregar Usuario';

export default function NewUsuario() {
  const usuarioForm = {
		username: '',
		pass: '',
		pass2: '',
		nombres: '',
		apellidos: '',
		email: '',
		activo: true,
		porcentajeDcto: false,
		empresaRut: '',
		rolesId: 0
  };

  return (
		<Layout title='Agregar nuevo Usuario' links={link} haveLink={true}>
			<Form usuarioForm={usuarioForm} />
		</Layout>
  );
}


