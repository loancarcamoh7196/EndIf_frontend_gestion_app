/**
 ** Componente Usuario Table
 *? Alojada en  /usuarios 
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';
//? Redux
import { deleteUsuarioAction } from '@redux/usuariosDuck';

const ProductoTable = ({data}) => {
  const dispatch = useDispatch();
  let content = []; // Contenedor de cuerpo de la tabla

  //* Opciones de la DataTable
  const options = {
    responsive: false,
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
  const titles = [ 'ID', 'Usuario', 'Nombre Completo', 'Email', 'Activo', 'Empresa Asociada', 'Acciones' ];
  //* Generar columnas
  data.map((row) => content.push(
    <tr key={row.id} id={`fil-${row.id}`}>
      <td>{row.id} </td>
      <td>{row.username}</td>
      <td>
        {`${row.nombres} ${row.apellidos}`}
      </td>
      <td>{row.email}</td>
      <td>
        {row.activo ? <i className='fa-solid fa-check text-success' /> : <i className='fa-solid fa-xmark text-danger' />}
      </td>
      <td>
        {row.empresaRut}<br/>{row.empresa.razonSocial}
      </td>
      <td> 
        <Link to={`/admin/usuarios/${row.id}/edit`} className='btn btn-xs btn-outline-warning btn-block'>
          <i className='fa-solid fa-file-pen'/>
        </Link>
        <br />
        <button className='btn btn-xs btn-outline-danger btn-block' onClick={()=>{
          dispatch(deleteUsuarioAction({ id: row.id }));
        }}>
          <i className='fa-solid fa-trash-can' /> 
        </button>
      </td>
    </tr>
  ));
  
  return  <DataTable key='tab_usuarios' encabezado={titles} data={content} opciones={options}  /> ;
}

export default ProductoTable;
