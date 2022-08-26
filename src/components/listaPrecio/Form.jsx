/**
 * * Formulario de Lista de Precios
 * ? Tambien contiene el manejo de la relación Tienda <-> Lista Precio
 * ? Para agregar y editar
 */
import { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//* Textos
import { priceList, universal } from '@utils/texts/modGestion';
import { toastOptions } from '@utils/texts/general';
//* Componentes propios

//* Redux ~ Duck necesarios
import { addListaPrecioAction, updateListaPrecioAction } from '@redux/listaPreciosDuck';
import { getTiendasAction } from '@redux/tiendasDuck';

export default function FormListaPrecio({ formNewLista = true, listaForm }) {
	const dispatch = useDispatch(); //? Disparador

  const tiendas = useSelector((store) => store.tiendas.list);


  // ejecucion de metodo al renderizar pagina
  // useEffect(() => { getTiendasAction() }, []);

  const [validation, setValidation] = useState({
		lista: true
	});

	const validacion = (campo) => {
		const _names = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/gm;
		// console.log(campo)

		if (campo.lista === 'lista') {
			(campo.valor.length >=4 && campo.valor.length <=30 && _names.test(campo.valor)) ? setValidation({...validation, lista: true}) : setValidation({...validation, lista: false});
		} else  return false;
	}

	// Almacenamiento de Datos formulario
	const [form, setForm] = useState({
    id: listaForm.id,
		lista: listaForm.lista,
		empresaRut: listaForm.empresaRut,
	});
	
	/**
	 * * Manejador de Actualizar Lista de Precio
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => { 
    
		const { id } = form; // Extraer ID de URL
		try {
			delete form.id;
			const options = { id, body: form };
			dispatch(updateListaPrecioAction(options));
		} catch (error) {
			console.log(error);
		}
	};

	/** 
	 * * Manejador para Agregar Lista de Precio
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {	
      delete form.id;
      dispatch(addListaPrecioAction({body: form}));
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
		formNewLista ? postData(form) : putData(form);
	};

	return (
  <Fragment>
    <form id='formulario' onSubmit={handleSubmit} >
      { (!formNewLista) && 
        <div className='form-group'>
          <label htmlFor='id'>{priceList.lbl.id}</label>
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
        <label htmlFor='lista'>{priceList.lbl.lista}</label>
        <input 
          type='text'
          className={`form-control form-control-border ${!validation.lista && 'is-invalid'}`} 
          name='lista'
          defaultValue={form.lista}
          placeholder={priceList.plhld.lista}
          onChange={handleChange}
          onBlur={(e) => { validacion({nombre: 'lista', valor: e.target.value}) }}
          maxLength={30} 
          required
          
        />
        {!validation.lista && <span className='text-danger'>{priceList.txt.valLista}</span>}
      </div>

      <div className='form-group'>
        <label htmlFor='tiendaId'>{priceList.lbl.tienda}</label>
        <select
          name='tiendaId' 
          className='form-control select2 custom-select'
          onChange={handleChange}
        >
          <option
            disabled
            selected={ (!formNewLista) && 'selected' }
          >
            {priceList.slct.tienda}
          </option>
          { (tiendas.length > 0) && 
              tiendas.map((i) => <option value={i.id} selected={(i.id === form.tienda ) && 'selected'}> {i.nombre} </option>) 
          }
        </select>
      </div>

      <input
        type='submit'
        className='btn btn-outline-success btn-md btn-block mb-2 text-reset'
        data-bs-dismiss='offcanvas'
        value={ formNewLista ? priceList.btn.new : priceList.btn.edit }
      />
    </form>
  </Fragment>
	);
}
