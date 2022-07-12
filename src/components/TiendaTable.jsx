/**
 ** Componente Tienda Table
 *  
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';

import { deleteTiendaAction } from '@redux/tiendasDuck';

const TiendaTable = ({data}) => {
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
    { row: 'Nombre' },
    { row: 'Empresa' },
    { row: 'Direccion' },
    { row: 'Acciones' }
  ];
  
  // rellenar cuerpo de Tabla
  data.map((result) => {
    content.push(
      <tr key={result.id} id={`fil-${result.id}`}>
        <td>{result.id} </td>
        <td>{result.nombre}</td>
        <td>{result.empresaRut}</td>
        <td>{result.direccionId}</td>
        <td> 
          <Link
            to={`/tiendas/${result.id}/edit`} 
            className='btn btn-xs btn-outline-warning btn-block'
          >
            <i className='fa-solid fa-file-pen' />
          </Link>
          <br  />
          <button
            className='btn btn-xs btn-outline-danger btn-block' 
            onClick={()=>{
              dispatch(deleteTiendaAction({ id: result.id }));
            }}
          >
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

export default TiendaTable;
