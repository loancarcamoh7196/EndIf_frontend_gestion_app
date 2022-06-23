import React, { Fragment, Component, useEffect } from 'react';
// import '../../node_modules/jquery/dist/jquery.min.js'
//Datatable Modules
// import '../../node_modules/datatables.net/js/jquery.dataTables';
import 'datatables.net-bs4'
import 'datatables.net-responsive-bs4';
import 'datatables.net-fixedheader-bs4';
import 'datatables.net-buttons-bs4';
import 'datatables.net-staterestore-bs4';
import 'datatables.net-fixedcolumns-bs4';

// import '../../node_modules/datatables.net-select-bs4/js/select.bootstrap4';
// import '../../node_modules/datatables.net-autofill-bs4/js/autoFill.bootstrap4';
import '../../node_modules/datatables.net-rowgroup-bs4/js/rowGroup.bootstrap4';
import '../../node_modules/datatables.net-rowreorder-bs4/js/rowReorder.bootstrap4';
import '../../node_modules/datatables.net-scroller-bs4/js/scroller.bootstrap4';
// import '../../node_modules/datatables.net-scroller-bs4/css/scroller.bootstrap4.min.css';
import '../../node_modules/datatables.net-searchpanes-bs4/js/searchPanes.bootstrap4';
import '../../node_modules/datatables.net-searchbuilder-bs4/js/searchBuilder.bootstrap4';
// import '../../node_modules/datatables.net-staterestore-bs4/js/stateRestore.bootstrap4';
// import '../../node_modules/datatables.net-staterestore-bs4/css/stateRestore.bootstrap4.min.css';
import '../../node_modules/datatables.net-fixedcolumns-bs4/js/fixedColumns.bootstrap4';
import '../../node_modules/datatables.net-select-bs4/js/select.bootstrap4';
// import '../../node_modules/datatables.net-select-bs4/css/select.bootstrap4.min.css'
import '../../node_modules/datatables.net-datetime/js/dataTables.dateTime';
// import '../../node_modules//js/fixedHeader.bootstrap4'

  // 'datatables.net-datetime'
  // 'datatables.net-fixedcolumns-bs4'

import $ from 'jquery';

const DataTable = ({id, data, encabezado, opciones}) => {
  useEffect(() => {
    $('#table').DataTable().destroy();
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
      loading: true,
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
      processing: true,
      serverSide: false,
      fixedHeader: true
    })
  }, [10]);

  return (
    <table id='table' className='table table-responsive-xl table-hover table-bordered'>
      <thead className='thead-dark'>
        <tr>
          { encabezado.map((i) => i)}
        </tr>
      </thead>
      <tbody>
        { data.map((result) => result)}
      </tbody>
    </table>
      
  );
}

export default DataTable;
