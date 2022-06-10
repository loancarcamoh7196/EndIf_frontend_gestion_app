/**
 * * Formulario de Companies - Empresas
 * ? Pertenece a mantenedor de bd empresas_
 */
import React, { useState, useRouter, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';

// Componentes externo
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import Card from '@common/Card';
import Select from '@containers/Select2';

// import $ from 'jquery';

// Redux ~ Duck necesarios
import { addEmpresaAction, updateEmpresaAction } from '@redux/empresasDuck';
import { getRegionesAction } from '@redux/regionesDuck';
import { getComunasAction } from '../redux/comunasDuck';

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
	txtSelectComuna: 'Seleccione Comuna'
};

export default function FormCompanies({ formNewEmpresa = true, empresaForm }) {
	const params = useParams();
	const dispatch = useDispatch(); //Disparador
	const navigate = useNavigate(); // Navegador de Pagina

	
  const regiones = useSelector((store)=> store.regiones.res); //Valores para Select de Regiones
	let comunas = useSelector((store)=> store.comunas.res);

  useEffect(() => {
    dispatch(getRegionesAction());
    // $('#select2').select2();
    // $('#selectComuna').select2();
  }, []);

	//Almacenamiento de Datos de Select Comunas
	// const [comunas, setComunas] = useState([]);


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
      // console.log('Entro en Agregar');

			const { rut, razonSocial, giro, fono, email, logo, activa, moduloGestion, moduloContabilidad, moduloInventario, moduloInventarioMovil, direccionId, regionId, comunaId, calle, ciudad } = form;
			let dir = { comunaId, calle, ciudad };
			let emp = {rut, razonSocial, giro, fono, email, logo, activa, moduloGestion, moduloContabilidad, moduloInventario, moduloInventarioMovil, direccionId };

      const options = { empresa: emp , direccion: dir };

			// console.log(options);

      dispatch(addEmpresaAction(options));

			// console.log(form);
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
		const value = target.value;
		const name = target.name;
		
		setForm({
			...form,
			[name]: value,
		});
		// console.log(form);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		formNewEmpresa ? postData(form) : putData(form);
	};

	return (
		<Fragment>
			<form onSubmit={handleSubmit} >
				<Card style={'card-default'} haveTitle={true} title={txt.subTitleSeccionEmpresa} > 
					<div className='row'>
						<div className='col-sm-8'>
							<div className='form-group'>
								<input type='text' className='form-control form-control-border' name='rut' placeholder='RUT' onChange={handleChange} />
							</div>

							<div className='form-group'>
								<input type='text' className='form-control form-control-border' name='razonSocial' placeholder='Razón Social' onChange={handleChange} />
							</div>

							<div className='form-group'>
								<input type='text' className='form-control form-control-border' name='giro' placeholder='Giro' onChange={handleChange} />
							</div>

							<div className='form-group'>
								<input type='text' className='form-control form-control-border' name='fono' placeholder='Fono' onChange={handleChange} />
							</div>

							<div className='form-group'>
								<input type='email' className='form-control form-control-border' name='email' placeholder='Email' onChange={handleChange} />
							</div>

							{/* <div className='form-group'>
								<input type='file' className='form-control form-control-border' name='logo' placeholder='Logo' onChange={handleChange} />
							</div> */}
						</div>

						<div className='col-sm-4'>
							<div className='form-group'>
								<BootstrapSwitchButton
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
										setForm({ activa: !checked })
									}}
									// onChange={handleChange}
								/>
							</div>
							<div className=' form-group'>
								<h3 className='mt-5 mb-3 text-md'>Modulos</h3>
								<div className='icheck-pumpkin'>
									<input type='checkbox' name='moduloGestion' id='moduloGestion' onChange={handleChange} />
									<label htmlFor='moduloGestion'>{txt.lblGestion}</label>
								</div>
								<div className='icheck-pumpkin'>
									<input type='checkbox' name='moduloContabilidad' id='moduloContabilidad' onChange={handleChange}/>	
									<label htmlFor='moduloContabilidad'>{txt.lblContabilidad}</label>
								</div>
								<div className='icheck-pumpkin'>
									<input type='checkbox' name='moduloInventario' id='moduloInventario' onChange={handleChange} />
									<label htmlFor='moduloInventario'>{txt.lblInventario}</label>
								</div>
									<div className='icheck-pumpkin'>
									<input type='checkbox' name='moduloInventarioMovil' id='moduloInventarioMovil' onChange={handleChange} />
									<label htmlFor='moduloInventarioMovil'>{txt.lblInventarioMovil}</label>
								</div>
							</div>
						</div>
					</div>
				</Card>

				<Card style={'card-default '} haveTitle={true} title={txt.subTitleSeccionDireccion} > 
					<div className='row'>
						<div className='col-md-12'>
							<div className='form-group'>
								<label>{txt.selectRegion}</label>
								{/* <Select  data={regiones} name='regionId' txtDefault='Seleccione Región' handleChange={handleChange}  /> */}
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
										<option disabled='disabled' selected='selected'> {txt.txtSelectRegion} </option>
										{ (regiones.length > 0) && regiones.map((i) =>  <option value={i.id}>{i.nombre}</option>) }
									</select>
							</div>

							<div className='form-group' >
								<select id='comunaId' name='comunaId' className='form-control select2 hidden' onChange={handleChange} >
									<option disabled='disabled' selected='selected'> {txt.txtSelectComuna} </option>
									{ (comunas.length > 0 )&& comunas.map((i)=> <option value={i.id} >{i.nombre}</option>) }
								</select>
							</div>
						</div>	

						<div className='col-6'>
							<div className='form-group'>
								<label>{txt.lblCalle}</label>
								<input type='text' className='form-control form-control-border' name='calle' placeholder='Calle Ocho 585, of 207' onChange={handleChange} />
								
							</div>
						</div>

						<div className='col-6'>
							<div className='form-group'>
								<label>{txt.lblCiudad}</label>
								<input type='text' className='form-control form-control-border' name='ciudad' placeholder='Santiago' onChange={handleChange} />
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
