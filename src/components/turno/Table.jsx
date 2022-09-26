/**
 ** Componente Turno Table
 *? alojado en: /turnos
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';
//? Redux
import { deleteTurnoAction, showFormAction } from '@redux/turnosDuck';

const TurnoTable = ({data, setFormShow}) => {
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
    'ID', 'Nombre', 'Tienda', 'Acciones'
  ];
  
  //* Generar columnas de Tabla
  data.map((row) => content.push(
    <tr key={row.id} id={`fil-${row.id}`}>
      <td>{row.id} </td>
      <td>{row.nombre}</td>
      <td>{row.tiendaNombre}</td>
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
        <button className='btn btn-xs btn-outline-danger'
          onClick={()=>{ dispatch(deleteTurnoAction({ id: row.id })); }}
        >
          <i className='fa-solid fa-trash-can' /> 
        </button>
      </td>
    </tr>
  ));


  return (
    <DataTable
      key='tab_turnos'
      encabezado={titulos}
      data={content}
      opciones={options}
    />);
}

export default TurnoTable;
