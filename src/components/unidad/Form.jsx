/**
 * * Formulario de Unidad
 * ? Para agregar y editar
 */
import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//* Texto
import { unit } from '@utils/texts/modAdmin';
import { universal, toastOptions } from '@utils/texts/general';
//* Componentes propios
import Card from '@common/Card';
//* Redux ~ Duck necesarios
import { addUnidadAction, updateUnidadAction } from '@redux/unidadesDuck';

export default function FormUnidad({ formNewUnidad=true, unidadForm }) {
	const dispatch = useDispatch(); //? Disparador

  //Selector

  // ejecucion de metodo al renderizar pagina
  // useEffect(() => { }, []);

  const [validation, setValidation] = useState({
		nombre: true,
    plural: true,
	});

	const validacion = (campo) => {
		const _names = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/gm;
		// console.log(campo)

		if (campo.nombre === 'nombre') {
			(campo.valor.length >=2 && campo.valor.length <=3 && _names.test(campo.valor)) ? setValidation({...validation, nombre: true}) : setValidation({...validation, nombre: false});
		} if (campo.nombre === 'plural') {
			(campo.valor.length >=3 && campo.valor.length <=20 && _names.test(campo.valor)) ? setValidation({...validation, plural: true}) : setValidation({...validation, plural: false});
		} else  return false;
	}

	//? Almacenamiento de Datos formulario
	const [form, setForm] = useState({
    id: unidadForm.id,
		nombre: unidadForm.nombre,
		plural: unidadForm.plural
	});
	
	/**
	 * * Manejador de Actualizar Unidad
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => { 
		const { id } = form; // Extraer ID de URL
		try {
      delete form.id;
			const options = { id, body: form };
			dispatch(updateUnidadAction(options));
		} catch (error) {
			console.log(error);
			// setMessage('Falló la edición');
		}
	};

	/** 
	 * * Manejador para Agregar Unidad
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {	
      delete form.id;
      dispatch(addUnidadAction({body: form}));
		} catch (error) {
			// setMessage('Falló la edición');
      console.log(error);
		}

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
		formNewUnidad ? postData(form) : putData(form);
	};

	return (
    <Fragment>
    <form id='formulario' onSubmit={handleSubmit} >
      { (!formNewUnidad) && 
        <div className='form-group'>
          <label htmlFor='id'>{unit.lbl.id}</label>
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
        <label htmlFor='nombre'>{unit.lbl.nombre}</label>
        <input 
          type='text'
          className={`form-control form-control-border ${!validation.nombre && 'is-invalid'}`} 
          id='nombre'
          name='nombre'
          placeholder={unit.plhld.nombre}
          onChange={handleChange}
          value={form.nombre}
          describedby='nombreError'
          maxLength={30} 
          required
          onBlur={(e) => { validacion({nombre: 'nombre', valor: e.target.value}) }}
        />
        {!validation.nombre && <span className='text-danger'>{unit.txt.valNombre}</span>}
      </div>
      <div className='form-group'>
        <label htmlFor='plural'>{unit.lbl.plural}</label>
        <input 
          type='text'
          className={`form-control form-control-border ${!validation.plural && 'is-invalid'}`} 
          id='plural'
          name='plural'
          placeholder={unit.plhld.plural}
          onChange={handleChange}
          value={form.plural}
          describedby='pluralError'
          maxLength={30} 
          required
          onBlur={(e) => { validacion({nombre: 'plural', valor: e.target.value}) }}
        />
        {!validation.plural && <span className='text-danger'>{unit.txt.valPlural}</span>}
      </div>

      <input
        type='submit'
        className='btn btn-outline-success btn-md btn-block mb-2 text-reset' data-bs-dismiss='offcanvas' 
        value={formNewUnidad ? unit.btn.agregar : unit.btn.editar}
      />
    </form>
    </Fragment>
	);
}
