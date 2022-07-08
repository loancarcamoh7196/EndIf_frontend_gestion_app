import React from 'react'
// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from '@common/Footer';
import '@styles/Global.css';

const Default = ({children}) => {
  return (
  <div className='wrapper'>
    <div className='content-wrapper'>
      <section className='content'>
        <div class="container-fluid">
          {children}
        </div>
      </section>
    </div>
    <Footer  />
    <ToastContainer />
  </div>
  )
}

export default Default