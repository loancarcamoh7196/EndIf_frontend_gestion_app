import React from 'react';


const Breadcrum = ({ title, url }) => {
  return (
    <div className='content-header'>
      <div className='container-fluid'>
        <div className='row mb-2'>
          <div className='col-sm-6'>
            <h1 className='m-0'>{ title }</h1>
          </div>

          <div className='col-sm-6'>
            <ol className='breadcrumb float-sm-right'>
              <li className='breadcrumb-item'>
                <a href='#'>Home</a>
              </li>
              <li className='breadcrumb-item active'>Dashboard v3</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breadcrum;
