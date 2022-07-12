/**
 * * Formulario de Tienda
 * ? Para agregar y Editar
 */
import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Switch from 'react-switch';
import { universal, shop, toastOptions } from '../utils/textModGestion';

// Componentes propios
import Card from '@common/Card';

// Redux ~ Duck necesarios
import { addTiendaAction, updateTiendaAction } from '@redux/tiendasDuck';


export default function FormTienda({ formNewTienda = true, rolForm }) {
	const params = useParams(); // Acceso a params de la URL
	const dispatch = useDispatch(); //Disparador
	const navigate = useNavigate(); // Navegador de Pagina

	// Manejo de Checkbox
	const [isCheckActiva, setIsCheckActiva] = useState(true);
	const [changePass, setChangePass] = useState(false);

  const empresas = useSelector((store)=> store.empresas.list); //Valores para Select de Empresas
	// let roles = useSelector((store)=> store.roles.list); // Valores para Select Roles

  // ejecucion de metodo al renderizar pagina
  // useEffect(() => { }, []);

  const [validation, setValidation] = useState({
		nombre: true
	});

	const validacion = (campo) => {
		const _names = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/gm;
		// console.log(campo)

		if (campo.nombre === 'nombre') {
			(campo.valor.length >=4 && campo.valor.length <=30 && _names.test(campo.valor)) ? setValidation({...validation, nombre: true}) : setValidation({...validation, nombre: false});
		} else  return false;
	}

	// Almacenamiento de Datos formulario
	const [form, setForm] = useState({
    id: rolForm.id,
		nombre: rolForm.nombre,
		empresaRut: rolForm.empresaRut,
		direccionId: rolForm.direccionId,
	});
	
	/**
	 * * Manejador de Actualizar Rol
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => { 
		// console.log('Entro en Editar');
    delete form.id;
		const { id } = params; // Extraer ID de URL
		try {
			// console.log('Entro update');

			const options = { id, body: form };
			dispatch(updateTiendaAction(options));
			navigate('/admin/roles');
		} catch (error) {
			console.log(error);
			// setMessage('Falló la edición');
		}
		// console.log('Soy update');
	};

	/** 
	 * * Manejador para Agregar Rol
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {	
      delete form.id;
      dispatch(addTiendaAction({body: form}));
      navigate('/admin/roles');
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
		// console.log(form);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		formNewTienda ? postData(form) : putData(form);
	};

	return (
    <Fragment>
    <form id='formulario' onSubmit={handleSubmit} >
      <Card style='card-default' haveTitle={false} title='prueba'> 
        <div className='row'>
          <div className='col-sm-7'>
            { (!formNewTienda) && 
              <div className='form-group'>
                <label htmlFor='id'>{shop.lbl.id}</label>
                <input 
                  type='number'
                  className='form-control form-control-border'
                  name='id'
                  value={form.id}
                  disabled
                />
              </div>  
            }
            <div className='form-group'>
              <label htmlFor='nombre'>{role.lbl.nombre}</label>
              <input 
                type='text'
                className={`form-control form-control-border ${!validation.nombre && 'is-invalid'}`} 
                id='nombre'
                name='nombre'
                placeholder={role.plhld.nombre}
                onChange={handleChange}
                value={form.nombre}
                describedby='nombreError'
                maxLength={30} 
                required
                onBlur={(e) => { validacion({nombre: 'nombre', valor: e.target.value}) }}
              />
              {!validation.nombre && <span className='text-danger'>{role.txt.valNombre}</span>}
            </div>
          </div>
          <div className='col-sm-5'>
            <div className='form-group'>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='accesoGestion' 
									id='accesoGestion' 
									onChange={handleChange} 
									defaultChecked={form.accesoGestion}
                />
                <label htmlFor='accesoGestion'>{role.lbl.accesoGestion}</label>
              </div>
            </div>
            <div className='form-group'>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='accesoPv' 
									id='accesoPv' 
									onChange={handleChange} 
									defaultChecked={form.accesoPv}
                />
                <label htmlFor='accesoPv'>{role.lbl.accesoPv}</label>
              </div>
            </div>
            <div className='form-group'>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='accesoContabilidad' 
									id='accesoContabilidad' 
									onChange={handleChange} 
									defaultChecked={form.accesoContabilidad}
                />
                <label htmlFor='accesoContabilidad'>{role.lbl.accesoContabilidad}</label>
              </div>
            </div>
            <div className='form-group'>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='accesoInventario' 
									id='accesoInventario' 
									onChange={handleChange} 
									defaultChecked={form.accesoInventario}
                />
                <label htmlFor='accesoInventario'>{role.lbl.accesoInventario}</label>
              </div>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='accesoInventarioMovil' 
									id='accesoInventarioMovil' 
									onChange={handleChange} 
									defaultChecked={form.accesoInventarioMovil}
                />
                <label htmlFor='accesoInventarioMovil'>{role.lbl.accesoInventarioMovil}</label>
              </div>
            </div>  
          </div> 
        
          <div className='col-12 mt-5'>
            <input type='submit' className='btn btn-outline-success btn-block' value={formNewTienda ? shop.btn.agregar : shop.btn.editar} />
            <Link to='/admin/roles' className='btn btn-outline-danger btn-block' >{universal.btn.volver}</Link>
          </div>
        </div>
      </Card>
    </form>
    </Fragment>
	);
}
