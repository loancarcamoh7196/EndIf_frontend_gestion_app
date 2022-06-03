import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';

import NotFound from '@pages/NotFound';
import Home from '@pages/Home';
import Dashboard from '@pages/Dashboard';
import Login from '@pages/Login';
import Admin from '@pages/Admin';
//Mantenedor Empresas
import EmpresaIndex from '@pages/empresas/index';
import EmpresaNew from '@pages/empresas/new';

const App = () => {
  return (
    // <AppContext.Provider  value={useInitialState}>
    <Router>
      <Routes>

        <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          

          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/empresas" element={<EmpresaIndex />} >
            <Route path="new" element={<EmpresaNew />} />
          </Route>
            {/* <Route path="invoices" element={<Invoices />} /> */}
          

        
        

        <Route path='login' element={<Login />}  />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </Router>
    // </AppContext.Provider>
  );
};

export default App;