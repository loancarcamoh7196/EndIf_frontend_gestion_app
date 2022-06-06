import React, { Fragment } from 'react'

const Card = ({ children, title='Aviso', haveTitle=false, haveClose=false, body, haveFooter=false, footer }) => {
  return (
    <Fragment>
      <div className='card'>
        { (haveTitle || haveClose) && <div className='card-header'>
          {haveTitle && <h3 className='card-title'>{title}</h3>}

          {haveClose &&
            <div className='card-tools'>
              <button type='button' className='btn btn-tool' data-card-widget='collapse' title='Collapse'>
                <i className='fas fa-minus' />
              </button>
              <button type='button' className='btn btn-tool' data-card-widget='remove' title='Remove'>
                <i className='fas fa-times' />
              </button>
            </div>
          }
        </div>}
        <div className='card-body'>
          {body} {children}
        </div>
        {/* <!-- /.card-body --> */}
        {haveFooter &&
          <div className='card-footer'>
            {footer}
          </div>
        }{/* <!-- /.card-footer--> */}
      </div>
    </Fragment>
  );
}

export default Card;
