/**
 ** Pagina : /admin/marcas/[new]
 */
//* Componentes
import Form from '@components/marca/Form';

export default function NewMarca() {
  const marcaForm = {
		id: 0,
		nombre: '',
  };

  return (<Form marcaForm={marcaForm} />);
}
