/**
 * * Componente Nueva - Lista Precio 
 * ? Pagina : /productos/:id/lista_precio
 */
import { Fragment } from 'react';

import Form from '@components/listaPrecio/Form';


export default function NewRoles() {
  const rolForm = {
		id: 0,
		lista: '',
		empresaRut: '',
  };

  return (<Form rolForm={rolForm} />);
}


