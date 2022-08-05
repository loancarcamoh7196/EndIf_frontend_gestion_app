/**
 * * Componente base de DataTables
 */
import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-responsive-bs4';
import 'datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';
import 'datatables.net-fixedheader-bs4';
import 'datatables.net-staterestore-bs4';
import 'datatables.net-fixedcolumns-bs4';
import 'datatables.net-rowgroup-bs4';
import 'datatables.net-scroller-bs4';
import 'datatables.net-fixedheader-bs4';
// import 'pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
const jzip = require('jzip');

pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jzip;

const DataTable = ({ key='table', data, encabezado, opciones, styleHeadDark=true, title='EndIf'}) => {
  const buttons = [
    {
      extend:'copy',
      className: 'btn btn-secundary',
      text: '<i class="fa-solid fa-copy"></i>',
      titleAttr: 'Copiar Tabla',
    },
    {
      extend: 'csvHtml5',
      className: 'btn btn-info',
      text: '<i class="fa-solid fa-file-csv"></i>',
      titleAttr: 'Exportar a CSV',
    },
    {
      extend: 'excelHtml5',
      className: 'btn btn-success',
      text: '<i class="fas fa-file-excel"></i> ',
      title: '',
      filename: 'Cuadratura',
      footer: true,
      titleAttr: 'Exportar a Excel',
    },
    {
      extend: 'pdfHtml5',
      orientation:'landscape',
      pageSize: 'legal',
      alignment: 'center',
      className: 'btn btn-danger',
      text: '<i class="fas fa-file-pdf"></i> ',
      title: '',
      filename: 'Cuadratura',
      footer: true,
      titleAttr: 'Exportar a PDF',
    },
    {
      extend: 'print',
      className: 'btn btn-info',
      text:'<i class="fa-solid fa-print"></i>',
      titleAttr: 'Imprimir',
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      $(`#${key}`).DataTable().destroy();
      $(`#${key}`).DataTable({
        language: {
          'thousands': '.',
          'decimal': ',',
          'emptyTable': 'No hay información',
          'info': 'Mostrando _START_ a _END_ de _TOTAL_ Registros',
          'infoEmpty': 'Mostrando 0 to 0 of 0 Entradas',
          'infoFiltered': '(Filtrado de _MAX_ total registros)',
          'infoPostFix': '',
          'lengthMenu': 'Mostrar _MENU_ Registros',
          'loadingRecords': 'Cargando...',
          'processing': 'Procesando...',
          'search': 'Buscar:',
          'zeroRecords': 'Sin resultados encontrados',
          'paginate': {
            'first': '<|',
            'last': '|>',
            'next': '>',
            'previous': '<'
          },
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
        // stateSave: opciones.stateSave,
        bDestroy: opciones.bDestroy,
        processing: opciones.processing,
        serverSide: opciones.serverSide,
        fixedHeader: opciones.fixedHeader,
        dom: 'Bfrtip',
        buttons: buttons,
      })
    }, 1000);
  }, [data]);

  return (
    <div className='table-responsive'>
      <table id={key} className='table  table-hover table-bordered'>
        <thead className={styleHeadDark && 'thead-dark'}>
          <tr>
            { encabezado.map((i) => <th>{i}</th>) }
          </tr>
        </thead>
        <tbody>
          { data.map((row) => row) }
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
