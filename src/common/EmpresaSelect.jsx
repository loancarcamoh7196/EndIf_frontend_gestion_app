/**
 * * Componente para Admin - Selector General  de Empresas
 */
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//* Redux
import { getEmpresasAction } from '@redux/empresasDuck';
import { setEmpresaSessionAction } from '@redux/userAuthDuck';
//* Texto
import { universal } from '@utils/texts/general'
//*CSS
import '@styles/EmpresaSelect.scss';

export default function EmpresaSelect() {
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    const target = e.target;
    const { name, value } = target;
    // console.log(value);
    dispatch(setEmpresaSessionAction({empresaRut: value}));
  }

  useEffect(() => { dispatch(getEmpresasAction()) }, []);
  let empresas = useSelector(store => store.empresas.list);
  const empresaSession = useSelector(store => store.auth.empresaSession);
  
  return (
    <Fragment>
      <select 
        name='empresaSession'
        className='custom-select empresa--select'
        onChange={handleSelect}
        required
      >
        <option >{universal.slct.empresa}</option>
        {empresas.map(e => <option key={e.rut} value={e.rut} selected={ (e.rut == empresaSession) && 'selected'}>{e.razonSocial}</option>)}
      </select>
    </Fragment>
  )
}
