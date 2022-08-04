/**
 ** Pagina : /admin/roles/new
 */
import { Fragment } from 'react';
import { product, role } from '../../utils/texts/modGestion';

import Layout from '@layouts/Main';
import Form from '@components/producto/Form';


const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Roles', url: '/admin/roles' },
	{ nombre:'Nueva', url: '/admin/roles/new' }
];


export default function NewProducto() {
  const productoForm = {
		id: 0,
		nombre: '',
		codigoInterno: false,
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


