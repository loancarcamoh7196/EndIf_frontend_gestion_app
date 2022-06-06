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
import '../../node_modules/datatables.net-scroller-bs4/css/scroller.bootstrap4.min.css';
import '../../node_modules/datatables.net-searchpanes-bs4/js/searchPanes.bootstrap4';
import '../../node_modules/datatables.net-searchbuilder-bs4/js/searchBuilder.bootstrap4';
import '../../node_modules/datatables.net-staterestore-bs4/js/stateRestore.bootstrap4';
import '../../node_modules/datatables.net-staterestore-bs4/css/stateRestore.bootstrap4.min.css';
import '../../node_modules/datatables.net-fixedcolumns-bs4/js/fixedColumns.bootstrap4';
import '../../node_modules/datatables.net-select-bs4/js/select.bootstrap4';
import '../../node_modules/datatables.net-select-bs4/css/select.bootstrap4.min.css'
import '../../node_modules/datatables.net-datetime/js/dataTables.dateTime';

  // 'datatables.net-datetime'
  // 'datatables.net-fixedcolumns-bs4'
  // 'datatables.net-fixedheader-bs4'
  

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
      destroy: true,
      paging: true,
      lengthChange: true,
      // searching: true,
      ordering: true,
      // info: true,
      autoWidth: true,
      responsive: true,
      stateSave: true,
      bDestroy: true,
      // processing: true,
      serverSide: false
    })
  }, [100])


  return (
    <div className='dataTables_wrapper dt-bootstrap4'>
      <div className='col-sm-12'>
        <table id='table' className='table table-hover table-bordered dataTable dtr-inline'>
          
            <thead>
              <tr>
                { encabezado.map((i) => i)}
              </tr>
            </thead>
          
          <tbody>
            { data.map((result) => result)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
