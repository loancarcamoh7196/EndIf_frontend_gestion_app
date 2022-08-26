/**
 ** Componente Roles Table
 *? alojado en: /roles 
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';
//? Redux
import { deleteRolAction } from '@redux/rolesDuck';

const RolesTable = ({data}) => {
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
    'ID', 'Neto', 'IVA', 'Precio Público', 'Es Exento', 'Es Mayorista', 'Producto', 'Lista','Acciones'
  ];
  
  //* Generar columnas de Tabla
  data.map((row) => content.push(
    <tr key={row.id} id={`fil-${row.id}`}>
      <td>{row.id} </td>
      <td>{row.nombre}</td>
      <td>
        {row.accesoGestion ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger' />}
      </td>
      <td>
        {row.accesoPv ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.accesoContabilidad ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.accesoInventario ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.accesoInventarioMovil ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td> 
        <Link to={`/admin/roles/${row.id}/edit`} className='btn btn-xs btn-outline-warning btn-block'>
          <i className='fa-solid fa-file-pen' />
        </Link>
        <button className='btn btn-xs btn-outline-danger btn-block' onClick={()=>{
          dispatch(deleteRolAction({ id: row.id }));
        }}>
          <i className='fa-solid fa-trash-can' /> 
        </button>
      </td>
    </tr>
  ));

  return (
    <DataTable
      key='tab_usuarios'
      encabezado={titulos}
      data={content}
      opciones={options}
    />);
}

export default RolesTable;
