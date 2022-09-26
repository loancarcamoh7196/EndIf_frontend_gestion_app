/**
 * * Pagina  Turno [Agregar]
 * ? url: /admin/turnos
 */
import { Fragment } from 'react';
//? Componentes
import Form from '@components/turno/Form';

export default function NewTurno() {
  const turnoForm = {
		id: 0,
		nombre: '',
		tiendaId: 0
  };

  return ( <Form turnoForm={turnoForm} /> );
}


