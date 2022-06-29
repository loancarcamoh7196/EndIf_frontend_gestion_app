/**
 * * Formulario de Companies - Empresas
 * ? Para agregar y Editar
 */
import React, { useState, useRouter, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';

// Componentes externo
// import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Card from '@common/Card';


// Redux ~ Duck necesarios
import { addEmpresaAction, updateEmpresaAction } from '@redux/empresasDuck';
import { getRegionesAction } from '@redux/regionesDuck';
import { getComunasAction } from '@redux/comunasDuck';

// Texto fijo de la Pagina
const txt = {
	btnAgregar: 'Agregar Empresa',
	bntEditar: 'Editar Empresa',
	btnVolver: 'Volver',
	subTitleSeccionEmpresa: 'Configuración',
	subTitleSeccionModulo: 'Modulos',
	subTitleSeccionDireccion: 'Dirección',
	lblGestion: 'Gestión',
	lblContabilidad: 'Contabilidad',
	lblInventario: 'Inventario',
	lblInventarioMovil: 'Inventario Movil',
	onlabel: 'Empresa Activa',
	offlabel: 'Empresa Desactiva',
	selectRegion: 'Region',
  selectComuna: 'Comuna',
  lblCiudad: 'Ciudad',
  lblCalle: 'Calle',
	txtSelectRegion: 'Seleccione Region',
	txtSelectComuna: 'Seleccione Comuna',
	titleSeccionModulo: 'Módulos',
	lblRut: 'RUT Empresa',
	lblRazonSocial: 'Razon Social',
	lblGiro:'Giro',
	lblFono: 'Fono de Contacto',
	lblEmail: 'Email'
};

export default function FormEmpresa({ formNewEmpresa = true, empresaForm }) {
	const params = useParams(); // Acceso a params de la URL
	const dispatch = useDispatch(); //Disparador
	const navigate = useNavigate(); // Navegador de Pagina

	// Manejo de Checkbox
	const [isCheckActiva, setIsCheckActiva] = useState(false);
	const [isCheckGestion, setIsCheckGestion] = useState(false);
	// const [isCheck, setIsCheck] = useState(false);
	// const [isCheck, setIsCheck] = useState(false);
	// const [isCheck, setIsCheck] = useState(false);


  const regiones = useSelector((store)=> store.regiones.res); //Valores para Select de Regiones
	let comunas = useSelector((store)=> store.comunas.res); // Valores para Select Comunas

  useEffect(() => { 
    dispatch(getRegionesAction()); // Recupera al cargar datos de regiones
  }, []);


	// Almacenamiento de Datos formulario
	const [form, setForm] = useState({
		rut: empresaForm.rut,
		razonSocial: empresaForm.razonSocial,
		giro: empresaForm.giro,
		fono: empresaForm.fono,
		email: empresaForm.email,
		logo: 'logo',   
		activa: empresaForm.activa,
		moduloGestion: empresaForm.moduloGestion,
		moduloContabilidad: empresaForm.moduloContabilidad,
		moduloInventario: empresaForm.moduloInventario,
		moduloInventarioMovil: empresaForm.moduloInventarioMovil,
		direccionId: empresaForm.direccionId,
		regionId: empresaForm.regionId,
		comunaId: empresaForm.comunaId,
		calle: empresaForm.calle,
		ciudad: empresaForm.ciudad
	});
	

	// console.log(form)
	/**
	 * * Manejador de Actualizar Producto
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => {
		// console.log('Entro en Editar')
		const { rut } = params; // Extraes ID de URL
		// delete form.rut;
		// console.log('datos act: ',form);

		try {
			// console.log('Entro update');
			const { rut, razonSocial, giro, fono, email, logo, activa, moduloGestion, moduloContabilidad, moduloInventario, moduloInventarioMovil, direccionId, regionId, comunaId, calle, ciudad } = form;
			let dir = { comunaId, calle, ciudad };
			let emp = { razonSocial, giro, fono, email, logo, activa, moduloGestion, moduloContabilidad, moduloInventario, moduloInventarioMovil, direccionId };
			const options = { rut, empresa: emp , direccion: dir };
			dispatch(updateEmpresaAction(options));
			navigate('/admin/empresas');
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
      // console.log('Entro en Agregar');
			const { rut, razonSocial, giro, fono, email, logo, activa, moduloGestion, moduloContabilidad, moduloInventario, moduloInventarioMovil, direccionId, regionId, comunaId, calle, ciudad } = form;
			let dir = { comunaId, calle, ciudad };
			let emp = {rut, razonSocial, giro, fono, email, logo, activa, moduloGestion, moduloContabilidad, moduloInventario, moduloInventarioMovil, direccionId };

      const options = { empresa: emp , direccion: dir };
			// console.log(options);

      dispatch(addEmpresaAction(options));
      navigate('/admin/empresas');
		} catch (error) {
			// setMessage('Falló la edición');
      console.log(error);
		}
		// console.log('Soy Agregar');
	};

	const handleChange = (e) => {
		// console.log(e)
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;;
		const name = target.name;
		
		setForm({  ...form, [name]: value });
		// console.log(form);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		formNewEmpresa ? postData(form) : putData(form);
	};

	return (
	<Fragment>
		<form onSubmit={handleSubmit} >
			<Card style='card-default' haveTitle={true} title={txt.subTitleSeccionEmpresa} > 
				<div className='row'>
					<div className='col-sm-8'>
						<div className='form-group'>
							<label htmlFor='rut'>{txt.lblRut}</label>
							<input type='text' className='form-control form-control-border' name='rut' placeholder='12345678' onChange={handleChange} value={form.rut} maxLength={13} />
						</div>

						<div className='form-group'>
							<label htmlFor='razonSocial'>{txt.lblRazonSocial}</label>
							<input type='text' className='form-control form-control-border' name='razonSocial' placeholder='Razón Social' onChange={handleChange} value={form.razonSocial} />
						</div>

						<div className='form-group'>
							<label htmlFor='giro'>{txt.lblGiro}</label>
							<input type='text' className='form-control form-control-border' name='giro' placeholder='Giro' onChange={handleChange} value={form.giro} />
						</div>

						<div className='form-group'>
							<label htmlFor='fono'>{txt.lblFono}</label>
							<input type='text' className='form-control form-control-border' name='fono' placeholder='Fono' onChange={handleChange} value={form.fono} />
						</div>

						<div className='form-group'>
							<label htmlFor='email'>{txt.lblEmail}</label>
							<input type='email' className='form-control form-control-border' name='email' placeholder='Email' onChange={handleChange} value={form.email} />
						</div>

						{/* <div className='form-group'>
							<input type='file' className='form-control form-control-border' name='logo' placeholder='Logo' onChange={handleChange} />
						</div> */}
					</div>

					<div className='col-sm-4'>
						<div className='form-group'>
							{/* <BootstrapSwitchButton
								name='activa'
								checked={true}
								// value={true}
								onlabel={txt.onlabel}
								onstyle='success'
								offlabel={txt.offlabel}
								offstyle='danger'
								size='sm'
								style='w-100 float-sm-right'
								onChange={(checked) => {
									setForm({...form, activa: !checked })
								}}
								// onChange={handleChange}
							/> */}

							
						</div>
						<div className=' form-group'>
							<h3 className='mt-5 mb-3 text-md'>{txt.titleSeccionModulo}</h3>

							<div className='icheck-pumpkin'>
								<input 
									type='checkbox' 
									name='moduloGestion' 
									id='moduloGestion' 
									onChange={handleChange} 
									value={form.moduloGestion}
								/>	
								<label htmlFor='moduloGestion'>{txt.lblGestion}</label>
							</div>
							<div className='icheck-pumpkin'>
								<input 
								type='checkbox' 
								name='moduloContabilidad' 
								id='moduloContabilidad' 
								onChange={handleChange} 
								value={form.moduloContabilidad}
								/>	
								<label htmlFor='moduloContabilidad'>{txt.lblContabilidad}</label>
							</div>
							<div className='icheck-pumpkin'>
								<input 
								type='checkbox' name='moduloInventario' id='moduloInventario' onChange={handleChange} value={form.moduloInventario} />
								<label htmlFor='moduloInventario'>{txt.lblInventario}</label>
							</div>
								<div className='icheck-pumpkin'>
								<input type='checkbox' name='moduloInventarioMovil' id='moduloInventarioMovil' onChange={handleChange} value={form.moduloInventarioMovil}  />
								<label htmlFor='moduloInventarioMovil'>{txt.lblInventarioMovil}</label>
							</div>
						</div>
					</div>
					{ !formNewEmpresa && <input type='hidden' name='direccionId' value={form.direccionId}  /> }
				</div>
			</Card>

			<Card style='card-default ' haveTitle={true} title={txt.subTitleSeccionDireccion} > 
				<div className='row'>
					<div className='col-md-12'>
						<div className='form-group'>
							<label>{txt.selectRegion}</label>
									<select
										name='regionId' 
										className='form-control select2' 
										onChange={handleChange}
										onClick={(e) => {
											const target = e.target; // Dropdown completo
											const value = target.value; // Valor seleccionado
											const name = target.name; //Nombre dropdown

											let reg = regiones.filter( i=> i.id == value);
											let region = reg[0];
											let comunas = region.comunas;
											let options = { regionId: parseInt(value), comunas: comunas };
											dispatch(getComunasAction(options));
										}}
									>
										<option disabled='disabled' selected={( !formNewEmpresa )&& 'selected'}> {txt.txtSelectRegion} </option>
										{ (regiones.length > 0) && regiones.map((i) =>  <option value={i.id} selected={i.id === form.regionId && 'selected'}  >{i.nombre}</option>) }
									</select>
						</div>

						<div className='form-group' >
						<label>{txt.txtSelectComuna}</label>
							<select id='comunaId' name='comunaId' className='form-control select2 hidden' onChange={handleChange} >
								<option disabled='disabled' selected={( !formNewEmpresa )&& 'selected'} > {txt.txtSelectComuna} </option>
								{ (comunas.length > 0 )&& comunas.map((i)=> <option value={i.id} >{i.nombre}</option>) }
							</select>
						</div>
					</div>	

					<div className='col-6'>
						<div className='form-group'>
							<label>{txt.lblCalle}</label>
							<input type='text' className='form-control form-control-border' name='calle' placeholder='Calle Ocho 585, of 207' onChange={handleChange} value={form.calle}/>
						</div>
					</div>

					<div className='col-6'>
						<div className='form-group'>
							<label>{txt.lblCiudad}</label>
							<input type='text' className='form-control form-control-border' name='ciudad' placeholder='Santiago' onChange={handleChange} value={form.ciudad} />
						</div>
					</div>
				</div>

				<div className='col-12 mt-5'>
					<input type={'submit'} className='btn btn-outline-success btn-block' value={formNewEmpresa ? txt.btnAgregar : txt.bntEditar}  />
					<Link to='/admin/empresas' className='btn btn-outline-danger btn-block' >{txt.btnVolver}</Link>
				</div>
			</Card>
		</form>
    </Fragment>
	);
}
