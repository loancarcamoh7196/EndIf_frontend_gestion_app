import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '@styles/404.scss';

export default function NotFound(){
  return (
		<Fragment>
      <div id='notfound'>
        <div className='notfound'>
          <div>
            <div className='notfound-404'>
              <h1>!</h1>
            </div>
            <h2>Error<br/>404</h2>
          </div>
          <p>
            La página que estas buscando no existe o no se encuentra disponible. <br></br>
            <Link to='/'>Volver</Link>
          </p>
        </div>
      </div>
		</Fragment>
  );
}
