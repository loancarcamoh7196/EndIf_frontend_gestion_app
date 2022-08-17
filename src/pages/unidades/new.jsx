/**
 ** Unidades - new
 *? Pagina : /admin/unidades
 */
//* Componente
import Form from '@components/unidad/Form';

export default function NewUnidad() {
  const unidadForm = {
		id: 0,
		nombre: '',
		plural: '',
  };

  return ( <Form unidadForm={unidadForm} /> );
}


