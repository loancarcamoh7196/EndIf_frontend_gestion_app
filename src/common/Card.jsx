import React, { Fragment } from 'react'

const Card = ({ title='Aviso', haveClose=false, body, haveFooter=false, footer }) => {
  return (
    <Fragment>
      <div className='card'>
        <div className='card-header'>
          <h3 className='card-title'>{title}</h3>

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
        </div>
        <div className='card-body'>
          {body}
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
