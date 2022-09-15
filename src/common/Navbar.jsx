/**
 ** Componente Navbar
 */
import React, { Fragment, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { universal } from '../utils/texts/general';
//* Redux
import { logoutUserAction } from '@redux/userAuthDuck';
//* Image
import UserIcon from '@assets/icons/user_icon.png';
//* Custom Components
import EmpSelect from '../common/EmpresaSelect';  

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
	let isAdmin = useSelector(store => store.auth.isAdmin);
  let userLogged = useSelector(store => store.auth.info);

  const handleLogOut = () => {
		dispatch(logoutUserAction());
		navigate('/');
	}

  return (
  <Fragment>
    <nav className='main-header navbar navbar-expand navbar-light bg-orange text-sm'>
      {/* -------- Links de Navbar ---------- */}
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <Link to='#' className='nav-link' data-widget='pushmenu' role='button'>
            <i className='fas fa-bars' />
          </Link>
        </li>
        <li className='nav-item d-none d-sm-inline-block'>
          <NavLink to='/' className='nav-link'> {universal.lbl.home} </NavLink>
        </li>
        <li className='nav-item d-none d-sm-inline-block'>
          <NavLink to='/dashboard' className='nav-link'> {universal.lbl.dashboard} </NavLink>
        </li>
        <li className='nav-item d-none d-sm-inline-block'>
          <NavLink to='/admin' className='nav-link'> {universal.lbl.admin} </NavLink>
        </li>
      </ul>
      {/* -------- Buscador y otros widget ---------- */}
      <ul className='navbar-nav ml-auto'>
        { isAdmin &&
          <li className='nav-item'>
            <div to='#' className='dropdown-item'>
              <EmpSelect  />
            </div>
          </li>      
        }
        <li className='nav-item'>
          <NavLink to='#' className='nav-link' data-widget='navbar-search' role='button'>
            <i className='fas fa-search' />
          </NavLink>
          <div className='navbar-search-block'>
            <form className='form-inline'>
              <div className='input-group input-group-sm'>
                <input className='form-control form-control-navbar' type='search' placeholder={universal.plhld.search} aria-label='Search' />
                <div className='input-group-append'>
                  <button className='btn btn-navbar' type='submit'>
                    <i className='fas fa-search' />
                  </button>
                  <button className='btn btn-navbar' type='button' data-widget='navbar-search'>
                    <i className='fas fa-times' />
                  </button>
                </div>
              </div>
            </form>
          </div>  
        </li>
        {/* -------- Mensajes ---------- */}
        
        {/* -------- Notificaciones ---------- */}
        <li className='nav-item dropdown'>
          <Link to='#' className='nav-link dropdown-toggle' data-bs-toggle="dropdown"  aria-expanded="true" >
            <img src={UserIcon} width={25} />
          </Link>
          <div className='dropdown-menu  dropdown-menu-right'>
            <span className='dropdown-item dropdown-header'>
              {userLogged !== undefined && userLogged.username }
            </span>
            {/* <div className='dropdown-divider'></div> */}
            {/* { isAdmin &&
              <div to='#' className='dropdown-item'>
                <EmpSelect  />
              </div>
            } */}
            {/* <div className='dropdown-divider'></div>
            <a href='#' className='dropdown-item'>
              <i className='fas fa-users mr-2'></i> 8 friend requests
              <span className='float-right text-muted text-sm'>12 hours</span>
            </a>
            <div className='dropdown-divider'></div>
            <Link href='#' className='dropdown-item'>
              <i className='fas fa-file mr-2'/> 3 new reports
              <span className='float-right text-muted text-sm'>2 days</span>
            </Link> */}
            <div className='dropdown-divider'></div>
            <button
              className='dropdown-item dropdown-footer dropdown-dark'
              onClick={handleLogOut}
            >
              {universal.btn.cerrar}
            </button>
          </div>
        </li>
        
        {/* -------- Full Width ---------- */}
        <li className='nav-item'>
          <NavLink to='#' className='nav-link' data-widget='fullscreen' role='button'>
            <i className='fas fa-expand-arrows-alt'></i>
          </NavLink>
        </li>
      </ul>
    </nav>
  </Fragment>
  )
}

export default Navbar;
