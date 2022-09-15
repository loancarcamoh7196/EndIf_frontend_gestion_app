import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@styles/404.scss';

export default function NotFound(){
  const navigate = useNavigate();
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
            {/* <Link to='/'>Volver</Link> */}
            <br  />
            <button className='btn btn-outline-danger btn-block color__notfound' onClick={() => navigate(-1)}>Volver</button>
          </p>
        </div>
      </div>
		</Fragment>
  );
}
