/**
 ** Pagina : /admin/empresa/new
 */
import React, { Fragment } from 'react';

import Layout from '@layouts/Main';
import Form from '@components/FormEmpresa';
import { Link, Outlet } from 'react-router-dom';

const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Empresas', url: '/admin/empresas' },
	{ nombre:'Nueva', url: '/admin/empresas/new' }
];

const titlePage = 'Agregar Empresa';

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
		// 'direccion': {
		// 	'id': '1',
		// 	'calle': 'Agustinas 681, of 1703',
		// 	'ciudad': 'Santiago',
		// 	'comunaId': 309
		// }
  };

  return (
		<Layout title='Agregar nueva Empresa' links={link} haveLink={true}>
			<Form empresaForm={empresaForm} />
		</Layout>
    
  );
}


