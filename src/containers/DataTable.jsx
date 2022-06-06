import React, { Fragment, Component, useEffect } from 'react';
import '../../node_modules/jquery/dist/jquery.min.js'
//Datatable Modules
import '../../node_modules/datatables.net/js/jquery.dataTables';
import '../../node_modules/datatables.net-responsive-bs4/js/responsive.bootstrap4';
import '../../node_modules/datatables.net-select-bs4/js/select.bootstrap4';
import '../../node_modules/datatables.net-autofill-bs4/js/autoFill.bootstrap4';
import '../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4';
import '../../node_modules/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';
import '../../node_modules/datatables.net-rowgroup-bs4/js/rowGroup.bootstrap4';
import '../../node_modules/datatables.net-rowreorder-bs4/js/rowReorder.bootstrap4';
import '../../node_modules/datatables.net-scroller-bs4/js/scroller.bootstrap4';

  // 'datatables.net-datetime'
  // 'datatables.net-fixedcolumns-bs4'
  // 'datatables.net-fixedheader-bs4'
  // 'datatables.net-searchbuilder-bs4'
  // 'datatables.net-searchpanes-bs4'
  // 'datatables.net-select-bs4',
  // 'datatables.net-staterestore-bs4' 

import $ from 'jquery';


const DataTable = ({data, encabezado}) => {

  useEffect(() => {
    $('#table').DataTable({
      language: {
        'decimal': '',
        'emptyTable': 'No hay información',
        'info': 'Mostrando _START_ a _END_ de _TOTAL_ Entradas',
        'infoEmpty': 'Mostrando 0 to 0 of 0 Entradas',
        'infoFiltered': '(Filtrado de _MAX_ total entradas)',
        'infoPostFix': '',
        'thousands': ',',
        'lengthMenu': 'Mostrar _MENU_ Entradas',
        'loadingRecords': 'Cargando...',
        'processing': 'Procesando...',
        'search': 'Buscar:',
        'zeroRecords': 'Sin resultados encontrados',
        'paginate': {
            'first': 'Primero',
            'last': 'Ultimo',
            'next': 'Siguiente',
            'previous': 'Anterior'
        }
      },
      paging: true,
      'lengthChange': false,
      'searching': false,
      'ordering': true,
      'info': true,
      'autoWidth': false,
      'responsive': true,
      'bDestroy': true
    })
  }, [])


  return (
    <div className='MainDiv'>
      <div className='container'>
        <table id='table' class='table table-hover table-bordered'>
          { (encabezado != undefined) ? 
            <thead>
              <tr>
                { encabezado.map((i) => {
                  return <th>{i.nombre }</th>
                })}
              </tr>
            </thead>
          : <thead> <tr> <th>ID</th><th>Email</th><th>Username</th> </tr> </thead>
          }
          <tbody>
            { data.map((result) => {
              return (
                  <tr>
                    <td>{result.id}</td>
                    <td>{result.email}</td>
                    <td>{result.username}</td>
                  </tr>
                
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
