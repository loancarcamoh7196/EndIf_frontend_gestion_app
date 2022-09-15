/**
 * * Formulario de Marca
 * ? Para agregar y editar
 */
import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
//* Texto
import { brand } from '@utils/texts/modAdmin';
//* Redux ~ Duck necesarios
import { addMarcaAction, updateMarcaAction} from '@redux/marcasDuck';

export default function FormMarca({ formNewMarca = true, marcaForm }) {
	const dispatch = useDispatch(); //? Disparador

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
    id: marcaForm.id,
		nombre: marcaForm.nombre,
	});
	
	/**
	 * * Manejador de Actualizar Rol
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => { 
		// console.log('Entro en Editar');
		const { id } = form; // Extraer ID de URL
		try {
			delete form.id;
			const options = { id, body: form };
			dispatch(updateMarcaAction(options));
		} catch (error) {
			console.log(error);
		}
	};

	/** 
	 * * Manejador para Agregar Rol
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {	
      delete form.id;
      dispatch(addMarcaAction({body: form}))
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
		formNewMarca ? postData(form) : putData(form);
	};

	return (
  <Fragment>
    <form id='formulario' onSubmit={handleSubmit} >
      { (!formNewMarca) && 
        <div className='form-group'>
          <label htmlFor='id'>{brand.lbl.id}</label>
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
        <label htmlFor='nombre'>{brand.lbl.nombre}</label>
        <input 
          type='text'
          className={`form-control form-control-border ${!validation.nombre && 'is-invalid'}`} 
          id='nombre'
          name='nombre'
          placeholder={brand.plhld.nombre}
          onChange={handleChange}
          value={form.nombre}
          describedby='nombreError'
          maxLength={30} 
          required
          onBlur={(e) => { validacion({nombre: 'nombre', valor: e.target.value}) }}
        />
        {!validation.nombre && <span className='text-danger'>{brand.txt.valNombre}</span>}
      </div>

      <input
        type='submit'
        className='btn btn-outline-success btn-md btn-block mb-2 text-reset'
        data-bs-dismiss='offcanvas'
        value={formNewMarca ? brand.btn.agregar : brand.btn.editar}
      />
    </form>
  </Fragment>
	);
}
