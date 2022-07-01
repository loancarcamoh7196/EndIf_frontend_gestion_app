/**
 * * Formulario de Usuarios
 * ? Para agregar y Editar
 */
import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Switch from 'react-switch';
import { universal, user } from '../utils/textModAdmin';

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

  const empresas = useSelector((store)=> store.empresas.list); //Valores para Select de Empresas
	let roles = useSelector((store)=> store.roles.list); // Valores para Select Roles

  // ejecucion de metodo al renderizar pagina
  useEffect(() => { 
    dispatch(getEmpresasAction()); // Recupera al cargar datos de empresas
    dispatch(getRolesAction()); // Recupera al cargar datos de roles
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
      // document.getElementsByName('pass').value = ''; 
      // document.getElementsByName('pass2').value = ''; 
    }else delete form.pass2
    return isCorrect;
  };
	
	/**
	 * * Manejador de Actualizar Producto
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
	 * * Manejador para Agregar Producto
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
		if(e == typeof boolean) {
			setForm({...form, 'activo': isCheckActiva});
			return;
		}else {
			const target = e.target;
			const value = (target.type === 'checkbox' ? target.checked : target.value);
			const name = target.name;
			setForm({  ...form, [name]: value });
		}
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
                className='form-control form-control-border'
                name='username'
                placeholder={user.plhld.username}
                onChange={handleChange}
                value={form.username}
                maxLength={30} 
                required
              />
            </div>
          {(!formNewUsuario) && 
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
                className='form-control form-control-border'
                name='pass'
                placeholder={user.plhld.pass}
                onChange={handleChange}
                value={form.pass}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='pass2'>{user.lbl.pass2}</label>
              <input 
                type='password'
                className='form-control form-control-border'
                name='pass2'
                placeholder={user.plhld.pass}
                onChange={handleChange}
                value={form.pass2}
                required
              />
            </div>
            </Fragment>
          }  
            
          </div>
          <div className='col-sm-6'>
            <div className='form-group'>
              <label htmlFor='nombres'>{user.lbl.nombres}</label>
              <input
                type='text'
                className='form-control form-control-border'
                name='nombres'
                placeholder={user.plhld.nombres}
                onChange={handleChange}
                value={form.nombres}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='apellidos'>{user.lbl.apellidos}</label>
              <input
                type='text'
                className='form-control form-control-border'
                name='apellidos'
                placeholder={user.plhld.apellidos}
                onChange={handleChange}
                value={form.apellidos}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>{user.lbl.email}</label>
              <input
                type='email'
                className='form-control form-control-border'
                name='email'
                placeholder={user.plhld.email}
                onChange={handleChange}
                value={form.email}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='porcentajeDcto'>{user.lbl.porcentajeDcto}</label>
              <input
                type='number'
                className='form-control form-control-border'
                name='porcentajeDcto'
                placeholder={user.lbl.porcentajeDcto}
                onChange={handleChange}
                value={form.porcentajeDcto}
                required
              />
            </div>
          </div>
          <div className='col-sm-12'>
            <div className='form-group'>
              <label htmlFor='react-switch' className='mb-3 mr-2'>{user.lbl.activo}</label>
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
                className='form-control select2 hidden'
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
