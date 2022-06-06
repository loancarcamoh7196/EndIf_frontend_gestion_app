import React, { Fragment, Component } from 'react';
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


class ListComponent extends Component {
  // State array variable to save and show data
  constructor(props) {
    super(props)
      this.state = { data: [], }
  }
  componentDidMount() {
    //Get all users details in bootstrap table
    // axios.get('http://localhost/getList.php').then(res => 
    // {
    //   //Storing users detail in state array object
    //   this.setState({data: res.data});
    // }); 
    this.setState({data: [{ id:1, email:'prueba@prueba.cl', username: 'prueba'}]});
    
    //initialize datatable
    $(document).ready(function () {
      setTimeout(function(){
        $('#example').DataTable({
          paging: true,
          'lengthChange': false,
          'searching': false,
          'ordering': true,
          'info': true,
          'autoWidth': false,
          'responsive': true,
          'bDestroy': true
        });
      } ,1000);
    });
  }

  render(){
    //Datatable HTML
    return (
      <div className='MainDiv'>
        <div className='container'>
          <table id='example' class='table table-hover table-bordered'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Username</th>
              </tr>
            </thead>
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

export default ListComponent;
