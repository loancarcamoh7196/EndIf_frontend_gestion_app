/**
 ** Componente Oferta Table
 *? alojado en: /ofertas
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';
//?Texto
import { offer } from '@utils/texts/modGestion';
//? Redux
import { deleteOfertaAction, showFormAction } from '@redux/ofertasDuck';

const OfertaTable = ({data, setFormShow}) => {
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
  const titulos = [ 'ID', 'Descripcion', 'Precio', 'Activa','Acciones' ];
  
  //* Generar columnas de Tabla
  data.map((row) => content.push(
    <tr key={row.id} id={`fil-${row.id}`}>
      <td>{row.id} </td>
      <td>{row.descripcion}</td>
      <td>{row.precio}</td>
      <td>
        {row.activa ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger' />}
      </td>
      <td> 
        <button
          className='btn btn-xs btn-outline-warning'
          title={offer.txt.del}
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
          className='btn btn-xs btn-outline-danger'
          title={offer.txt.delete}
          onClick={()=>{ dispatch(deleteOfertaAction({ id: row.id })) }}
        >
          <i className='fa-solid fa-trash-can' /> 
        </button>

        <Link
          to={`/ofertas/${row.id}/detalle`}
          className='btn btn-xs btn-outline-info'
          title={offer.txt.list}
        >
          <i class="fa-light fa-memo-circle-info"></i>
        </Link>
      </td>
    </tr>
  ));


  return (
  <DataTable
    key='tab_oferta'
    encabezado={titulos}
    data={content}
    opciones={options}
  />);
}

export default OfertaTable;
