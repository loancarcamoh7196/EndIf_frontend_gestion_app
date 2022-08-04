/**
 * * Componente Subfamilia ~ Form
 * ? ubicado en: /subfamilias/:id
 */
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//* Textos
import { subfamily } from '@utils/texts/modGestion';
//* Redux
import { addSubFamiliaAction, updateSubFamiliaAction } from '@redux/subFamiliasDuck';


export default function FormSubFamilia({subfamilyForm, formNewSubFamily=true }) {
  const dispatch = useDispatch();
  
  const [validation, setValidation] = useState({ nombre: true });

	const validacion = (campo) => {
		const _names = /^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/gm;
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
	 * * Manejador de Actualizar SubFamilia
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => { 
		const { id } = form; // Extraer del form
		delete form.id;

		try {
			const options = { id, body: form };
			dispatch(updateSubFamiliaAction(options));
		} catch (error) {
			console.log(error);
		}
	};

	/** 
	 * * Manejador para Agregar SubFamilia
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {
      delete form.id;
      dispatch(addSubFamiliaAction({body: form}));
		} catch (error) {
      console.log(error);
		}
	};

	const handleChange = (e) => {
    const target = e.target;
    const value = (target.type === 'checkbox' ? target.checked : target.value);
    const name = target.name;
    setForm({  ...form, [name]: value });
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
						<input type='hidden' name='id' value={form.id} />
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
            className='btn btn-outline-success btn-md btn-block mb-2 text-reset' data-bs-dismiss='offcanvas' 
            value={ formNewSubFamily ? subfamily.btn.new : subfamily.btn.edit }
          />
        </div>
      </form>
    </Fragment>
  )
}
