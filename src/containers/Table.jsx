import React, { Fragment, Component } from 'react';
import $ from 'jquery';
//Datatable Modules
import 'datatables.net-bs4'
import 'datatables.net-responsive-bs4';
import 'datatables.net-fixedheader-bs4';
import 'datatables.net-buttons-bs4';
import 'datatables.net-staterestore-bs4';
import 'datatables.net-fixedcolumns-bs4';
import 'datatables.net-rowgroup-bs4';
import 'datatables.net-scroller-bs4';
import 'datatables.net-fixedheader-bs4';

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
      } ,1000);
    });
  }

  encabezado(data){
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

export default ListComponent;
