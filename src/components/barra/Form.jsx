/**
 * * Formulario de Barra
 * ? Para agregar y editar
 */
import { useState, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
//* Texto
import { barcode, universal } from '@utils/texts/modGestion';
//* Componentes propios
import Card from '@common/Card';
//* Redux ~ Duck necesarios
import { addBarraAction, updateBarraAction} from '@redux/barrasDuck';



export default function FormBarra({ formNewBarra = true, barraForm }) {
	const params = useParams(); //? Acceso a params de la URL
	const dispatch = useDispatch(); //? Disparador

  const unidades = useSelector((store)=> store.unidades.list);


  // ejecucion de metodo al renderizar pagina
  useEffect(() => {  }, []);

  const [validation, setValidation] = useState({
		codigo: true
	});

	const validacion = (campo) => {
		const _names = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/gm;
		// console.log(campo)

		if (campo.nombre === 'codigo') {
			(campo.nombre.length >=4 && campo.nombre.length <=30 && _names.test(campo.valor)) ? setValidation({...validation, codigo: true}) : setValidation({...validation, codigo: false});
		} else  return false;
	}

	// Almacenamiento de Datos formulario
	const [form, setForm] = useState({
    id: barraForm.id,
		codigo: barraForm.codigo,
		productoId: barraForm.productoId,
		unidadId: barraForm.accesoPv
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
			dispatch(updateBarraAction(options));
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
      dispatch(addBarraAction({body: form}));
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
		formNewBarra ? postData(form) : putData(form);
	};

  // console.log(barcode.btn.agregar);

	return (
  <Fragment>
    <form id='formulario' onSubmit={handleSubmit} >
      { (!formNewBarra) && 
        <div className='form-group'>
          <label htmlFor='id'>{barcode.lbl.id}</label>
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
        <label htmlFor='codigo'>{barcode.lbl.codigo}</label>
        <input 
          type='text'
          className={`form-control form-control-border ${!validation.codigo && 'is-invalid'}`} 
          id='codigo'
          name='codigo'
          placeholder={barcode.plhld.codigo}
          onChange={handleChange}
          value={form.codigo}
          describedby='nombreError'
          maxLength={30} 
          required
          onBlur={(e) => { validacion({codigo: 'codigo', valor: e.target.value}) }}
        />
        {!validation.codigo && <span className='text-danger'>{barcode.txt.valNombre}</span>}
      </div>

      {/* <div className='form-group'>
        <label htmlFor='productoId'>{barcode.lbl.productoId}</label>
        <input 
          type='text'
          className={`form-control form-control-border ${!validation.productoId && 'is-invalid'}`} 
          id='productoId'
          name='productoId'
          placeholder={barcode.plhld.productoId}
          onChange={handleChange}
          value={form.productoId}
          describedby='nombreError'
          maxLength={30} 
          required
          onBlur={(e) => { validacion({productoId: 'productoId', valor: e.target.value}) }}
        />
        {!validation.productoId && <span className='text-danger'>{barcode.txt.valNombre}</span>}
      </div> */}

      <div className='form-group'>
        <label htmlFor='unidadId'>{barcode.lbl.unidad}</label>
        <select
            id='unidadId'
            name='unidadId'
            className='form-control select2'
            onChange={handleChange} 
            required
          >
            <option disabled selected={formNewBarra && 'selected'}>{barcode.slct.unidad}</option>
            {(unidades.length > 0 ) && 
              unidades.map((i)=> (
                <option value={i.id} selected={i.id == form.unidadId && 'selected'}>
                  {i.nombre} - {i.plural}
                </option>
              )
            )}
          </select>
      </div>
          
      <input
        type='submit'
        className='btn btn-outline-success btn-block'
        value={formNewBarra ? barcode.btn.agregar : barcode.btn.editar} 
      />
    </form>
  </Fragment>
	);
}
