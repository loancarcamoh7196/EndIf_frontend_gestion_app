/**
 * * Formulario de Companies - Empresas
 * ? Para agregar y Editar
 */
import { useState, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { universal } from '@utils/texts/general';
import { company } from '@utils/texts/modAdmin';
import '@styles/Form.scss';

//* Componentes externo
import Card from '@common/Card';

//* Redux ~ Duck necesarios
import { addEmpresaAction, updateEmpresaAction } from '@redux/empresasDuck';
import { getRegionesAction } from '@redux/regionesDuck';
import { getComunasAction } from '@redux/comunasDuck';

export default function FormEmpresa({ formNewEmpresa = true, empresaForm }) {
	const params = useParams(); // Acceso a params de la URL
	const dispatch = useDispatch(); //Disparador
	const navigate = useNavigate(); // Navegador de Pagina

	//* Manejo de Checkbox
	const [isCheckActiva, setIsCheckActiva] = useState(true);
	const [changeDireccion, setChangeDireccion] = useState(false);

  const regiones = useSelector((store)=> store.regiones.list); //Valores para Select de Regiones
	let comunas = useSelector((store)=> store.comunas.list); // Valores para Select Comunas

  useEffect(() => {
    dispatch(getRegionesAction()); // Recupera al cargar datos de regiones
		if (!formNewEmpresa) {
			regiones.filter( i=> (i.comunas.map(e => e.id === form.comunaId  &&  dispatch(getComunasAction({regionId: i.id, comunas: i.comunas})))));
		}
  }, [regiones]);

	//* Almacenamiento de Datos formulario
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

	//* State
	const [validation, setValidation] = useState({
		rut: true,
		razonSocial: true,
		giro: true,
		fono: true,
		email: true,
		logo: true,   
		activa: true,
		regionId: true,
		comunaId: true,
		calle: true,
		ciudad: true
	});

	const validacion = (campo) => {
		const regex = /^(\d{1,2}(\d{3}){2}-[\dkK])$/;
		const _fono = /^(\+?56)?(\s?)[98765432]\d{8}$/mg;
		const _email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
		// console.log(campo)

		if (campo.nombre === 'rut') {
			(campo.valor.length > 0 && campo.valor.length <=10 && regex.test(campo.valor)) ? setValidation({...validation, rut: true}) : setValidation({...validation, rut: false});
		}else if (campo.nombre === 'razonSocial' ){
			(campo.valor.length >= 3 && campo.valor.length <=30 ) ? setValidation({...validation, razonSocial: true}) : setValidation({...validation, razonSocial: false});
		}else if (campo.nombre === 'giro') {
			(campo.valor.length >= 3 && campo.valor.length <=50 ) ? setValidation({...validation, giro: true}) : setValidation({...validation, giro: false});
		}else if (campo.nombre === 'fono'){
			(campo.valor.length <=13 && _fono.test(campo.valor)) ? setValidation({...validation, fono: true}) : setValidation({...validation, fono: false});
		}else if (campo.nombre === 'email'){
			(campo.valor.length <=50 && _email.test(campo.valor)) ? setValidation({...validation, email: true}) : setValidation({...validation, email: false});
		}else if (campo.nombre === 'calle'){
			(campo.valor.length <=30) ? setValidation({...validation, calle: true}) : setValidation({...validation, calle: false});
		}else if (campo.nombre === 'ciudad'){
			(campo.valor.length <=30 ) ? setValidation({...validation, ciudad: true}) : setValidation({...validation, ciudad: false});
		}
		else  return false;
	}

	const handleComunas = async(e) =>{
		const target = e.target; //* Dropdown completo
		// console.log(target);
		const value = target.value; //* Valor seleccionado
		// console.log(value);
		// const name = target.name; //Nombre dropdown

		// console.log(regiones);
		let reg = regiones.filter( i=> i.id == value);
		// console.log(reg);
		let region = reg[0];
		let comunas = region.comunas;

		// console.log(region);

		let options = { regionId: parseInt(value), comunas: comunas };
		dispatch(getComunasAction(options));
	}

	/**
	 * * Manejador de Actualizar Empresa
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => {
		// console.log('Entro en Editar')
		const rutAnt = params.rut; // Extraes ID de URL
		// console.log(rutAnt);
		// delete form.rut;
		// console.log('datos act: ',form);
		try {
			// console.log('Entro update');
			const { rut, razonSocial, giro, fono, email, logo, activa, moduloGestion, moduloContabilidad, moduloInventario, moduloInventarioMovil, direccionId, comunaId, calle, ciudad } = form;
			let dir = {};
			let emp = { razonSocial, giro, fono, email, logo, activa, moduloGestion, moduloContabilidad, moduloInventario, moduloInventarioMovil, direccionId };
			if (changeDireccion) dir = { id: direccionId, comunaId, calle, ciudad };
			const options = { rut: rutAnt, empresa: emp , direccion: dir };
			dispatch(updateEmpresaAction(options));
			navigate('/admin/empresas');
		} catch (error) {
			console.log(error);
			// setMessage('Falló la edición');
		}
		// console.log('Soy update');
	};

	/** 
	 * * Manejador para Agregar Empresa
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
		const target = e.target;
		const value = (target.type === 'checkbox' ? target.checked : target.value);
		const name = target.name;
		setForm({  ...form, [name]: value });
		validacion(form);
		// console.log(form);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		formNewEmpresa ? postData(form) : putData(form);
	};

	return (
	<Fragment>
	<form onSubmit={handleSubmit} >
		<Card style='card-default' haveTitle={true} title={company.title.secEmpresa}> 
			<div className='row'>
				<div className='col-sm-8'>
					<div className='form-group'>
						<label htmlFor='rut'>{company.lbl.rut}</label>
						<input 
							type='text' 
							className={`form-control form-control-border ${!validation.rut && 'is-invalid'}`} 
							name='rut' 
							placeholder={company.plhld.rut} 
							onChange={handleChange} 
							value={form.rut} 
							maxLength={10} 
							required
							disabled={formNewEmpresa ? false : true}
							onBlur={(e) => { validacion({nombre: 'rut', valor: e.target.value}) }}
						/>
						{!validation.rut && <span className='text-danger'>{company.txt.valRut}</span>}
					</div>

					<div className='form-group'>
						<label htmlFor='razonSocial'>{company.lbl.razonSocial}</label>
						<input
							type='text'
							className={`form-control form-control-border ${!validation.razonSocial && 'is-invalid'}`}
							name='razonSocial' 
							placeholder={company.plhld.razonSocial}
							onChange={handleChange} 
							value={form.razonSocial}
							maxLength={50}
							required
							onBlur={(e) => { validacion({nombre: 'razonSocial', valor: e.target.value}) }}
						/>
						{!validation.razonSocial && <span className='text-danger'>{company.txt.valRazonSocial}</span>}
					</div>

					<div className='form-group'>
						<label htmlFor='giro'>{company.lbl.giro}</label>
						<input
							type='text'
							className={`form-control form-control-border ${!validation.giro && 'is-invalid'}`}
							name='giro'
							placeholder={company.plhld.giro}
							onChange={handleChange}
							value={form.giro}
							maxLength={50}
							onBlur={(e) => { validacion({nombre: 'giro', valor: e.target.value}) }}
						/>
						{!validation.rut && <span className='text-danger'>{company.txt.valGiro}</span>}
					</div>

					<div className='form-group'>
						<label htmlFor='fono'>{company.lbl.fono}</label>
						<input 
							type='text'
							className={`form-control form-control-border ${!validation.fono && 'is-invalid'}`}
							name='fono'
							placeholder={company.plhld.fono}
							onChange={handleChange}
							value={form.fono}
							maxLength={12}
							required
							onBlur={(e) => { validacion({nombre: 'fono', valor: e.target.value}) }}
						/>
						{!validation.fono && <span className='text-danger'>{company.txt.valFono}</span>}
					</div>

					<div className='form-group'>
						<label htmlFor='email'>{company.lbl.email}</label>
						<input
						type='email'
						className={`form-control form-control-border ${!validation.email && 'is-invalid'}`}
						name='email'
						placeholder='Email'
						onChange={handleChange}
						value={form.email}
						minLength={5}
						maxLength={50}
						onBlur={(e) => { validacion({nombre: 'email', valor: e.target.value}) }}
						/>
						{!validation.email && <span className='text-danger'>{company.txt.valEmail}</span>}
					</div>

					{/* <div className='form-group'>
						<input type='file' className='form-control form-control-border' name='logo' placeholder='Logo' onChange={handleChange} />
					</div> */}
				</div>

				<div className='col-sm-4'>
					<div className='form-group'>
						<div className='custom-control custom-switch custom-switch-off-danger custom-switch-on-success'>
							<input
								type='checkbox'
								className='custom-control-input '
								id='activa'
								name='activa'
								onChange={handleChange}
							/>
							<label className='custom-control-label checkboxtext' for='activa'>{company.lbl.activa}</label>
						</div>
					</div>
					<div className=' form-group'>
						<h3 className='mt-5 mb-3 text-md'>{company.title.secModulo}</h3>

						<div className='icheck-pumpkin'>
							<input 
								type='checkbox' 
								name='moduloGestion' 
								id='moduloGestion' 
								onChange={handleChange} 
								defaultChecked={form.moduloGestion}
								value={form.moduloGestion}
							/>	
							<label htmlFor='moduloGestion'>{company.lbl.gestion}</label>
						</div>
						<div className='icheck-pumpkin'>
							<input 
							type='checkbox' 
							name='moduloContabilidad' 
							id='moduloContabilidad' 
							onChange={handleChange} 
							defaultChecked={form.moduloContabilidad}
							/>	
							<label htmlFor='moduloContabilidad'>{company.lbl.contabilidad}</label>
						</div>
						<div className='icheck-pumpkin'>
							<input 
								type='checkbox'
								name='moduloInventario'
								id='moduloInventario'
								onChange={handleChange}
								defaultChecked={form.moduloInventario} 
							/>
							<label htmlFor='moduloInventario'>{company.lbl.inventario}</label>
						</div>
							<div className='icheck-pumpkin'>
							<input type='checkbox'
								name='moduloInventarioMovil'
								id='moduloInventarioMovil'
								onChange={handleChange} 
								defaultChecked={form.moduloInventarioMovil} 
							/>
							<label htmlFor='moduloInventarioMovil'>{company.lbl.invMovil}</label>
						</div>
					</div>
					<hr/>
					{!formNewEmpresa && 
						<div className='form-group'>
							<div className='icheck-pumpkin'>
								<input 
									type='checkbox'
									id='changeDireccion'
									name='changeDireccion' 
									defaultChecked={changeDireccion}
									onClick={() => setChangeDireccion(!changeDireccion)} 
								/>
								<label htmlFor='changeDireccion'>{company.lbl.changeDireccion}</label>
							</div>
						</div>
					}
				</div>
				{ !formNewEmpresa && <input type='hidden' name='direccionId' value={form.direccionId} /> }
			</div>
		</Card>
		
		{(changeDireccion || formNewEmpresa) && 
			<Card style='card-default' haveTitle={true} title={company.title.secDireccion}> 
				<div className='row'>
					<div className='col-md-12'>
						<div className='form-group'>
							<label>{company.lbl.region}</label>
							<select
								name='regionId' 
								className='form-control select2'
								// { !formNewEmpresa && onload={}}
								onChange={handleChange}
								onClick={handleComunas}
							>
								<option disabled selected={(!formNewEmpresa)&& 'selected'}>{company.slct.region}</option>
								{ (regiones.length > 0) && regiones.map((i) => <option value={i.id} selected={(i.comunas.map(e => e.id === form.comunaId)) && 'selected'}>{i.nombre}</option>) }
							</select>
						</div>

						<div className='form-group' >
						<label>{company.lbl.comuna}</label>
							<select id='comunaId' name='comunaId' className='form-control select2' onChange={handleChange} >
								<option disabled selected={(!formNewEmpresa)&& 'selected'} >{company.slct.comuna}</option>
								{(comunas.length > 0 )&& comunas.map((i)=> <option value={i.id} selected={(!formNewEmpresa && i.id == form.comunaId) && 'selected'} >{i.nombre}</option>)}
							</select>
						</div>
					</div>	

					<div className='col-6'>
						<div className='form-group'>
							<label>{company.lbl.calle}</label>
							<input
								type='text'
								className={`form-control form-control-border ${!validation.calle && 'is-invalid'}`}
								name='calle'
								placeholder={company.plhld.calle}
								onChange={handleChange} 
								value={form.calle}
								required
								maxLength={30}
								onBlur={(e) => { validacion({nombre: 'calle', valor: e.target.value}) }}
							/>
							{!validation.calle && <span className='text-danger'>{company.txt.valCalle}</span>}
						</div>
					</div>

					<div className='col-6'>
						<div className='form-group'>
							<label>{company.lbl.ciudad}</label>
							<input
								type='text'
								className={`form-control form-control-border ${!validation.ciudad && 'is-invalid'}`}
								name='ciudad'
								placeholder={company.plhld.ciudad}
								onChange={handleChange}
								value={form.ciudad}
								maxLength={30}
								onBlur={(e) => { validacion({nombre: 'ciudad', valor: e.target.value}) }}
							/>
							{!validation.ciudad && <span className='text-danger'>{company.txt.valCiudad}</span>}
						</div>
					</div>
				</div>
			</Card>
		}
		<div className='col-12 mt-5'>
			<input type='submit' className='btn btn-outline-success btn-block' value={formNewEmpresa ? company.btn.agregar : company.btn.editar}/>
			<Link to='/admin/empresas' className='btn btn-outline-danger btn-block' >{universal.btn.volver}</Link>
		</div>
	</form>
	</Fragment>
	);
}
