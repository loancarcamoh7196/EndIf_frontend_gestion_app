/**
 ** Componente Lista de Precio Table
 *? alojado en: /lista_precio
 */
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';
//? Redux
import { deleteListaPrecioAction, showFormAction } from '@redux/listaPreciosDuck';

const ListaPrecioTable = ({ data, setFormShow }) => {
  const dispatch = useDispatch();
  let content = []; //? Contenedor de cuerpo de la tabla
  //* Opciones de la DataTable
  const options = {
    responsive: true,
    loading: true,
    destroy: true,
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: true,
    info: true,
    autoWidth: true,
    stateSave: false,
    bDestroy: true,
    processing: true,
    serverSide: false,
    fixedHeader: false,
    buttons: false
  }; 

  //* Encabezados
  const titulos = [ 'ID', 'Nombre','Acciones' ];
  
  //* Generar columnas de Tabla
  data.map((row) => content.push(
    <tr key={row.id} id={`fil-${row.id}`}>
      <td>{row.id} </td>
      <td>{row.lista}</td>
      <td> 
        <button
          type='button'
          onClick={()=>{
            setFormShow({ edit: true, new: false });
            dispatch(showFormAction({ id: row.id }));
          }}
          className='btn btn-xs btn-outline-warning'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasRight'
          aria-controls='offcanvasRight'
        >
          <i className='fa-solid fa-file-pen m-1' />
        </button>
        &nbsp;
        <button
          className='btn btn-xs btn-outline-danger' 
          onClick={()=>{
            dispatch(deleteListaPrecioAction({ id: row.id }));
          }}
        >
          <i className='fa-solid fa-trash-can' /> 
        </button>
      </td>
    </tr>
  ));

  return (
    <DataTable
      key='tab_lista'
      encabezado={titulos}
      data={content}
      opciones={options}
    />
  );
}

export default ListaPrecioTable;
