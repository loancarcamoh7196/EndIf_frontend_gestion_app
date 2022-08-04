/**
 * * Componente OffSet
 */
import React, { Fragment } from 'react';


export default function OffCanvas({
  key, id='offcanvasRight', title='Canvas', children
}) {
  return (
    <Fragment>
      <div id={id} className='offcanvas offcanvas-end' tabindex='-1'>
        <div className='offcanvas-header'>
          <h5 id='{id}Label'>{title}</h5>
          <button type='button' className='btn-close text-reset' data-bs-dismiss='offcanvas' aria-label='Cerrar'/>
        </div>
        <div className='offcanvas-body'>
          {children}
        </div>
      </div> 
    </Fragment>
  )
}
