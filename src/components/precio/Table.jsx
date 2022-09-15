/**
 ** Componente Precios Table
 *? alojado en: /productos/:id/precios 
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';
//? Redux
import { deletePrecioAction } from '@redux/preciosDuck';
import { showFormAction } from '../../redux/preciosDuck';

const PreciosTable = ({data, setFormShow}) => {
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
    'ID', 'Neto', 'IVA', 'Precio Público', 'Es Exento?', 'Es Mayorista?', 'Lista','Acciones'
  ];
  
  //* Generar columnas de Tabla
  data.map((row) => content.push(
    <tr key={row.id} id={`fil-${row.id}`}>
      <td>{row.id} </td>
      <td>{row.neto}</td>
      <td>{row.iva}</td>
      <td>{row.precioPublico}</td>
      <td>
        {row.esExento ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.esMayorista ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.listaPrecio.lista}
      </td>
      <td> 
        <button
          className='btn btn-xs btn-outline-warning m-1'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasRight'
          aria-controls='offcanvasRight'
          onClick={()=>{
            setFormShow({ edit: true, new: false });
            dispatch(showFormAction({ id: row.id }));
          }}
        >
          <i className='fa-solid fa-file-pen' />
        </button>
        <button
          className='btn btn-xs btn-outline-danger m-1'
          onClick={()=>{
            dispatch(deletePrecioAction({ id: row.id }));
          }}
        >
          <i className='fa-solid fa-trash-can' /> 
        </button>
      </td>
    </tr>
  ));

  return (
    <DataTable
      key='tab_precios'
      encabezado={titulos}
      data={content}
      opciones={options}
    />);
}

export default PreciosTable;
