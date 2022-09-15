/**
 ** Componente Familia Table
 *?  /familias
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';
//? Redux
import { deleteFamiliaAction } from '@redux/familiasDuck';
import { subfamily } from '../../utils/texts/modGestion';

const FamiliaTable = ({data}) => {
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
  const titulos = ['ID', 'Nombre', 'Empresa', 'Acciones'];
  
  //* Rellenar cuerpo de Tabla
  data.map((row) => content.push(
    <tr key={row.id.toString()} id={`fil-${row.id}`}>
      <td>{row.id} </td>
      <td>{row.nombre}</td>
      <td>{row.subfamilia.map((e)=><p> {e.nombre} </p>)}</td>
      <td> 
        <Link to={`/familias/${row.id}/edit`} className='btn btn-xs btn-outline-warning btn-block'>
          <i className='fa-solid fa-file-pen' />
        </Link>
        <button className='btn btn-xs btn-outline-danger btn-block' onClick={()=> dispatch(deleteFamiliaAction({ id: row.id }))}>
          <i className='fa-solid fa-trash-can' /> 
        </button>
        <Link to={`/subfamilias/${row.id}`} className='btn btn-xs btn-info btn-block'>
          {subfamily.btn.showSubFamily}
        </Link>
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
export default FamiliaTable;
