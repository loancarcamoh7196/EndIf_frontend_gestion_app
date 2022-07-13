/**
 * * Formulario de Usuarios
 * ? Para agregar y Editar
 */
import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
// import Switch from 'react-switch';
// import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import endPoints from '@services/api';
import { universal, user } from '../../utils/textModAdmin';

// Componentes propios
import Card from '@common/Card';

// Redux ~ Duck necesarios
import { addUsuarioAction, updateUsuarioAction } from '@redux/usuariosDuck';
import { getEmpresasAction } from '@redux/empresasDuck';
import { getRolesAction } from '@redux/rolesDuck';


// Opciones Toast
const toastOptions = {
	position: 'top-right',
	autoClose: 8000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

export default function FormUsuario({ formNewUsuario = true, usuarioForm }) {
	const params = useParams(); // Acceso a params de la URL
	const dispatch = useDispatch(); //Disparador
	const navigate = useNavigate(); // Navegador de Pagina

	// Manejo de Checkbox
	const [isCheckActiva, setIsCheckActiva] = useState(true);
	const [changePass, setChangePass] = useState(false);
  const [valUsername, setValUsername] = useState(false);

  const empresas = useSelector((store)=> store.empresas.list); //Valores para Select de Empresas
	let roles = useSelector((store)=> store.roles.list); // Valores para Select Roles

  const [validation, setValidation] = useState({
		username: true,
		pass: true,
    pass2: true,
		nombres: true,
		apellidos: true,
		email: true,   
		porcentajeDcto: true,
		empresaRut: true,
		rolesId: true,
		activo: true
	});

	const validacion = (campo) => {
		const _rut = /^(\d{1,2}(\d{3}){2}-[\dkK])$/;
		const _fono = /^(\+?56)?(\s?)[98765432]\d{8}$/mg;
		const _email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const _username = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/mg;
    const _names = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/gm;
    const _pass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/gm;

		// console.log(campo);
    // console.log(validation);

		if (campo.nombre === 'username') {
			(campo.valor.length > 0 && campo.valor.length <=30 && _username.test(campo.valor)) ? setValidation({...validation, username: true}) : setValidation({...validation, username: false});
		}else if (campo.nombre === 'nombres' ){
			(campo.valor.length >= 3 && campo.valor.length <=30 && _names.test(campo.valor)) ? setValidation({...validation, nombres: true}) : setValidation({...validation, nombres: false});
		}else if ((campo.nombre === 'pass' && _pass.test(campo.valor)) || (campo.nombre === 'pass2' && _pass.test(campo.valor))) {
			(campo.valor.length >= 5 && campo.valor.length <=50 ) ? setValidation({...validation, pass: true, pass2: true}) : setValidation({...validation, pass: false, pass2: false});
		}else if (campo.nombre === 'apellidos'){
			(campo.valor.length <=20 && _names.test(campo.valor)) ? setValidation({...validation, apellidos: true}) : setValidation({...validation, apellidos: false});
		}else if (campo.nombre === 'email'){
			(campo.valor.length <=50 && _email.test(campo.valor)) ? setValidation({...validation, email: true}) : setValidation({...validation, email: false});
		}else if (campo.nombre === 'porcentajeDcto' && campo.valor <=100 ){  
			(campo.valor.length <=3) ? setValidation({...validation, porcentajeDcto: true}) : setValidation({...validation, porcentajeDcto: false});
		}else  return false;
	}

  const passRef = useRef(null);
  const pass2Ref = useRef(null);

  // ejecucion de metodo al renderizar pagina
  useEffect(() => { 
    dispatch(getEmpresasAction()); // Recupera al cargar datos de empresas
    dispatch(getRolesAction()); // Recupera al cargar datos de roles
    console.log(form.activo)
  }, []);

	// Almacenamiento de Datos formulario
	const [form, setForm] = useState({
		username: usuarioForm.username,
		pass: usuarioForm.pass,
		pass2: usuarioForm.pass2,
		nombres: usuarioForm.nombres,
    apellidos: usuarioForm.apellidos,
		email: usuarioForm.email,  
		activo: usuarioForm.activo,
		porcentajeDcto: usuarioForm.porcentajeDcto,
		empresaRut: usuarioForm.empresaRut,
		rolesId: usuarioForm.rolesId
	});
	
  // Valida contraseña y setea campos
  const validarPassword = (pass, pass2) => {
    const isCorrect = (pass === pass2);
    if(!isCorrect){
      toast.error('Contraseña no coinciden',{...toastOptions});
      passRef.current.value = '';
      pass2Ref.current.value = '';
    }else delete form.pass2
    return isCorrect;
  };

  // ** Validación de username
  const validarUsername = async (e) => {
    const valor = e.target.value;
    try {
      const API = endPoints.usuarios.confirmUsername(valor);
      const res = await axios.post(API);
      // console.log(res)
      setValUsername(true);
    } catch(error) {
      // console.log(error);
      setValUsername(false);
    };
  };
	
	/**
	 * * Manejador de Actualizar Usuario
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => { 
		// console.log('Entro en Editar')
		const { id } = params; // Extraer ID de URL
		try {
			// console.log('Entro update');
      if(!changePass){
        delete form.pass;      
        delete form.pass2;
      }
      const valPass = validarPassword(form.pass, form.pass2);
      if(!valPass) return;

      // validation.map(e => console.log(e));

			const options = { id, body: form };
			dispatch(updateUsuarioAction(options));
			navigate('/admin/usuarios');
		} catch (error) {
			console.log(error);
			// setMessage('Falló la edición');
		}
		// console.log('Soy update');
	};

	/** 
	 * * Manejador para Agregar Usuario
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {	
      // console.log('Entro en Agregar');
      const valPass = validarPassword(form.pass, form.pass2);
      if(!valPass) return;
      dispatch(addUsuarioAction({body: form}));
      navigate('/admin/usuarios');
		} catch (error) {
			// setMessage('Falló la edición');
      console.log(error);
		}
		// console.log('Soy Agregar');
	};

	const handleChange = (e) => {
		// if(e == typeof boolean) {
		// 	setForm({...form, 'activo': isCheckActiva});
		// 	return;
		// }else {
      // console.log(e);
			const target = e.target;
			const value = (target.type === 'checkbox' ? target.checked : target.value);
			const name = target.name;
			setForm({  ...form, [name]: value });
		// }
    console.log(value);
		// console.log(form);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		formNewUsuario ? postData(form) : putData(form);
	};

	return (
    <Fragment>
    <form onSubmit={handleSubmit} >
      <Card style='card-default' haveTitle={false} title='prueba'> 
        <div className='row'>
          <div className='col-sm-6'>
            <div className='form-group'>
              <label htmlFor='username'>{user.lbl.username}</label>
              <input 
                type='text'
                className={`form-control form-control-border ${!validation.username && 'is-invalid'}`} 
                name='username'
                placeholder={user.plhld.username}
                onChange={handleChange}
                value={form.username}
                maxLength={30} 
                required
                onBlur={(e) => {
                  validacion({nombre: 'username', valor: e.target.value});
                  validarUsername(e);
                }}
              />
              {!validation.username && <span className='text-danger'>{user.txt.valUsername}</span>}
              {valUsername && <span className='text-danger'>{user.txt.valUsername2}</span>}
            </div>
          {(!formNewUsuario) &&  // Opcion modificar contraseña, para editar
            <div className='form-group'>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  id='changePass'
                  name='changePass' 
                  defaultChecked={changePass}
                  onClick={() => setChangePass(!changePass)} 
                />
                <label htmlFor='changePass'>{user.lbl.changePass}</label>
              </div>
            </div>  
          }
          {( formNewUsuario || changePass )&&
            <Fragment>
              <div className='form-group'>
              <label htmlFor='pass'>{user.lbl.pass}</label>
              <input 
                type='password'
                className={`form-control form-control-border ${!validation.pass && 'is-invalid'}`} 
                name='pass'
                placeholder={user.plhld.pass}
                onChange={handleChange}
                value={form.pass}
                required
                onBlur={(e) => { validacion({nombre: 'pass', valor: e.target.value}) }}
                ref={passRef}
              />
              {!validation.pass && <span className='text-danger'>{user.txt.valPass}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='pass2'>{user.lbl.pass2}</label>
              <input 
                type='password'
                className={`form-control form-control-border ${!validation.pass2 && 'is-invalid'}`} 
                name='pass2'
                placeholder={user.plhld.pass}
                onChange={handleChange}
                value={form.pass2}                                          
                required
                onBlur={(e) => { validacion({nombre: 'pass2', valor: e.target.value}) }}
                ref={pass2Ref}
              />
              {!validation.pass2 && <span className='text-danger'>{user.txt.valPass2}</span>}
            </div>
            </Fragment>
          }  
            
          </div>
          <div className='col-sm-6'>
            <div className='form-group'>
              <label htmlFor='nombres'>{user.lbl.nombres}</label>
              <input
                type='text'
                className={`form-control form-control-border ${!validation.nombres && 'is-invalid'}`} 
                name='nombres'
                placeholder={user.plhld.nombres}
                onChange={handleChange}
                value={form.nombres}
                required
                onBlur={(e) => { validacion({nombre: 'nombres', valor: e.target.value}) }}
              />
              {!validation.nombres && <span className='text-danger'>{user.txt.valNombres}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='apellidos'>{user.lbl.apellidos}</label>
              <input
                type='text'
                className={`form-control form-control-border ${!validation.apellidos && 'is-invalid'}`} 
                name='apellidos'
                placeholder={user.plhld.apellidos}
                onChange={handleChange}
                value={form.apellidos}
                required
                onBlur={(e) => { validacion({nombre: 'apellidos', valor: e.target.value}) }}
              />
              {!validation.apellidos && <span className='text-danger'>{user.txt.valApellidos}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='email'>{user.lbl.email}</label>
              <input
                type='email'
                className={`form-control form-control-border ${!validation.email && 'is-invalid'}`} 
                name='email'
                placeholder={user.plhld.email}
                onChange={handleChange}
                value={form.email}
                onBlur={(e) => { validacion({nombre: 'email', valor: e.target.value}) }}
              />
              {!validation.email && <span className='text-danger'>{user.txt.valEmail}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor='porcentajeDcto'>{user.lbl.porcentajeDcto}</label>
              <input
                type='number'
                className={`form-control form-control-border ${!validation.porcentajeDcto && 'is-invalid'}`} 
                name='porcentajeDcto'
                placeholder={user.lbl.porcentajeDcto}
                onChange={handleChange}
                value={form.porcentajeDcto}
                min='1' max='100'
                required
                onBlur={(e) => { validacion({nombre: 'porcentajeDcto', valor: e.target.value}) }}
              />
              {!validation.porcentajeDcto && <span className='text-danger'>{user.txt.valPorcentajeDcto}</span>}
            </div>
          </div>
          <div className='col-sm-12'>
            <div className='form-group'>
              <div className='custom-control custom-switch custom-switch-off-danger custom-switch-on-success'>
                <input
                  type='checkbox'
                  className='custom-control-input '
                  id='activo'
                  name='activo'
                  onChange={handleChange}
                />
                <label className='custom-control-label checkboxtext' for='activo'>{user.lbl.activo}</label>
              </div>
            </div>
          </div> 
          <div className='col-md-6'>
            <div className='form-group'>
              <label>{user.lbl.empresa}</label>
              <select
                name='empresaRut' 
                className='form-control select2'
                onChange={handleChange}
                required
              >
                <option disabled='disabled' selected={formNewUsuario && 'selected'} value=''>{user.slct.empresa} </option>
                {(empresas.length > 0) && empresas.map((i) => <option value={i.rut} selected={i.rut === form.empresaRut && 'selected'}>{i.razonSocial}</option>)}
              </select>
            </div>  
          </div>  
          <div className='col-md-6'>
            <div className='form-group' >
              <label>{user.lbl.roles}</label>
              <select
                id='rolesId'
                name='rolesId'
                className='form-control select2'
                onChange={handleChange} 
                required
              >
                <option disabled selected={formNewUsuario && 'selected'}>{user.slct.roles}</option>
                {(roles.length > 0 )&& roles.map((i)=> <option value={i.id} selected={i.id === form.rolesId && 'selected'} >{i.nombre}</option>)}
              </select> 
            </div>
          </div>	
          <div className='col-12 mt-5'>
            <input type='submit' className='btn btn-outline-success btn-block' value={formNewUsuario ? user.btn.agregar : user.btn.editar} />
            <Link to='/admin/usuarios' className='btn btn-outline-danger btn-block' >{universal.btn.volver}</Link>
          </div>
        </div>
      </Card>
    </form>
    </Fragment>
	);
}
