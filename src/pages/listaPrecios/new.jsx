/**
 ** Lista de Precio - new
 *? Pagina : /lista_precio
 */
//* Componente
import Form from '@components/listaPrecio/Form';

export default function NewListaPrecios() {
  const listaForm = {
		id: 0,
		lista: '',
		empresaRut: '',
  };

  return (<Form listaForm={listaForm} />);
}
