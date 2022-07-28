import React, { Fragment, Component } from 'react';
import $ from 'jquery';
//* DataTables modules
import 'datatables.net-bs4';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-responsive-bs4';
import 'datatables.net-fixedheader-bs4';
import 'datatables.net-staterestore-bs4';
import 'datatables.net-fixedcolumns-bs4';
import 'datatables.net-rowgroup-bs4';
import 'datatables.net-scroller-bs4';
import 'datatables.net-fixedheader-bs4';
import 'pdfmake';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
const jzip = require('jzip');

pdfMake.vfs =  pdfFonts.pdfMake.vfs;
window.JSZip = jzip;


export class Table extends Component {
  render() {
    return (
      <div>Table</div>
    )
  }
}

export default Table
