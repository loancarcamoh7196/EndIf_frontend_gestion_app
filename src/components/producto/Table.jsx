/**
 ** Componente Producto Table
 * ? Alojada en  /producto
 */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';
//? Redux
import { deleteProductoAction } from '@redux/productosDuck';

const ProductoTable = ({data}) => {
  const dispatch = useDispatch();
  let content = []; // Contenedor de cuerpo de la tabla
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

  const titulos = [ 
    'ID', 'Nombre', 'Código Interno','Activo', 'Exento', 'Inventario', 'Comanda', 'Es Ingrediente', 'Tiene Envase', 'Acciones' 
  ];
  
  //* Generar columnas de Tabla
  data.map((row) => content.push(
    <tr key={row.id} id={`fil-${row.id}`}>
      <td>{row.id} </td>
      <td>{row.nombre}</td>
      <td>{row.codigoInterno}</td>
      <td>
        {row.activo ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger' />}
      </td>
      <td>
        {row.exento ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.esInventario ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.comanda ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.esIngrediente ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td>
        {row.tieneEnvase ? <i className='fa-solid fa-check text-success'/> : <i className='fa-solid fa-xmark text-danger'/>}
      </td>
      <td> 
        <Link
          to={`/productos/${row.id}/edit`}
          className='btn btn-xs btn-outline-warning m-1'
          title='Editar Producto'
        >
          <i className='fa-solid fa-file-pen' />
        </Link>

        <Link
          to={`/productos/${row.id}/precios`}
          className='btn btn-xs btn-outline-info m-1'
          title='Ver Precios relaciondos'
        >
          <i className='fa-solid fa-money-check-dollar' />
        </Link>

        <button
          type='button'
          className='btn btn-xs btn-outline-danger m-1'
          onClick={()=>{ dispatch(deleteProductoAction({ id: row.id })) }}
          title='Eliminar Producto'
        >
          <i className='fa-solid fa-trash-can' /> 
        </button>
          
        <Link
          to={`/productos/${row.id}/barras`}
          className='btn btn-xs btn-outline-dark m-1'
          title='Ver códigos de barras relaciondas'
        >
          <i className='fa-solid fa-barcode'></i>
        </Link>
      </td>
    </tr>
  ));
  
  return (
    <DataTable
      key='tab_productos'
      encabezado={titulos}
      data={content}
      opciones={options}
    /> 
  );
}

export default ProductoTable;
