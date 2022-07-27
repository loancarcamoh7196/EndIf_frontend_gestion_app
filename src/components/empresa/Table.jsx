/**
 ** Componente Empresa Table
 *? componente alojado en /admin/empresas 
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';

import { deleteEmpresaAction } from '@redux/empresasDuck';

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

  const head = [
    { row: 'RUT' },
    { row: 'Razon Social' },
    { row: 'Giro' },
    { row: 'Fono' },
    { row: 'Email' },
    { row: 'Direccion' },
    { row: 'Acción' },
    { row: 'Activa'},
    { row: 'Mod Gestion'},
    { row: 'Mod Contabilidad'},
    { row: 'Mod Inventario'},
    { row: 'Mod Inventario Movil'},
  ];
  
  // rellenar cuerpo de Tabla
  data.map((result) => {
    content.push(
      <tr key={result.rut} >
        <td>{result.rut} </td>
        <td>{result.razonSocial}</td>
        <td>{result.giro}</td>
        <td>{result.fono}</td>    
        <td>{result.email}</td>
        <td>
          {`${result.direccion.calle} , ${result.direccion.ciudad}`}
        </td>
        <td> 
          <Link to={`/admin/empresas/${result.rut}/edit`} className='btn btn-xs btn-outline-warning btn-block' data-toggle='modal' data-target='#modal-primary'>
            <i className='fa-solid fa-file-pen'/>
          </Link>
          <br  />
          <button className='btn btn-xs btn-outline-danger btn-block' onClick={()=>{
            dispatch(deleteEmpresaAction({ rut: result.rut }));
          }}>
            <i className='fa-solid fa-trash-can' /> 
          </button>
        </td>
        <td>
          {result.activa ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
        </td>
        <td>
          {result.moduloGestion ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger' />}
        </td>
        <td>
          {result.moduloContabilidad ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
        </td>
        <td>
          {result.moduloInventario ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
        </td>
        <td>
          {result.moduloInventarioMovil ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
        </td>
      </tr>
    )
  });

  // Llenar encabezado de Tabla
  head.map((i) => encabezado.push(<th>{i.row}</th>) );
  
  return  <DataTable id='tab_empresas' key='tab_empresas' encabezado={encabezado} data={content} opciones={options}  /> ;
}

export default EmpresaTable;
