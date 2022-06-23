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
import EmpresaEdit from '@pages/empresas/edit';
import EmpresaDelete from '@pages/empresas/delete';
//Mantenedor Usuarios
import UsuarioIndex from '@pages/usuarios/index';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/admin/empresas" element={<EmpresaIndex />} />
          <Route exact path="/admin/empresas/new" element={<EmpresaNew />} />
          <Route exact path='/admin/empresas/:rut/edit' element={<EmpresaEdit />} />
          <Route exact path='/admin/empresas/:rut/delete' />
            {/* <Route path="invoices" element={<Invoices />} /> */}
          <Route exact path='/admin/usuarios' element={<UsuarioIndex  />} />
        <Route exact path='login' element={<Login />}  />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </Router>
  );
};

export default App;
