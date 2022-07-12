/** 
 ** Archivo de configuracion de rutas
*/
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import Theme from '@context/ThemeContext';

import NotFound from '@pages/NotFound';
import Home from '@pages/Home';
import Dashboard from '@pages/Dashboard';
import Login from '@pages/Login';
import Admin from '@pages/Admin';
//Mantenedor Empresas
import EmpresaIndex from '@pages/empresas/index';
import EmpresaNew from '@pages/empresas/new';
import EmpresaEdit from '@pages/empresas/edit';
// import EmpresaDelete from '@pages/empresas/delete';
//Mantenedor Usuarios
import UsuarioIndex from '@pages/usuarios/index';
import UsuarioNew from '@pages/usuarios/new';
import UsuarioEdit from '@pages/usuarios/edit';
// Mantenedor Roles
import RolesIndex from '@pages/roles/index';
import RolesNew from '@pages/roles/new';
import RolesEdit from '@pages/roles/edit';
// Mantenedor Tiendas ~ Sucursales
import TiendaIndex from '@pages/tiendas/index';
import TiendaNew from '@pages/tiendas/new';
import TiendaEdit from '@pages/tiendas/edit';


const App = () => {
  return (
    <Router>
      <Theme.Provider value=''>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          {/* Mod Administrador */}
          <Route exact path="/admin" element={<Admin />} />
          {/* SubMod Empresas */}
          <Route exact path="/admin/empresas" element={<EmpresaIndex />} />
          <Route exact path="/admin/empresas/new" element={<EmpresaNew />} />
          <Route exact path='/admin/empresas/:rut/edit' element={<EmpresaEdit />} />
          {/* SubMod Usuario */}
          <Route exact path='/admin/usuarios' element={<UsuarioIndex  />} />
          <Route exact path='/admin/usuarios/new' element={<UsuarioNew  />} />
          <Route exact path='/admin/usuarios/:id/edit' element={<UsuarioEdit  />} />
          {/* Submod Roles */}
          <Route exact path='/admin/roles/' element={<RolesIndex />} />
          <Route exact path='/admin/roles/new' element={<RolesNew />} />
          <Route exact path='/admin/roles/:id/edit' element={<RolesEdit />} />
          {/* Mod Sucursales */}
          <Route exact path='/tiendas' element={<TiendaIndex />} />
          <Route exact path='/tiendas/new' element={<TiendaNew />} />
          <Route exact path='/tiendas/:id/edit' element={<TiendaEdit />} />
          

          <Route exact path='login' element={<Login />}  />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Theme.Provider>
    </Router>
  );
};

export default App; 
