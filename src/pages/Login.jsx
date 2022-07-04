import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '@layouts/Login';
// import { useDispatch, useSelector, useStore } from 'react-redux';
// import { toast } from 'react-toastify';
// import '@styles/Login.scss';
// const bcrypt = require('bcrypt');
// import bcrypt from 'bcrypt'

// import { loginUserAction } from '@redux/userAuthDuck';
// import SiteIcon from '@icons/logoendif_old.png';

const Login = () => {
	return (
		<Layout>
			<div className='login-box'>
				<div className='login-logo'>
					<a href='/'><b>EndIf</b> Gestión</a>
				</div>
				
				<div className='card'>
					<div className='card-body login-card-body'>
						<p className='login-box-msg'>Inicie Sesión</p>

						<form action='/' method='post'>
							<div className='input-group mb-3'>
								<input type='email' className='form-control' placeholder='Usuario' autocomplete="on" />
								<div className='input-group-append'>
									<div className='input-group-text'>
										<span className='fas fa-envelope'></span>
									</div>
								</div>
							</div>
							<div className='input-group mb-3'>
								<input type='password' className='form-control' placeholder='Contraseña' autocomplete="on" />
								<div className='input-group-append'>
									<div className='input-group-text'>
										<span className='fas fa-lock'></span>
									</div>
								</div>
							</div>
							<div className='row'>
								<div className='col-8'>
									<div className='icheck-primary'>
										<input type='checkbox' id='remember' />
										<label htmlFor='remember'>
											Recordarme
										</label>
									</div>
								</div>
								
								<div className='col-4'>
									<button type='submit' className='btn btn-primary btn-block'>Ingresar</button>
								</div>
								
							</div>
						</form>

						<p className='mb-1'>
							<a href='forgot-password.html'>Olvide mi contraseña</a>
						</p>
					
					</div>
					
				</div>
			</div>
		</Layout>
	);
};

export default (Login);
