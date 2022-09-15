/**
 ** Componente Caja Table
 *? alojado en: /cajas 
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// ? Contenedor DataTable
import DataTable from '@containers/DataTable';
//? Redux
import { deleteCajaAction} from '@redux/cajasDuck';

const CajasTable = ({data}) => {
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
    'ID', 'Nombre', 'Numero Caja', 'Caja Puerto', 'Es parte Fabrica', 'Activo', 'Sincroniza', 'Tienda','Acciones'
  ];
  
  //* Generar columnas de Tabla
  data.map((row) => content.push(
    <tr key={row.cajaId} id={`fil-${row.cajaId}`}>
      <td>{row.cajaId} </td>
      <td>{row.cajaNombre}</td>
      <td>{row.cajaPuerto}</td>
      <td>
        {row.cajaServ ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger' />}
      </td>
      <td>
        {row.cajaEsFabrica ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.cajaActiva ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.cajaSincroniza ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.tiendaNombre} {row.direcccionCalle}, {row.direccionCiudad}
      </td>
      <td> 
        <Link
          to={`/cajas/${row.cajaId}/edit`} 
          className='btn btn-xs btn-outline-warning btn-block'
        >
          <i className='fa-solid fa-file-pen' />
        </Link>
        <button
        type='button'
          className='btn btn-xs btn-outline-danger btn-block'
          onClick={()=>{
            dispatch(deleteCajaAction({ id: row.cajaId }));
          }}
        >
          <i className='fa-solid fa-trash-can' /> 
        </button>
      </td>
    </tr>
  ));

  return (
    <DataTable
      key='tab_cajas'
      encabezado={titulos}
      data={content}
      opciones={options}
    />
  );
}

export default CajasTable;
