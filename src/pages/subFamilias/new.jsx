/**
 ** Pagina : /subfamilias/new
 */
import { Fragment } from 'react';
import { subfamily } from '../../utils/texts/modGestion';

import Form from '@components/subfamilia/Form';

export default function NewSubFamily({familiaId}) {
  const subfamilyForm = {
		id: 0,
		nombre: '',
		familiaId: familiaId
  };

  return (
		<Fragment>
			<Form subfamilyForm={subfamilyForm} />
		</Fragment>
  );
}

