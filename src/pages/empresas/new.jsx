/**
 ** Pagina : /admin/empresa/new
 */
import React, { Fragment } from 'react';

import Layout from '@layouts/Main';
import Form from '@components/empresa/Form';

const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Empresas', url: '/admin/empresas' },
	{ nombre:'Nueva', url: '/admin/empresas/new' }
];

export default function NewEmpresa() {
  const empresaForm = {
    rut: '',
		razonSocial: '',
		giro: '',
		fono: '',
		email: '',
		logo: '',
		activa: true,
		moduloGestion: false,
		moduloContabilidad: false,
		moduloInventario: false,
		moduloInventarioMovil: false,
		direccionId: 0,
		calle: '',
		ciudad: '',
		comunaId: 0,
		regionId: 0
  };

  return (
		<Layout title='Agregar nueva Empresa' links={link} haveLink={true}>
			<Form empresaForm={empresaForm} />
		</Layout>
    
  );
}


