import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//* Redux
import { getEmpresasAction } from '../redux/empresasDuck';
//* Texto
import { universal } from '@utils/texts/general'




const handleSelect = () => {

}

export default function EmpresaSelect() {
  const dispatch = useDispatch();
  const empresas = useSelector(store => store.empresas.list);

  const [ empresaSession, setEmpresaSession ] = useState(0);

  useEffect(() => {
    dispatch(getEmpresasAction());
  }, [])
  

  return (
    <Fragment>
      <select 
        className='custom-select select2'
        onChange={handleSelect}
        required
      >
        <option>{universal.slct.empresa}</option>
        {empresas.map( (e) => <option value={e.id}>{e.razonSocial}</option>)}
      </select>
    </Fragment>
  )
}
