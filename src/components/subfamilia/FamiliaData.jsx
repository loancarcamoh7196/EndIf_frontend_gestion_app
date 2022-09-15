import React, { Fragment } from 'react'
//* Textos
import { family, universal } from '../../utils/texts/modGestion';

export default function FamiliaData({familia}) {
  return (
    <Fragment>
      <div className='col-6 form-group'>
        <label htmlFor='familiaId' className='label'>{ family.lbl.id }</label>
        <span name='familiaId' className='form-input'> {familia.id} </span>
      </div>
      <div className='col-6 form-group'>
        <label htmlFor='familiaNombre'> { family.lbl.nombre }</label>
        <span name='familiaNombre' className='form-input'>{ familia.nombre }</span>
      </div>
    </Fragment>
  )
}
