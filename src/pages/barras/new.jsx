/**
 * * Pagina Barra - Nueva
 * ? url : /productos/:id/barras	 [Nueva]
 */
import { Fragment } from 'react';

import Form from '@components/barra/Form';

export default function NewBarra({ productoId }) {
  const barraForm = {
		id: 0,
		codigo: 0,
		productoId: parseInt(productoId)
  };
  console.log('Producto ID enviado: ', productoId);

  return (<Form barraForm={barraForm} formNewBarra={true} />);
}


