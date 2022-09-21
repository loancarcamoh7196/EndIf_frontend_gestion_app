/** 
 ** Archivo de configuracion de rutas
*/
import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

import NotFound from '@pages/NotFound';
import Home from '@pages/Home';
import Dashboard from '@pages/Dashboard';
import Login from '@pages/Login';
import Admin from '@pages/Admin';
//? Mantenedor Empresas
import EmpresaIndex from '@pages/empresas/index';
import EmpresaNew from '@pages/empresas/new';
import EmpresaEdit from '@pages/empresas/edit';
//? Mantenedor Usuarios
import UsuarioIndex from '@pages/usuarios/index';
import UsuarioNew from '@pages/usuarios/new';
import UsuarioEdit from '@pages/usuarios/edit';
//? Mantenedor Roles
import RolesIndex from '@pages/roles/index';
import RolesNew from '@pages/roles/new';
import RolesEdit from '@pages/roles/edit';
//? Mantenedor Tiendas ~ Sucursales
import TiendaIndex from '@pages/tiendas/index';
import TiendaNew from '@pages/tiendas/new';
import TiendaEdit from '@pages/tiendas/edit';
//? Mantenedor Familias ~ Sub Familias
import FamiliaIndex from '@pages/familias/index';
import FamiliaNew from '@pages/familias/new';
import FamiliaEdit from '@pages/familias/edit';
//? Mantenedor Productos ~ Marca 
import ProductoIndex from '@pages/productos/index';
import ProductoNew from '@pages/productos/new';
import ProductoEdit from '@pages/productos/edit';
//? Maantenedor Precio
import PrecioIndex from '@pages/precios/index';
//? Mantenedor SubFamilias
import SubFamiliaIndex from '@pages/subFamilias/index';
//? Mantenedor Unidades
import UnidadIndex from '@pages/unidades/index';
//? Mantenedor Marcas 
import MarcaIndex from '@pages/marcas/index';
//? Mantenedor Cajas
import CajaIndex from '@pages/cajas/index';
import CajaNew from '@pages/cajas/new';
import CajaEdit from '@pages/cajas/edit';
//? Mantenedor Lista Precio
import ListaPrecioIndex from '@pages/listaPrecios/index';
//? Mantenedor Venta
import VentaIndex from '@pages/ventas/index';
import VentaNew from '@pages/ventas/new';
//? Mantenedor Tienda Lista Precio
import TiendaListaPrecioIndex  from '@pages/tiendaListas/index';
//? Mantenedor Barra
import BarraIndex from '@pages/barras/index';

const App = () => {
  return (
    <Router>
      {/* <Theme.Provider value=''> */}
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
        {/* Mod Familias */}
        <Route exact path='/familias' element={<FamiliaIndex />} />
        <Route exact path='/familias/new' element={<FamiliaNew />} />
        <Route exact path='/familias/:id/edit' element={<FamiliaEdit />} />
        {/* Mod Productos */}
        <Route exact path='/productos' element={<ProductoIndex />} />
        <Route exact path='/productos/new' element={<ProductoNew />} />
        <Route exact path='/productos/:id/edit' element={<ProductoEdit />} />
        {/* Mod Precios */}
        <Route exact path='/productos/:id/precios' element={<PrecioIndex />} />
        {/* Mod Barra */}
        <Route exact path='/productos/:id/barras' element={<BarraIndex />} />
        {/* Mod Subfamilia */}
        <Route exact path='/subfamilias/:id' element={<SubFamiliaIndex />} />
        {/* Mod Unidad */}
        <Route exact path='/admin/unidad' element={<UnidadIndex />} />
        {/* Mod Marcas */}
        <Route exact path='/admin/marcas' element={<MarcaIndex />} />
        {/* Mod Cajas */}
        <Route exact path='/cajas' element={<CajaIndex />} />
        <Route exact path='/cajas/new' element={<CajaNew />} />
        <Route exact path='/cajas/:id/edit' element={<CajaEdit />} />
        {/* Mod Lista Precios */}
        <Route exact path='/lista_precio' element={<ListaPrecioIndex />} />
        <Route exact path='/lista_precio/:id/tienda' element={<TiendaListaPrecioIndex />} />
        {/* Mod Ventas */}
        <Route exact path='/ventas' element={<VentaIndex />} />
        <Route exact path='/ventas/new' element={<VentaNew />} />


        <Route exact path='login' element={<Login />}  />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* </Theme.Provider> */}
    </Router>
  );
};

export default App; 
