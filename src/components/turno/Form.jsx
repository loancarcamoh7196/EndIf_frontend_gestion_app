/**
 * * Formulario de Turno
 * ? Para agregar y editar
 */
import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
//* Texto
import { shift, universal } from '@utils/texts/modAdmin';
//* Componentes propios
import Card from '@common/Card';
//* Redux ~ Duck necesarios
import { addTurnoAction, updateTurnoAction } from '@redux/turnosDuck';



export default function FormTurno({ formNewTurno = true, turnoForm }) {
	const params = useParams(); // Acceso a params de la URL
	const dispatch = useDispatch(); //Disparador

  const tiendas = useSelector((store)=> store.tiendas.list);

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
    id: turnoForm.id,
		nombre: turnoForm.nombre,
		tiendaId: parseInt(turnoForm.tiendaId)
	});
	
	/**
	 * * Manejador de Actualizar Turno
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => {
    const id = form.id; //' Extraer ID de URL
    delete form.id;
		
		try {
			const options = { id, body: form };
			dispatch(updateTurnoAction(options));
		} catch (error) {
			console.log(error);
		}
	};

	/** 
	 * * Manejador para Agregar Turno
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {	
      delete form.id;
      dispatch(addTurnoAction({body: form}));
		} catch (error) {
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
		formNewTurno ? postData(form) : putData(form);
	};

	return (
  <Fragment>
    <form id='formulario' onSubmit={handleSubmit} >
      { (!formNewTurno) && 
        <div className='form-group'>
          <label htmlFor='id'>{shift.lbl.id}</label>
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
        <label htmlFor='nombre'>{shift.lbl.nombre}</label>
        <input 
          type='text'
          className={`form-control form-control-border ${!validation.nombre && 'is-invalid'}`} 
          id='nombre'
          name='nombre'
          placeholder={shift.plhld.nombre}
          onChange={handleChange}
          value={form.nombre}
          describedby='nombreError'
          maxLength={30} 
          required
          onBlur={(e) => { validacion({nombre: 'nombre', valor: e.target.value}) }}
        />
        {!validation.nombre && <span className='text-danger'>{shift.txt.valNombre}</span>}
      </div>
      <div className='form-group'>
        <label htmlFor='tiendaId'>{shift.lbl.tiendaId}</label>
        <select
          name='tiendaId' 
          className='form-control select2'
          onChange={handleChange}
          required
        >
          <option disabled='disabled' selected={formNewTurno && 'selected'} value=''>{shift.slct.tienda} </option>
          {(tiendas.length > 0) && tiendas.map((i) => (
            <option value={i.id} selected={i.id == form.tiendaId && 'selected'}>{i.nombre}</option>)
          )}
        </select>
      </div>

      <input
        type='submit'
        className='btn btn-outline-success btn-block'
        value={formNewTurno ? shift.btn.agregar : shift.btn.editar} 
      />
    </form>
  </Fragment>
	);
}
