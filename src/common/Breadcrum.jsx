import React, { Fragment } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

/*
  Ejemplo de contenido de parametro links
  const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Empresas', url: '/admin/empresas' }
];
*/

const Breadcrum = ({ key='breadcrum ', title, links, haveLink=false }) => {
  // let location = useLocation();

  // console.log(links);
  // console.log(links.length);
  return (
    <Fragment>
      <div className='content-header' id={key}>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1 className='m-1'>{ title }</h1> {/* titulo de Pagina */}
            </div>

            {/* Breadcrum de la pagina */}
            <div className='col-sm-6'>
              { 
                (links !== undefined && haveLink) &&
                <ol className='breadcrumb float-sm-right text-sm'>
                  { links.map( (i) => <li className={`breadcrumb-item`}> <NavLink to={i.url} >{i.nombre}</NavLink></li>)}
                </ol>
              }
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Breadcrum;
