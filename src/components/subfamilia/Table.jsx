/**
 ** Componente Familia Table
 *?  /subfamilias
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';
//? Redux
import { deleteUnidadAction, showFormAction } from '@redux/unidadesDuck';

const SubFamiliaTable = ({data, setFormShow, formShow, buttonDelete }) => {
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

  //* Encabezado
  const titulos = ['ID', 'Nombre de Sub Familia', 'Acciones'];
  
  //* Rellenar cuerpo de Tabla
  data.map((row) => content.push(
    <tr key={row.id.toString()} id={`fil-${row.id}`}>
      <td>{row.id} </td>
      <td>{row.nombre}</td>
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
          onClick={()=> dispatch(deleteUnidadAction({ id: row.id }))}
        >
          <i className='fa-solid fa-trash-can m-1' /> 
        </button>
      </td>
    </tr>
  ));
  
  return  (
    <DataTable
      key='tab_subfamilia'
      encabezado={titulos}
      data={content}
      opciones={options}
    /> );
}
export default SubFamiliaTable;
