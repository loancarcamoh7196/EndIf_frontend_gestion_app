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
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/admin/empresas" element={<EmpresaIndex />} >
            <Route  path="/admin/empresas/new" element={<EmpresaNew />} />
          </Route>
            {/* <Route path="invoices" element={<Invoices />} /> */}
          
        <Route exact path='login' element={<Login />}  />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </Router>
  );
};

export default App;