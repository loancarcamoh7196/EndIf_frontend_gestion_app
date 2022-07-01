/**
 * * Formulario de Companies - Empresas
 * ? Para agregar y Editar
 */
import { useState, useRouter, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { universal, company } from '../utils/textModAdmin'
import Switch from 'react-switch';
import '@styles/Form.scss';

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
	const [isCheckActiva, setIsCheckActiva] = useState(true);
	const [isCheckGestion, setIsCheckGestion] = useState(false);



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
		if(e == typeof boolean) {
			setForm({...form, 'activa': isCheckActiva});
			return;
		}else {
			const target = e.target;
			const value = (target.type === 'checkbox' ? target.checked : target.value);
			const name = target.name;
			setForm({  ...form, [name]: value });
		}
		console.log(form);
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
								className='form-control form-control-border' 
								name='rut' 
								placeholder={company.plhld.rut} 
								onChange={handleChange} 
								value={form.rut} 
								maxLength={10} 
								required
								pattern='^\d{1,2}\d{3}\d{3}$'
								title = 'El formato debe se 12123123'
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='razonSocial'>{company.lbl.razonSocial}</label>
							<input
								type='text'
								className='form-control form-control-border'
								name='razonSocial' 
								placeholder={company.plhld.razonSocial}
								onChange={handleChange} 
								value={form.razonSocial}
								maxLength={50}
								required
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='giro'>{company.lbl.giro}</label>
							<input
								type='text'
								className='form-control form-control-border'
								name='giro'
								placeholder={company.plhld.giro}
								onChange={handleChange}
								value={form.giro}
								maxLength={50}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='fono'>{company.lbl.fono}</label>
							<input 
								type='text'
								className='form-control form-control-border'
								name='fono'
								placeholder={company.plhld.fono}
								onChange={handleChange}
								value={form.fono}
								maxLength={10}
								required
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='email'>{company.lbl.email}</label>
							<input
							type='email'
							className='form-control form-control-border'
							name='email'
							placeholder='Email'
							onChange={handleChange}
							value={form.email}
							minLength={5}
							maxLength={50}
							/>
						</div>

						{/* <div className='form-group'>
							<input type='file' className='form-control form-control-border' name='logo' placeholder='Logo' onChange={handleChange} />
						</div> */}
					</div>

					<div className='col-sm-4'>
						<div className='form-group'>
							<label htmlFor='react-switch'>Activa</label>
							<Switch
								className='react-switch'
								id='small-radius-switch'
								onChange={(e) => {
									setIsCheckActiva(!isCheckActiva)		
									handleChange(e)
								}}
								checked={isCheckActiva}
								// required
								height={40}
    						width={70}
								borderRadius={6}
    						activeBoxShadow='0px 0px 1px 2px #fffc35'
							/>
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
								/>	
								<label htmlFor='moduloGestion'>{txt.lblGestion}</label>
							</div>
							<div className='icheck-pumpkin'>
								<input 
								type='checkbox' 
								name='moduloContabilidad' 
								id='moduloContabilidad' 
								onChange={handleChange} 
								defaultChecked={form.moduloContabilidad}
								/>	
								<label htmlFor='moduloContabilidad'>{txt.lblContabilidad}</label>
							</div>
							<div className='icheck-pumpkin'>
								<input 
									type='checkbox'
									name='moduloInventario'
									id='moduloInventario'
									onChange={handleChange}
									defaultChecked={form.moduloInventario} 
								/>
								<label htmlFor='moduloInventario'>{txt.lblInventario}</label>
							</div>
								<div className='icheck-pumpkin'>
								<input type='checkbox'
									name='moduloInventarioMovil'
									id='moduloInventarioMovil'
									onChange={handleChange} 
									defaultChecked={form.moduloInventarioMovil} 
								/>
								<label htmlFor='moduloInventarioMovil'>{txt.lblInventarioMovil}</label>
							</div>
						</div>
					</div>
					{ !formNewEmpresa && <input type='hidden' name='direccionId' value={form.direccionId} /> }
				</div>
			</Card>

			<Card style='card-default' haveTitle={true} title={company.title.secModulo}> 
				<div className='row'>
					<div className='col-md-12'>
						<div className='form-group'>
							<label>{company.lbl.region}</label>
							<select
								name='regionId' 
								className='form-control select2'
								// { !formNewEmpresa && onload={}}
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
								<option disabled selected={(!formNewEmpresa)&& 'selected'}>{company.slct.region}</option>
								{ (regiones.length > 0) && regiones.map((i) => <option value={i.id} selected={i.id === form.regionId && 'selected'}>{i.nombre}</option>) }
							</select>
						</div>

						<div className='form-group' >
						<label>{company.lbl.comuna}</label>
							<select id='comunaId' name='comunaId' className='form-control select2 hidden' onChange={handleChange} >
								<option disabled selected={(!formNewEmpresa)&& 'selected'} >{company.slct.comuna}</option>
								{(comunas.length > 0 )&& comunas.map((i)=> <option value={i.id} >{i.nombre}</option>)}
							</select>
						</div>
					</div>	

					<div className='col-6'>
						<div className='form-group'>
							<label>{company.lbl.calle}</label>
							<input
								type='text'
								className='form-control form-control-border'
								name='calle'
								placeholder={company.plhld.calle}
								onChange={handleChange} 
								value={form.calle}
								required
								maxLength={30}
							/>
						</div>
					</div>

					<div className='col-6'>
						<div className='form-group'>
							<label>{company.lbl.ciudad}</label>
							<input
								type='text'
								className='form-control form-control-border'
								name='ciudad'
								placeholder={company.plhld.ciudad}
								onChange={handleChange}
								value={form.ciudad}
								maxLength={30}
							/>
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
