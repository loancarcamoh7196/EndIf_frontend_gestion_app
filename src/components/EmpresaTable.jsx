import React, { Fragment, Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import DataTable from '@containers/DataTable';

import { deleteEmpresaAction } from '@redux/empresasDuck';

const EmpresaTable = ({data}) => {
  const dispatch = useDispatch();

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
      <tr key={result.rut} id={`fil-${result.rut}`}>
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
            <i className='fa-solid fa-file-pen' />
          </Link>
          <br  />
          <button className='btn btn-xs btn-outline-danger btn-block' onClick={()=>{
            dispatch(deleteEmpresaAction({ rut: result.rut }));
          }}>
            <i className='fa-solid fa-trash-can' /> 
          </button>
        </td>
        <td>
          {result.activa ? <i className='fa-solid fa-check' /> : <i className='fa-solid fa-xmark' />}
        </td>
        <td>
          {result.moduloGestion ? <i className='fa-solid fa-check' /> : <i className='fa-solid fa-xmark' />}
        </td>
        <td>
          {result.moduloContabilidad ? <i className='fa-solid fa-check' /> : <i className='fa-solid fa-xmark' />}
        </td>
        <td>
          {result.moduloInventario ? <i className='fa-solid fa-check' /> : <i className='fa-solid fa-xmark' />}
        </td>
        <td>
          {result.moduloInventarioMovil ? <i className='fa-solid fa-check' /> : <i className='fa-solid fa-xmark btn-outline-danger' />}
        </td>
      </tr>
    )
  });

  head.map((i) =>  encabezado.push(<th>{i.data }</th>) );
  
  return  <DataTable key='tab_empresas' encabezado={encabezado} data={content}  /> ;
}

export default EmpresaTable;
