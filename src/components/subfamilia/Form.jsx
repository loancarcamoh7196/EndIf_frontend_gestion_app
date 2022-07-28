import React, { Fragment } from 'react';
import { subfamily } from '../../utils/texts/modGestion';
import { universal, toastOptions } from '../../utils/texts/general';


export default function FormSubFamilia({ handleSubmit, handleChange }) {
  

  return (
    <Fragment>
      <form id='formulario' onSubmit={handleSubmit} >
        <div className='form-group'>
          <label>{subfamily.lbl.empresa}</label>
          <select
            name='empresaRut' 
            className='form-control select2'
            onChange={handleChange}
            required
          >
            <option disabled='disabled' selected='selected' value=''>{universal.slct.empresa} </option>
            {(empresas.length > 0) && empresas.map((i) => <option value={i.rut} selected={i.rut === form.empresaRut && 'selected'}>[{i.rut}] - {i.razonSocial}</option>)}
          </select>  
        </div>
      </form>
    </Fragment>
  )
}
