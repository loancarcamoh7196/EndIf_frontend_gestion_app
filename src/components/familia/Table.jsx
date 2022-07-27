/**
 ** Componente Familia Table
 *  /familias
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';

import { deleteRolAction } from '@redux/rolesDuck';

const EmpresaTable = ({data}) => {
  const dispatch = useDispatch();
  let content = []; // Contenedor de cuerpo de la tabla
  let encabezado = []; // Contenedor encabezado de la tabla

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
  }; // Opciones de la DataTable

  const titulos = [
    { row: 'ID' },
    { row: 'Nombre' },
    { row: 'Empresa' },
    { row: 'Acciones' }
  ];
  
  console.log(data);


  // rellenar cuerpo de Tabla
  data.map((row) =>
    content.push(
      <tr key={row.id} id={`fil-${row.id}`}>
        <td>{row.id} </td>
        <td>{row.nombre}</td>
        <td>{row.subfamilia.map((e)=><p> {e.nombre} </p>)}</td>
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
    )
  );

  // Llenar encabezado de Tabla
  titulos.map((i) => encabezado.push(<th>{i.row}</th>) );
  
  return  (<DataTable id='tab_usuarios' key='tab_usuarios' encabezado={encabezado} data={content} opciones={options}  /> );
}

export default EmpresaTable;
