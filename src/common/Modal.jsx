/**
 * * Componente básico Modal
 * ? children : Contenido de cuerpo Modal
 * ? haveTitle: Tiene titulo?
 * ? title: Contenido para Titulo
 * ? haveCtrl:  Tiene Control de Cierre?
 * ? haveFooter: Tiene Footer?
 */
import React from 'react';

//? Estilo x defecto: bg-primary
const Modal = ({
  children,
  haveTitle=false,
  haveCtrl=false,
  haveFooter=false,
  style='',
  id='modal',
  title='Titulo Prueba'
}) => {
  return (
    <div className='modal fade' id={id}>
      <div className='modal-dialog'>
        <div className={`modal-content ${style}`} >
          <div className='modal-header'>
            { haveTitle && <h4 className='modal-title'>{title}</h4>}
            {haveCtrl &&
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            }
          </div>
          <div className='modal-body'>
            {children}
          </div>
          {haveFooter &&
            <div className='modal-footer justify-content-between'>
              <button type='button' className='btn btn-outline-light' data-dismiss='modal'>Cerrar</button>
              <button type='button' className='btn btn-outline-light'>Guardar Cambios</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Modal;
