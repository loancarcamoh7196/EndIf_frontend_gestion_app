/**
 ** Componente base de DataTable
 */
import React, { useRef, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteEmpresaAction } from '@redux/empresasDuck';

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
import 'datatables.net-fixedheader-bs4';
import 'datatables.net-staterestore-bs4';
import 'datatables.net-fixedcolumns-bs4';
import 'datatables.net-rowgroup-bs4';
import 'datatables.net-scroller-bs4';
import 'datatables.net-fixedheader-bs4';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
const jzip = require('jzip');



pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jzip;

class ListComponent extends Component {
  // State array variable to save and show data
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    $(document).ready(function () {
      // setTimeout(function(){
        $('#example').DataTable({

        });
      // } ,1000);
    });
  }

  render(){
    //Datatable HTML
    return (
    <div className="MainDiv">
      
      <div className="table-responsive">
          
          <table id="example" class="table table-hover table-bordered">
          <thead>
            <tr>
              {this.props.titles.map( row => <th>{row.title}</th> )}
              {/* <th>ID</th>
              <th>Email</th>
              <th>Username</th> */}
            </tr>
          </thead>
          <tbody>
          {this.props.data.map((e) => 
            <tr>
              <td>{e.rut}</td>
              <td>{e.razonSocial}</td>
              <td>{e.giro}</td>
              <td>{e.fono}</td>
              <td>{e.email}</td>
              <td>{e.direccion.calle}</td>
              <td>
                <Link to={`/admin/empresas/${e.rut}/edit`} className='btn btn-xs btn-outline-warning btn-block'>
                  <i className='fa-solid fa-file-pen'/>
                </Link>
                <button className='btn btn-xs btn-outline-danger btn-block' onClick={()=>{
                    dispatch(deleteEmpresaAction({ rut: e.rut }));
                }}>
                  <i className='fa-solid fa-trash-can' /> 
                </button>
              </td>
            </tr>
          
            
          )}

          </tbody>
        </table>
          
        </div>
      </div>
    );
  }
}
export default ListComponent;