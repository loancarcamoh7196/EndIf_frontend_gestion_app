/**
 ** Componente Empresa Table
 *? componente alojado en /admin/empresas 
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';
//? Redux
import { deleteEmpresaAction } from '@redux/empresasDuck';

const EmpresaTable = ({data}) => {
  const dispatch = useDispatch();
  let content = []; // Contenedor de cuerpo de la tabla
  //* Opciones de la DataTable
  const options = {
    responsive: true,
    loading: true,
    destroy: true,
    paging: true,
    lengthChange: false,
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
  const titles = [
    'RUT','Razon Social','Giro','Fono','Email','Direccion','Acción','Activa','Mod Gestion','Mod Contabilidad','Mod Inventario','Mod Inventario Movil'
  ];
  
  //* Generar columnas
  data.map((row) => content.push(
    <tr key={row.rut} >
      <td>{row.rut} </td>
      <td>{row.razonSocial}</td>
      <td>{row.giro}</td>
      <td>{row.fono}</td>    
      <td>{row.email}</td>
      <td>
        {`${row.direccion.calle}, ${row.direccion.ciudad}`}
      </td>
      <td> 
        <Link to={`/admin/empresas/${row.rut}/edit`} className='btn btn-xs btn-outline-warning btn-block' data-toggle='modal' data-target='#modal-primary'>
          <i className='fa-solid fa-file-pen'/>
        </Link>
        <br  />
        <button className='btn btn-xs btn-outline-danger btn-block' onClick={()=>{
          dispatch(deleteEmpresaAction({ rut: row.rut }));
        }}>
          <i className='fa-solid fa-trash-can' /> 
        </button>
      </td>
      <td>
        {row.activa ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.moduloGestion ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger' />}
      </td>
      <td>
        {row.moduloContabilidad ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.moduloInventario ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.moduloInventarioMovil ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
    </tr>
  ));
  
  return  <DataTable key='tab_empresas' encabezado={titles} data={content} opciones={options}  /> ;
}

export default EmpresaTable;
