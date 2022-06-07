/**
 * * Formulario de Companies - Empresas
 * ? Pertenece a mantenedor de bd empresas_
 */
import React, { useState, useRouter, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';

import Card from '@common/Card';
import Modal from '@common/Modal';
import { addEmpresaAction, updateEmpresaAction } from '@redux/empresasDuck';

const txtBtnCancel = 'Volver';


export default function FormCompanies({ forNewCompany = true, empresaForm }) {
	const params = useParams();
	const dispatch = useDispatch(); //Disparador
	const navigate = useNavigate(); // Navegador de Pagina
	// const [message, setMessage] = useState(''); // Manejador de errores

	// Almacenamiento de Datos formulario
	const [form, setForm] = useState({
		rut: empresaForm.rut,
		razonSocial: empresaForm.razonSocial,
		giro: empresaForm.giro,
		fono: empresaForm.fono,
		email: empresaForm.email,
		logo: empresaForm.logo,   
		activa: empresaForm.activa,
		moduloGestion: empresaForm.moduloGestion,
		moduloContabilidad: empresaForm.moduloContabilidad,
		moduloInventario: empresaForm.moduloInventario,
		moduloInventarioMovil: empresaForm.moduloInventarioMovil,
		direccionId: empresaForm.direccionId,
	});

	// console.log(form)
	/**
	 * * Manejador de Actualizar Producto
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => {
		// console.log('Entro en Editar')
		const { id } = params; // Extraes ID de URL
		delete form.rut;
		// console.log('datos act: ',form);

		try {
			// console.log('Entro update');
			const options = { id, body: form };
			dispatch(updateEmpresaAction(options));

			navigate('/empresas');
		} catch (error) {
			console.log(error);
			// setMessage('Falló la edición');
		}
		// console.log('Soy update');
	};

	/** 
	 * * Manejador para Agregar Producto
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {
      // console.log('Entro en Agregar')
      const options = { body: form };
      dispatch(addEmpresaAction(options));

      navigate('/empresas');
		} catch (error) {
			// setMessage('Falló la edición');
      console.log(error);
		}
		// console.log('Soy Agregar');
	};

	const handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		setForm({
			...form,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		forNewCompany ? postData(form) : putData(form);
	};

	return (
		<Fragment>
      <Modal style='bg-primary'> 
        Hola!
      </Modal>
    </Fragment>
	);
}
