/**
 ** Componente Familia Table
 *?  /subfamilias
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';
//? Redux
import { deleteFamiliaAction } from '@redux/familiasDuck';

const SubFamiliaTable = ({data}) => {
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
    <tr key={row.id} id={`fil-${row.id}`}>
      <td>{row.id} </td>
      <td>{row.nombre}</td>
      <td> 
        <Link to={`/familias/${row.id}/edit`} className='btn btn-xs btn-outline-warning'>
          <i className='fa-solid fa-file-pen m-1' />
        </Link>
        &nbsp;
        <button className='btn btn-xs btn-outline-danger' onClick={()=> dispatch(deleteFamiliaAction({ id: row.id }))}>
          <i className='fa-solid fa-trash-can m-1' /> 
        </button>
      </td>
    </tr>
  ));
  
  return  (
    <DataTable
      key='tab_usuarios'
      encabezado={titulos}
      data={content}
      opciones={options}
    /> );
}
export default SubFamiliaTable;
