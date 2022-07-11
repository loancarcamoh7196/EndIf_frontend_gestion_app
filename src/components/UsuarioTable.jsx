/**
 ** Componente Usuario Table
 *  
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';

import { deleteUsuarioAction } from '@redux/usuariosDuck';

const EmpresaTable = ({data}) => {
  const dispatch = useDispatch();
  let content = []; // Contenedor de cuerpo de la tabla
  let encabezado = []; // Contenedor encabezado de la tabla

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
  }; // Opciones de la DataTable

  const head = [
    { row: 'ID' },
    { row: 'Usuario' },
    { row: 'Nombre Completo' },
    { row: 'Email' },
    { row: 'Activo' },
    { row: 'Empresa Asociada' },
    { row: 'Acciones' }
  ];
  
  // rellenar cuerpo de Tabla
  data.map((result) => {
    content.push(
      <tr key={result.id} id={`fil-${result.id}`}>
        <td>{result.id} </td>
        <td>{result.username}</td>
        <td>
          {`${result.nombres} ${result.apellidos}`}
        </td>
        <td>{result.email}</td>
        <td>
          {result.activo ? <i className='fa-solid fa-check text-success' /> : <i className='fa-solid fa-xmark text-danger' />}
        </td>
        <td>
          {result.empresaRut}<br/>{result.empresa.razonSocial}
        </td>
        <td> 
          <Link to={`/admin/usuarios/${result.id}/edit`} className='btn btn-xs btn-outline-warning btn-block'>
            <i className='fa-solid fa-file-pen'/>
          </Link>
          <br />
          <button className='btn btn-xs btn-outline-danger btn-block' onClick={()=>{
            dispatch(deleteUsuarioAction({ id: result.id }));
          }}>
            <i className='fa-solid fa-trash-can' /> 
          </button>
        </td>
        

      </tr>
    )
  });

  // Llenar encabezado de Tabla
  head.map((i) => encabezado.push(<th>{i.row}</th>) );
  
  return  <DataTable id='tab_usuarios' key='tab_usuarios' encabezado={encabezado} data={content} opciones={options}  /> ;
}

export default EmpresaTable;
