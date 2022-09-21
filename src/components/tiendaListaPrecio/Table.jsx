/**
 ** Componente Precios Table
 *? alojado en: /productos/:id/precios 
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';
//? Redux
import { deleteTiendaListaAction } from '@redux/tiendaListaPrecioDuck';
import { showFormAction } from '../../redux/tiendaListaPrecioDuck';

const TiendaListaTable = ({data, setFormShow}) => {
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
  const titulos = [
    'ID', 'Tienda', 'Lista', 'Acciones'
  ];
  
  //* Generar columnas de Tabla
  data.map((row) => content.push(
    <tr key={row.id} id={`fil-${row.id}`}>
      <td>{row.id} </td>
      <td>{row.tienda.nombre}</td>
      <td>{row.listaPrecio.lista}</td>
      <td> 
        <button
          className='btn btn-xs btn-outline-warning m-1'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasRight'
          aria-controls='offcanvasRight'
          onClick={()=>{
            setFormShow({ edit: true, new: false });
            dispatch(showFormAction({ id: row.id }));
          }}
        >
          <i className='fa-solid fa-file-pen' />
        </button>
        <button
          className='btn btn-xs btn-outline-danger m-1'
          onClick={()=>{
            dispatch(deleteTiendaListaAction({ id: row.id }));
          }}
        >
          <i className='fa-solid fa-trash-can' /> 
        </button>
      </td>
    </tr>
  ));

  return (
    <DataTable
      key='tab_precios'
      encabezado={titulos}
      data={content}
      opciones={options}
    />);
}

export default TiendaListaTable;
