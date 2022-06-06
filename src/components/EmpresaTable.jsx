import React, { Fragment, Component, useEffect } from 'react';
import DataTable from '@containers/DataTable';



const EmpresaTable = ({data}) => {
  const head = [
    { data: 'RUT' },
    { data: 'Razon Social' },
    { data: 'Giro' },
    { data: 'Fono' },
    { data: 'Email' },
    { data: 'Direccion' },
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
        <td>{`${result.direccion.calle} , ${result.direccion.ciudad}`}</td>
        <td>{result.activa ? <i class="fa-solid fa-check" /> : <i class="fa-solid fa-check" />}</td>
        <td>{result.moduloGestion ? <i class="fa-solid fa-check" /> : <i class="fa-solid fa-check" />}</td>
        <td>{result.moduloContabilidad ? <i class="fa-solid fa-check" /> : <i class="fa-solid fa-check" />}</td>
        <td>{result.moduloInventario ? <i class="fa-solid fa-check" /> : <i class="fa-solid fa-check" />}</td>
        <td>{result.moduloInventarioMovil ? <i class="fa-solid fa-check" /> : <i class="fa-solid fa-check" />}</td>
        
      </tr>
    )
  });

  head.map((i) => {
    encabezado.push(<th>{i.data }</th>);
  })
  
  return  <DataTable encabezado={encabezado} data={content}  /> ;
}

export default EmpresaTable;
