import React, { Fragment, Component } from 'react';
import $ from 'jquery';
//DataTables modules
import 'datatables.net-bs4';
import 'datatables.net-responsive-bs4';
import 'datatables.net-fixedheader-bs4';
import 'datatables.net-staterestore-bs4';
import 'datatables.net-fixedcolumns-bs4';
import 'datatables.net-rowgroup-bs4';
import 'datatables.net-scroller-bs4';
import 'datatables.net-fixedheader-bs4';
import 'pdfmake';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
const jzip = require('jzip');

pdfMake.vfs =  pdfFonts.pdfMake.vfs;
window.JSZip = jzip;

export default function Table(props) {
  // State array variable to save and show data
  this.state = { data: [], };
  
  useEffect(() => {

    this.setState({data: props.data});

    //initialize datatable
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
    });
  }, [1000]);

  encabezado(props.thead){
    if (data !== undefined) {
      return (
        <thead>
          <tr>
            {data.map( i => {
              <th>{i.nombre }</th>
            })}
          </tr>
        </thead>
      );
    }else {
      return <thead> <tr> <th>ID</th><th>Email</th><th>Username</th> </tr> </thead>;
    }
  }

  render(){
    //Datatable HTML
    return (
      <div className='MainDiv'>
        <div className='container'>
          <table id='table' class='table table-hover table-bordered'>
            {this.encabezado()}
            <tbody>
              {this.state.data.map((result) => {
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
}

// export default Table;
