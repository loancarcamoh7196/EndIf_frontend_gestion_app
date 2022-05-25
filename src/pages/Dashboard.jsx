import React, { useState, useEffect }  from 'react';
import axios from 'axios';
// import { useDispatch, useSelector, useStore } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// import { logoutUserAction } from '@redux/userAuthDuck';

import Layout from '@layouts/Main';
import apiURL from '@services/api';

const Dashboard = () => {

  const handleHundred = (e) => {
    let i = 1;

      const api = apiURL.products.addProduct();

      do {
        try {
          let res = axios.get(api);
          console.log(res);
        } catch (error) {
          console.log(error);
        }
        
      }while (i<= 100)
  };

  const handleThousand = () => {

  };

  const handleMillion = () => {

  };

  return (
    <Layout>
      <section className='block'>
        <h3 className='title'>Dashboard</h3>

        <div className='card'>

          <button className='button primary'  onClick={handleHundred} > Probar 100 registros </button>
        </div>
      </section>
    
    </Layout>
  );
}

export default Dashboard;
