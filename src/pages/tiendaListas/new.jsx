/**
 * * Componente Nueva - Lista Precio 
 * ? Pagina : /lista_precios/:id/tienda
 */
import { Fragment } from 'react';

import Form from '@components/tiendaListaPrecio/Form';


export default function NewTiendaLista() {
  const tiendaListaForm = {
		id: 0,
		tiendaId: 0,
		listaPrecioId: 0
  };

  return (<Form tiendaListaForm={tiendaListaForm} />);
}


