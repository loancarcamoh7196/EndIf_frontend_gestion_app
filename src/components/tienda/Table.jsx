/**
 ** Componente Tienda Table
 ** alojado en: /tiendas 
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';
//? Redux
import { deleteTiendaAction } from '@redux/tiendasDuck';

const TiendaTable = ({data}) => {
  const dispatch = useDispatch();
  let content = []; //? Contenedor de cuerpo de la tabla

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
  const titulos = [ 'ID', 'Nombre', 'Empresa','Dirección','Acciones' ];
  
  //* Generar columnas
  if (data.length >0) {
    data.map((row) => content.push(
      <tr key={row.id} id={`fil-${row.id}`}>
        <td>{row.id} </td>
        <td>{row.nombre}</td>
        <td>{row.empresaRut} - {row.empresa.razonSocial}</td>
        <td>{row.direccion.calle}, {row.direccion.ciudad}</td>
        <td> 
          <Link
            to={`/tiendas/${row.id}/edit`} 
            className='btn btn-xs btn-outline-warning btn-block'
          >
            <i className='fa-solid fa-file-pen' />
          </Link>
          <button
            className='btn btn-xs btn-outline-danger btn-block' 
            onClick={()=>{
              dispatch(deleteTiendaAction({ id: row.id }));
            }}
          >
            <i className='fa-solid fa-trash-can' /> 
          </button>
        </td>
      </tr>
    ));
  }else content.push(<tr>Sin datos</tr>);
  
  return  <DataTable key='tab_usuarios' encabezado={titulos} data={content} opciones={options}  /> ;
}

export default TiendaTable;
