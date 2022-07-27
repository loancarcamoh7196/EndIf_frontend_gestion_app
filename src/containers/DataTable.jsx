import React, { Fragment, useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-bs4'
import 'datatables.net-responsive-bs4';
import 'datatables.net-fixedheader-bs4';
import 'datatables.net-staterestore-bs4';
import 'datatables.net-fixedcolumns-bs4';
import 'datatables.net-rowgroup-bs4';
import 'datatables.net-scroller-bs4';
import 'datatables.net-fixedheader-bs4';
// import * as jszip from 'jszip';
import 'pdfmake';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
const jzip = require('jzip');

pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jzip;

const DataTable = ({ id='table', data, encabezado, opciones, styleHeadDark=true, title='EndIf'}) => {
  const buttons = ['copy', 'csv', 'excel', 'pdf', 'print'];

  useEffect(() => {
    // $(`#${id}`).DataTable({loading: false});
    setTimeout(() => {
      $(`#${id}`).DataTable().destroy();
      $(`#${id}`).DataTable({
        language: {
          'thousands': '.',
          'decimal': ',',
          'emptyTable': 'No hay información',
          'info': 'Mostrando _START_ a _END_ de _TOTAL_ Entradas',
          'infoEmpty': 'Mostrando 0 to 0 of 0 Entradas',
          'infoFiltered': '(Filtrado de _MAX_ total entradas)',
          'infoPostFix': '',
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
          },
          'buttons': { copy: 'Copiar', csv: 'CSV', excel: 'Excel', pdf: 'PDF', 'print': 'Imprimir'}
        },
        loading: opciones.loading,
        destroy: opciones.destroy,
        paging: opciones.paging,  
        lengthChange: opciones.lengthChange,  
        searching: opciones.searching,
        ordering: opciones.ordering,
        info: opciones.info,
        autoWidth: opciones.true,
        responsive: opciones.responsive,
        stateSave: opciones.stateSave,
        bDestroy: opciones.bDestroy,
        processing: opciones.processing,
        serverSide: opciones.serverSide,
        fixedHeader: opciones.fixedHeader,
        dom: 'Bfrtip',
        buttons: buttons,
        lengthMenu: [
          [ 10, 25, 50, -1 ],
          [ '10 registros', '25 registros', '50 registros', 'Mostrar todos' ]
        ],
      })
    }, 3000);
  }, [data]);

  return (
    <div className='table-responsive'>
      <table id={id} className='table  table-hover table-bordered'>
        <thead className={styleHeadDark && 'thead-dark'}>
          <tr>
            { encabezado.map((i) => i) }
          </tr>
        </thead>
        <tbody>
          { data.map((result) => result) }
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
