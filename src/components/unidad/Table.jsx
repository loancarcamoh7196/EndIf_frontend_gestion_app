/**
 ** Componente Unidades Table
 *? alojado en: /roles 
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';
//? Redux
import { deleteUnidadAction, showFormAction } from '@redux/unidadesDuck';

const UnidadesTable = ({data, setFormShow}) => {
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
  const titulos = [ 'ID', 'Nombre', 'Plural', 'Acciones' ];  
  
  //* Generar columnas de Tabla
  if (data.length >0) {
    data.map((row) => content.push(
      <tr key={row.id} id={`fil-${row.id}`}>
        <td>{row.id} </td>
        <td>{row.nombre}</td>
        <td>{row.plural}</td>
        <td> 
          <button
            className='btn btn-xs btn-outline-warning '
            onClick={()=>{
            setFormShow({ edit: true, new: false });
            dispatch(showFormAction({ id: row.id }));
          }}
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasRight'
            aria-controls='offcanvasRight'
          >
            <i className='fa-solid fa-file-pen' />
          </button>
          &nbsp;
          <button
            className='btn btn-xs btn-outline-danger'
            onClick={()=>{
              dispatch(deleteUnidadAction({ id: row.id }));
            }}
          >
            <i className='fa-solid fa-trash-can' /> 
          </button>
        </td>
      </tr>
    ));
  } else content.push(<tr>Sin datos</tr>);

  return (
    <DataTable
      key='tab_usuarios'
      encabezado={titulos}
      data={content}
      opciones={options}
    />);
}

export default UnidadesTable;
