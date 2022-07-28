/**
 * * Formulario de Familia
 * ? Para agregar y editar
 */
import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { shop, family } from '../../utils/texts/modGestion';
import { universal, toastOptions } from '../../utils/texts/general';
//* Componentes propios
import Card from '@common/Card';
//* Redux ~ Duck necesarios
import { addFamiliaAction, updateFamiliaAction } from '@redux/familiasDuck';
import { getEmpresasAction } from '@redux/empresasDuck';

export default function FormFamily({ formNewFamily = true, familyForm }) {
	const params = useParams(); // Acceso a params de la URL
	const dispatch = useDispatch(); //Disparador
	const navigate = useNavigate(); // Navegador de Pagina

	// Manejo de Checkbox
	const [isCheckActiva, setIsCheckActiva] = useState(true);
	const [changePass, setChangePass] = useState(false);

  const empresas = useSelector((store)=> store.empresas.list); //Valores para Select de Empresas
	let roles = useSelector((store)=> store.roles.list); // Valores para Select Roles

  //? Ejecución de metodo al renderizar pagina
  useEffect(() => {
    dispatch(getEmpresasAction())
  }, []);

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

	//? Almacenamiento de Datos formulario
	const [form, setForm] = useState({
    id: familyForm.id,
		nombre: familyForm.nombre,
		empresaRut: familyForm.empresaRut
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
			dispatch(updateFamiliaAction(options));
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
      dispatch(addFamiliaAction({body: form}));
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
		formNewFamily ? postData(form) : putData(form);
	};

	return (
    <Fragment>
    <form id='formulario' onSubmit={handleSubmit} >
      <Card style='card-default' haveTitle={false} title='prueba'> 
        <div className='row'>
          <div className='col-sm-7'>
            { (!formNewFamily) && 
              <div className='form-group'>
                <label htmlFor='id'>{family.lbl.id}</label>
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
              <label htmlFor='nombre'>{family.lbl.nombre}</label>
              <input 
                type='text'
                className={`form-control form-control-border ${!validation.nombre && 'is-invalid'}`} 
                id='nombre'
                name='nombre'
                placeholder={family.plhld.nombre}
                onChange={handleChange}
                value={form.nombre}
                describedby='nombreError'
                maxLength={30} 
                required
                onBlur={(e) => { validacion({nombre: 'nombre', valor: e.target.value}) }}
              />
              {!validation.nombre && <span className='text-danger'>{family.txt.valNombre}</span>}
            </div>
          </div>
          <div className='col-sm-5'>
            <div className='form-group'>
              <label>{shop.lbl.empresa}</label>
              <select
                name='empresaRut' 
                className='form-control select2'
                onChange={handleChange}
                required
              >
                <option disabled='disabled' selected={formNewFamily && 'selected'} value=''>{shop.slct.empresa} </option>
                {(empresas.length > 0) && empresas.map((i) => <option value={i.rut} selected={i.rut === form.empresaRut && 'selected'}>[{i.rut}] - {i.razonSocial}</option>)}
              </select>  
            </div>
          </div> 
        
          <div className='col-12 mt-5'>
            <input type='submit' className='btn btn-outline-success btn-block' value={formNewFamily ? family.btn.agregar : family.btn.editar} />
            <Link to='/familias' className='btn btn-outline-danger btn-block' >{universal.btn.volver}</Link>
          </div>
        </div>
      </Card>
    </form>
    </Fragment>
	);
}
