/**
 * * Formulario de Oferta
 * ? Para agregar y editar
 */
import { useState, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
//* Texto
import { offer, universal } from '@utils/texts/modGestion';
//* Componentes propios

//* Redux ~ Duck necesarios
import { addOfertaAction, updateOfertaAction } from '@redux/ofertasDuck';


export default function FormOferta({ formNewOferta = true, ofertaForm }) {
	const dispatch = useDispatch(); //Disparador

  const id = useSelector((store) => store.ofertas.form); 

  // ejecucion de metodo al renderizar pagina
  // useEffect(() => { }, []);

  const [validation, setValidation] = useState({
		descripcion: true,
    precio: true
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
    id: ofertaForm.id,
		descripcion: ofertaForm.descripcion,
		precio: ofertaForm.precio,
		activa: ofertaForm.activa
	});
	
	/**
	 * * Manejador de Actualizar Oferta
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => { 
		// console.log('Entro en Editar');
    delete form.id;
		// Extraer ID de URL
		try {
			const options = { id, body: form };
			dispatch(updateOfertaAction(options));
		} catch (error) {
			console.log(error);
		}
	};

	/** 
	 * * Manejador para Agregar Oferta
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {	
      delete form.id;
      dispatch(addOfertaAction({body: form}));
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
		formNewOferta ? postData(form) : putData(form);
	};

	return (
  <Fragment>
    <form id='formulario' onSubmit={handleSubmit} >
      { (!formNewOferta) && 
        <div className='form-group'>
          <label htmlFor='id'>{offer.lbl.id}</label>
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
        <label htmlFor='descripcion'>{offer.lbl.descripcion}</label>
        <input 
          type='text'
          className={`form-control form-control-border ${!validation.descripcion && 'is-invalid'}`} 
          id='descripcion'
          name='descripcion'
          placeholder={offer.plhld.descripcion}
          onChange={handleChange}
          value={form.descripcion}
          describedby='descripcionError'
          maxLength={30} 
          required
          onBlur={(e) => { validacion({nombre: 'descripcion', valor: e.target.value}) }}
        />
        {!validation.descripcion && <span className='text-danger'>{offer.txt.valDescripcion}</span>}
      </div>

      <div className='form-group'>
        <label htmlFor='precio'>{offer.lbl.precio}</label>
        <input 
          type='number'
          className={`form-control form-control-border ${!validation.precio && 'is-invalid'}`} 
          id='precio'
          name='precio'
          placeholder={offer.plhld.precio}
          onChange={handleChange}
          value={form.precio}
          describedby='descripcionError'
          maxLength={30} 
          required
          onBlur={(e) => { validacion({nombre: 'precio', valor: e.target.value}) }}
        />
        {!validation.precio && <span className='text-danger'>{offer.txt.valPrecio}</span>}
      </div>
      
      <div className='form-group'>
        <div className='icheck-pumpkin'>
          <input 
            type='checkbox'
            name='activa' 
            id='activa' 
            onChange={handleChange} 
            defaultChecked={form.activa}
          />
          <label htmlFor='activa'>{offer.lbl.activa}</label>
        </div>
      </div>

      <input
        type='submit'
        className='btn btn-outline-success btn-block'
        value={formNewOferta ? offer.btn.new : offer.btn.edit}
      />
    </form>
  </Fragment>
	);
}
