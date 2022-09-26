/**
 * * Pagina Oferta - Nueva
 * ? url : /ofertas [Nueva]
 */
import { Fragment } from 'react';

import Form from '@components/oferta/Form';

export default function NewOfertas() {
  const ofertaForm = {
		id: 0,
		descripcion: 0,
		precio: 0,
		activa: false
  };

  return (<Form ofertaForm={ofertaForm} />);
}


