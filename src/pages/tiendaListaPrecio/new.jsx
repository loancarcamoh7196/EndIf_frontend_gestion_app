/**
 * * Componente Nueva - Lista Precio 
 * ? Pagina : /lista_precios/:id/tienda
 */
import Form from '@components/tiendaListaPrecio/Form';


export default function NewTiendaLista({listaId}) {
  const tiendaListaForm = {
		id: 0,
		tiendaId: 0,
		listaPrecioId: listaId
  };

  return <Form tiendaListaForm={tiendaListaForm} />;
}


