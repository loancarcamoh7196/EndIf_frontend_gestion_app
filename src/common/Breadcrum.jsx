import React from 'react';
import { NavLink } from 'react-router-dom';

const Breadcrum = ({ title, url, links }) => {
  return (
    <div className='content-header'>
      <div className='container-fluid'>
        <div className='row mb-2'>
          <div className='col-sm-6'>
            <h1 className='m-0'>{ title }</h1>
          </div>

          {
            (!links) ?  'Sin Links'
            :
            <div className='col-sm-6'>
            <ol className='breadcrumb float-sm-right'>
              <li className='breadcrumb-item'>
                <NavLink href='#'>Home</NavLink>
              </li>
              <li className='breadcrumb-item active'>Dashboard v3</li>
            </ol>
          </div>
          }

          
        </div>
      </div>
    </div>
  )
}

export default Breadcrum;
