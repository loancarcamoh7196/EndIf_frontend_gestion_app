import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { universal } from '../utils/textModUniversal';

import useAuth from '@hooks/useAuth';
import Layout from '@layouts/Login';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { toast } from 'react-toastify';
// import '@styles/Login.scss';
// const bcrypt = require('bcrypt');
// import bcrypt from 'bcrypt'

import { loginUserAction } from '@redux/userAuthDuck';
import SiteIcon from '@assets/icons/logoendif_old.png';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate(); // Navegador de Pagina

	const loading = useSelector((store) => store.user.loading);
	const activo = useSelector((store) => store.user.activo);
	const [form, setForm] = useState({ username: '', password: '' });
	const user = useSelector(store => store.user.info);
	const { login } = useAuth();
	// console.log(useAuth());

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(form);
		// const hash = bcrypt.hash(form.password, 10);
		// form.password = hash;
		const options = { body: form };

		try {
			dispatch(loginUserAction(options));
			// let  activo = useStore( (store) => store.user.activo );
			// (activo && navigate('/dashboard'))
			login(user);
			navigate('/dashboard')
		} catch (error) {
			toast.error(`Error: ${error}`);
			// console.log('fallo login');
			navigate('/login')
		}
	}

	const handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		setForm({...form, [name]: value,});
	};

	return (
		<Layout>
			<div className='login-box'>
				<div className='login-logo'>
					<Link to='/'><b>{universal.title.endif}</b> {universal.title.gestion}</Link>
				</div>
				
				<div className='card'>
					<div className='card-body login-card-body'>
						<p className='login-box-msg'>{universal.title.inicieSession}</p>

						<form onSubmit={handleSubmit}>
							<div className='input-group mb-3'>
								<input type='text'
									name='username'
									className='form-control'
									placeholder={universal.lbl.usuario}
									autoComplete='on'
									onChange={handleChange}
								/>
								<div className='input-group-append'>
									<div className='input-group-text'>
										<span className='fas fa-user'/>
									</div>
								</div>
							</div>
							<div className='input-group mb-3'>
								<input
									name='password'
									type='password'
									className='form-control'
									placeholder={universal.lbl.contraseña}
									autoComplete='on'
									onChange={handleChange}
								/>
								<div className='input-group-append'>
									<div className='input-group-text'>
										<span className='fas fa-lock'/>
									</div>
								</div>
							</div>
							<div className='row'>
								<div className='col-8'>
									<div className='icheck-primary'>
										<input type='checkbox' id='remember' />
										<label htmlFor='remember'>{universal.lbl.recuerdame}</label>
									</div>
								</div>
								
								<div className='col-4'>
									<input type='submit' className='btn btn-primary btn-block' value={universal.btn.ingresar} />
								</div>
							</div>
						</form>
						{/* <p className='mb-1'>
							<Link to='#'>{universal.txt.forget}</Link>
						</p> */}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default (Login);
