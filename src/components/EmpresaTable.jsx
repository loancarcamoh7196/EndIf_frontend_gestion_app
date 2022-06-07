import React, { Fragment, Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '@containers/DataTable';



const EmpresaTable = ({data}) => {
  const head = [
    { data: 'RUT' },
    { data: 'Razon Social' },
    { data: 'Giro' },
    { data: 'Fono' },
    { data: 'Email' },
    { data: 'Direccion' },
    { data: 'Acción' },
    { data: 'Activa'},
    { data: 'Mod Gestion'},
    { data: 'Mod Contabilidad'},
    { data: 'Mod Inventario'},
    { data: 'Mod Inventario Movil'},
    // { data: 'direccionId'},
    
  ];
  let content = [];
  let encabezado = [];

  data.map((result) => {
    content.push(
      <tr>
        <td>{result.rut} </td>
        <td>{result.razonSocial}</td>
        <td>{result.giro}</td>
        <td>{result.fono}</td>    
        <td>{result.email}</td>
        <td>
          {`${result.direccion.calle} , ${result.direccion.ciudad}`}
        </td>
        <td> 
            <Link to={`/admin/empresas/${result.rut}/edit`} className='btn btn-xs btn-warning' data-toggle='modal' data-target='#modal-primary'> <i className='fa-solid fa-file-pen' />  </Link>
          <button className='btn btn-xs btn-danger'> <i className='fa-solid fa-trash-can' /> </button>
        </td>
        <td>{result.activa ? <i className='fa-solid fa-check' /> : <i className='fa-solid fa-check' />}</td>
        <td>{result.moduloGestion ? <i className='fa-solid fa-check' /> : <i className='fa-solid fa-check' />}</td>
        <td>{result.moduloContabilidad ? <i className='fa-solid fa-check' /> : <i className='fa-solid fa-check' />}</td>
        <td>{result.moduloInventario ? <i className='fa-solid fa-check' /> : <i className='fa-solid fa-check' />}</td>
        <td>{result.moduloInventarioMovil ? <i className='fa-solid fa-check' /> : <i className='fa-solid fa-check' />}</td>
        
      </tr>
    )
  });

  head.map((i) => {
    encabezado.push(<th>{i.data }</th>);
  })
  
  return  <DataTable encabezado={encabezado} data={content}  /> ;
}

export default EmpresaTable;
