import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';
import '../../node_modules/select2/dist/js/select2.full';

import { getRegionesAction } from '@redux/regionesDuck';

const txt = {
  selectRegion: 'Region',
  selectComuna: 'Comuna',
  lblCiudad: 'Ciudad',
  lblCalle: 'Calle '
  
}

const RegionSelect = ({ selected, onChange }) => {
  const dispatch = useDispatch();

  const regiones = useSelector((store)=> store.regiones.res);

  useEffect(() => {
    dispatch(getRegionesAction());
    $('#select2').select2();
    $('#selectComuna').select2();
  }, []);


  const handleSelectComuna= (e)=> {
    const target = e.target;
		const value = target.value;
		const name = target.name;

    console.log(value);
  }


  return (
    <Fragment>
      <div className='form-group'>
        <label>{txt.selectRegion}</label>
        <select id='select2' className='form-control select2' onClick={handleSelectComuna} onChange={onChange}>
          <option value={0} disabled='disabled' selected='selected'> Seleccione Región </option>
          { regiones.map((i) =>  <option defaultValue={i.id}>{i.nombre}</option>) }
        </select>
      </div>

      <div className='form-group' >
        <label>{txt.selectComuna}</label>
        <select id='selectComuna' className='form-control select2' >
          <option value={0} disabled='disabled' selected='selected'> Seleccione Comuna </option>
        </select>
      </div>

      <div className='form-group'>
        <label>{txt.lblCalle}</label>
        <input type='text' className='form-control form-control-border' id='calle' placeholder='Calle Ocho 585, of 207' onChange={onChange} />
      </div>

      <div className='form-group'>
        <label>{txt.lblCiudad}</label>
        <input type='text' className='form-control form-control-border' id='ciudad' placeholder='Santiago' onChange={onChange} />
      </div>
    </Fragment> 
  )
}

export default RegionSelect;