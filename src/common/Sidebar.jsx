import React, { Fragment } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { universal } from '../utils/texts/general';

import SiteIcon from '@assets/icons/fav.png';

const Sidebar = () => {
return (
<Fragment>
  <aside className='main-sidebar sidebar-dark-primary elevation-4 sidebar-light-orange'>
    {/* ----------- Icono Lateral ------------ */}
    <NavLink to='/' className='brand-link text-sm bg-orange'>
      <img src={SiteIcon} alt={universal.txt.altEmpresa} className='brand-image img-circle elevation-3' style={{opacity: .8}} />
      <span className='brand-text font-weight-light'>{universal.lbl.brandCompany}</span>
    </NavLink>

    <div className='sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-transition os-host-overflow-x'>
      {/* ----------- Info Usuario ------------ */}
      {/* <div className='user-panel mt-3 pb-3 mb-3 d-flex'>
        <div className='image'>
          <img src='dist/img/user2-160x160.jpg' className='img-circle elevation-2' alt='User Image' />
        </div>
        <div className='info'>
          <a href='#' className='d-block'>Alexander Pierce</a>
        </div>
      </div> */}
      {/* ------------ Buscador  ----------- */}
      {/* <div className='form-inline'>
        <div className='input-group' data-widget='sidebar-search'>
          <input className='form-control form-control-sidebar' type='search' placeholder='Search' aria-label='Search' />
          <div className='input-group-append'>
            <button className='btn btn-sidebar'>
              <i className='fas fa-search fa-fw'></i>
            </button>
          </div>
        </div>
      </div> */}
      {/* ----------------- Cuerpo de Sidebar ---------------------------- */}
      <nav className='mt-2'>
        <ul className='nav nav-pills nav-sidebar flex-column' data-widget='treeview' role='menu' data-accordion='false'>
          {/* ---------- Links ------------- */}
          <li className='nav-item'>
            <NavLink to='/dashboard' className='nav-link'>
              <i className='nav-icon fas fa-tachometer-alt'/>
              <p>
                {universal.title.dashboard}
              </p>
            </NavLink>
          </li>
          <li className='nav-item'>
            <Link to='#' className='nav-link'>
              <i className='nav-icon fa-solid fa-screwdriver-wrench' />
              <p>
                {universal.title.admin}
                <i className='right fas fa-reg fa-angle-left' />
              </p>
            </Link>
            <ul className='nav nav-treeview'>
              <li className='nav-item'>
                <NavLink to='/admin/empresas' className='nav-link'>
                  <i className='fas fa-industry nav-icon' />
                  <p>{universal.title.empresa}</p>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/admin/usuarios' className='nav-link'>
                  <i className='fa fa-reg fa-users nav-icon' />
                  <p>{universal.title.usuario}</p>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/admin/roles' className='nav-link'>
                  <i className='fa fa-reg fa-user-gear nav-icon' />
                  <p>{universal.title.roles}</p>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/admin/marcas' className='nav-link'>
                  <i className='fa fa-reg fa-tags nav-icon' />
                  <p>{universal.title.marca}</p>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/admin/unidad' className='nav-link'>
                  <i className='fa fa-reg fa-scale-balanced nav-icon' />
                  <p>{universal.title.unidad}</p>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className='nav-item'>
            <Link to='#' className='nav-link'>
              <i className='nav-icon fas fa-solid fa-cubes' />
              <p>
                {universal.title.mantenedor}
                <i className='right fas fa-angle-left' />
              </p>
            </Link>
            <ul className='nav nav-treeview'>
              <li className='nav-item'>
                <NavLink to='/tiendas' className='nav-link'>
                  <i className='fas fa-store nav-icon' />
                  <p>{universal.title.tienda}</p>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/familias' className='nav-link'>
                  <i className='fas fa-list nav-icon' />
                  <p>{universal.title.familia}</p>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/productos' className='nav-link'>
                  <i className='fas fa-box-open nav-icon' />
                  {/* <i class="fa-solid fa-basket-shopping-simple"></i> */}
                  <p>{universal.title.producto}</p>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/cajas' className='nav-link'>
                  <i className='fas fa-cash-register nav-icon' />
                  {/* <i class="fa-solid fa-basket-shopping-simple"></i> */}
                  <p>{universal.title.caja}</p>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/lista_precio' className='nav-link'>
                  <i className='fas fa-list-check nav-icon' />
                  {/* <i class="fa-solid fa-basket-shopping-simple"></i> */}
                  <p>{universal.title.lista}</p>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className='nav-item'>
            <Link to='#' className='nav-link'>
              <i className='nav-icon fas fa-solid fa-money-bill-1' />
              <p>
                {universal.title.venta}
                <i className='right fas fa-angle-left' />
              </p>
            </Link>
            <ul className='nav nav-treeview'>
              <li className='nav-item'>
                <NavLink to='/ventas/new' className='nav-link'>
                  <i className='fas fa-store nav-icon' />
                  <p>{universal.title.ventaSim}</p>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/ventas' className='nav-link'>
                  <i className='fas fa-list nav-icon' />
                  <p>{universal.title.venta}</p>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/productos' className='nav-link'>
                  <i className='fas fa-box-open nav-icon' />
                  {/* <i class="fa-solid fa-basket-shopping-simple"></i> */}
                  <p>{universal.title.producto}</p>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/cajas' className='nav-link'>
                  <i className='fas fa-cash-register nav-icon' />
                  {/* <i class="fa-solid fa-basket-shopping-simple"></i> */}
                  <p>{universal.title.caja}</p>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/lista_precio' className='nav-link'>
                  <i className='fas fa-list-check nav-icon' />
                  {/* <i class="fa-solid fa-basket-shopping-simple"></i> */}
                  <p>{universal.title.lista}</p>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className='nav-item'>
            <NavLink to='/informes' className='nav-link'>
              <i className='nav-icon fas fa-th'/>
              <p>
                {universal.txt.informe}
                <span className='right badge badge-danger'>New</span>
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</Fragment>
);
}

export default Sidebar;
