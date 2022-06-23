import React, { Component } from 'react';
import $ from 'jquery'
import dt from 'datatables.net'
$.DataTable = dt;

class EmpTable extends Component {
  componentDidMount() {
    this.$el = $(this.el)
    this.$el.DataTable = dt
    this.$el.DataTable({
      data: this.props.data,
        columns: [
          { data: 'RUT' },
          { data: 'Razon Social' },
          { data: 'Giro' },
          { data: 'Fono' },
          { data: 'Email' },
          { data: 'Direccion' },
          { data: 'Acción' },
          { data: 'Activa'},
          { data: 'Mod Gestion'},
          { data: 'Mod Contabilidad'},
          { data: 'Mod Inventario'},
          { data: 'Mod Inventario Movil'}
        ]
      }
    )
  }


  componentWillUnmount() {
    this.$el.DataTable.destroy(true)
  }

  render(){
    return ( 
      <table id='table' className='table table-responsive-xl table-hover table-bordered'>
        <thead className='thead-dark'>
        </thead>
        <tbody>
        </tbody>
      </table>
    );
  }
}

export default EmpTable;