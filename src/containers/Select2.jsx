import React, { useEffect } from 'react'
import $ from 'jquery';
import 'select2/dist/js/select2.full';


const Select = ({ data, txtDefault='Seleccione', id='select2', name, handleChange }) => {
  useEffect(() => {
    // dispatch(getRegionesAction());
    $(`#${id}`).select2();
    // $('#selectComuna').select2();
  }, []);

  return (
    <select id={id} name={name} className='form-control select2' onChange={handleChange}>
      <option disabled='disabled' selected='selected'> {txtDefault} </option>
      { data.map((i) =>  <option value={i.id}>{i.nombre}</option>) }
    </select>
  )
}

export default Select;
