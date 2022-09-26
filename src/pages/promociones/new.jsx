/**
 * * Pagina Precio - Nueva
 * ? url : /productos/:id/lista_precios [Nueva]
 */
import { Fragment } from 'react';

import Form from '@components/precio/Form';

export default function NewPrecios() {
  const precioForm = {
		id: 0,
		neto: 0,
		iva: 0,
		precioPublico: 0,
		esExento: false,
		esMayorista: false,
		productoId: 0,
		listaPrecioId:0,
  };

  return (<Form precioForm={precioForm} />);
}


