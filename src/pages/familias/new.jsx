/**
 ** Pagina : /familias/new
 */
import { Fragment } from 'react';
import { family } from '../../utils/texts/modGestion';

import Layout from '@layouts/Main';
import Form from '@components/familia/Form';


const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre:'Familias', url: '/familias' },
	{ nombre:'Nueva', url: '/familias/new' }
];


export default function NewFamily() {
  const familyForm = {
		id: 0,
		nombre: '',
		empresaRut: false,
		
  };

  return (
		<Layout title={family.title.new} links={link} haveLink={true}>
			<Form familyForm={familyForm} />
		</Layout>
  );
}


