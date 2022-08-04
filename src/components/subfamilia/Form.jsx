/**
 * * Componente Subfamilia ~ Form
 * ? ubicado en: /subfamilias/:id
 */
import React, { Fragment, useEffect, useState } from 'react';
import {Link, use} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//* Textos
import { subfamily } from '../../utils/texts/modGestion';
import { universal, toastOptions } from '../../utils/texts/general';
//* Redux
import { addSubFamiliaAction, updateSubFamiliaAction } from '@redux/subFamiliasDuck';


export default function FormSubFamilia({subfamilyForm, formNewSubFamily=true }) {
  const dispatch = useDispatch();

  // const empresaSession = useSelector(store => store.auth.empresaSession);
  
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
    id: subfamilyForm.id,
		nombre: subfamilyForm.nombre,
		familiaId: subfamilyForm.familiaId
	});
	
	/**
	 * * Manejador de Actualizar Rol
	 * @param {element} form campos formulario
	 */
	const putData = async (id,form) => { 
		// console.log('Entro en Editar');
    delete form.id;
		// const { id } = params; // Extraer ID de URL
		try {
			// console.log('Entro update');

			const options = { id, body: form };
			dispatch(updateSubFamiliaAction(options));
			// navigate('/familias');
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
			console.log(form)
      delete form.id;
      dispatch(addSubFamiliaAction({body: form}));
      // navigate('/familias');
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
		console.log(form);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		formNewSubFamily ? postData(form) : putData(form);
	};


  return (
    <Fragment>
      <form id='formulario' onSubmit={handleSubmit} >
        <div className='form-group'>
          <label htmlFor='_familiaId'>{subfamily.lbl.familiaId}</label>
          <span name='_familiaId' className='form-control form-control-border'>{form.familiaId}</span>
					<input type='hidden' name='familiaId' value={form.familiaId} />
        </div>
        {
          !formNewSubFamily &&
          <div className='form-group'>
            <label htmlFor='id'>{subfamily.lbl.id}</label>
            <span name='id' className='form-control form-control-border'>{form.id}</span>
          </div>
        }

        <div className='form-group'>
          <label htmlFor='nombre'>{subfamily.lbl.nombre}</label>
          <input 
            type='text'
            className={`form-control form-control-border ${!validation.nombre && 'is-invalid'}`}
            name='nombre'
            defaultValue={form.nombre}
						placeholder={subfamily.plhld.nombre}
						onChange={handleChange}
						onBlur={(e) => { validacion({nombre: 'nombre', valor: e.target.value}) }}
						maxLength={30}
						required
          />
					{!validation.nombre && <span className='text-danger'>{subfamily.txt.valNombre}</span>}
        </div>

        <div>
          <input
            type='submit'
            className='btn btn-outline-success btn-md btn-block'
            value={ formNewSubFamily ? subfamily.btn.new : subfamily.btn.edit }
          />
        </div>
      </form>
    </Fragment>
  )
}
