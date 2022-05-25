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
					<a href='../../index2.html'><b>EndIf</b> Gestión</a>
				</div>
				
				<div className='card'>
					<div className='card-body login-card-body'>
						<p className='login-box-msg'>Sign in to start your session</p>

						<form action='../../index3.html' method='post'>
							<div className='input-group mb-3'>
								<input type='email' className='form-control' placeholder='Email' />
								<div className='input-group-append'>
									<div className='input-group-text'>
										<span className='fas fa-envelope'></span>
									</div>
								</div>
							</div>
							<div className='input-group mb-3'>
								<input type='password' className='form-control' placeholder='Password' />
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
										<label for='remember'>
											Remember Me
										</label>
									</div>
								</div>
								
								<div className='col-4'>
									<button type='submit' className='btn btn-primary btn-block'>Sign In</button>
								</div>
								
							</div>
						</form>

						<div className='social-auth-links text-center mb-3'>
							<p>- OR -</p>
							<a href='#' className='btn btn-block btn-primary'>
								<i className='fab fa-facebook mr-2'></i> Sign in using Facebook
							</a>
							<a href='#' className='btn btn-block btn-danger'>
								<i className='fab fa-google-plus mr-2'></i> Sign in using Google+
							</a>
						</div>
						

						<p className='mb-1'>
							<a href='forgot-password.html'>I forgot my password</a>
						</p>
						<p className='mb-0'>
							<a href='register.html' className='text-center'>Register a new membership</a>
						</p>
					</div>
					
				</div>
			</div>
		</Layout>
	);
};

export default (Login);
