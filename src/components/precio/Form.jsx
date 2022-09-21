/**
 * * Formulario de Precios
 * ? Para agregar y editar
 */
import { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
//* Texto
import { price, universal } from '@utils/texts/modGestion';
//* Componentes propios

//* Redux ~ Duck necesarios
import { addPrecioAction, updatePrecioAction } from '@redux/preciosDuck';

export default function FormPrecio({ formNewPrecio = true,  precioForm }) {
	const params = useParams(); //? Acceso a params de la URL
	const dispatch = useDispatch(); //? Disparador
  // const ivaRef = createRef(0);
  // const netoRef = createRef(0);

  const { id } = params; //? Extraer ID de URL
	let listaPrecio = useSelector((store)=> store.listaPrecios.list); //? Valores para Select Roles

  // ejecucion de metodo al renderizar pagina
  // useEffect(() => { dispatch(getPreciosAction({ productoId: id })) }, []);

  const [validation, setValidation] = useState({
		nombre: true,
    precioPublico: true
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
    id:  precioForm.id,
		neto:  precioForm.neto,
		iva:  precioForm.iva,
		precioPublico:  precioForm.precioPublico,
    esExento:  precioForm.esExento,
		esMayorista:  precioForm.esMayorista,  
		productoId:  precioForm.productoId,
    listaPrecioId: precioForm.listaPrecioId
	});
	
	/**
	 * * Manejador de Actualizar Rol
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => {
    let precioId = form.id;
    // console.log(precioId);
    delete form.id;
		
		try {
			const options = { id: precioId, body: form };
			dispatch(updatePrecioAction(options));
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
      form.productoId = id;
      dispatch(addPrecioAction({body: form}));
      // navigate('/admin/roles');
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
		formNewPrecio ? postData(form) : putData(form);
	};

  const calcularPrecio = (precio) => {
    let _impuesto = 0.19;
    let _iva = parseFloat(precio * _impuesto);
    // console.log(_iva);
    let _neto = precio - _iva;
    // console.log(_neto);
    return { iva: _iva, neto: _neto }
  }

	return (
  <Fragment>
    <form id='formulario' onSubmit={handleSubmit} >
      <div className='row'>
        { (!formNewPrecio) && 
        <div className='form-group'>
          <label htmlFor='id'>{price.lbl.id}</label>
          <input 
            type='number'
            className='form-control form-control-border'
            name='id'
            value={form.id}
            disabled
          />
        </div>
        }
        <div className='col-6'>
          <div className='form-group'>
            <label htmlFor='neto'>{price.lbl.neto}</label>
            <input
              type='number'
              className='form-control form-control-border'
              name='neto'
              value={form.neto}
            />
          </div>
        </div>
        <div className='col-6'>
          <div className='form-group'>
            <label htmlFor='iva'>{price.lbl.iva}</label>
            <input
              type='number'
              className='form-control form-control-border'
              name='iva'
              value={form.iva}
            />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='precioPublico'>{price.lbl.precioPublico}</label>
          <input 
            type='number'
            className={`form-control form-control-border ${!validation.precioPublico && 'is-invalid'}`} 
            id='precioPublico'
            name='precioPublico'
            placeholder={price.plhld.precioPublico}
            onChange={(e)=>{ 
              // handleChange(e);
              let {iva, neto} = calcularPrecio(e.target.value);
              let precioPublico = parseFloat(e.target.value)
              // console.log(iva);
              // console.log(neto);
              // setForm({...form, iva})
              setForm({...form, iva, neto, precioPublico})
            }}
            // onChange={handleChange}
            onBlurCapture={(e)=>calcularPrecio(e.target.value)}
            defaultValue={form.precioPublico}
            describedby='precioPublicoError'
            step={1}
            min={1}
            required
            // onBlur={(e)=> calcularPrecio(e.target.value)}
          />
          {!validation.precioPublico && <span className='text-danger'>{price.txt.valPrecio}</span>}
        </div>

        <div className='col-sm-5'>
          <div className='form-group'>
            <div className='icheck-pumpkin'>
              <input 
                type='checkbox'
                name='esExento' 
                id='esExento' 
                onChange={handleChange} 
                defaultChecked={form.esExento}
              />
              <label htmlFor='esExento'>{price.lbl.esExento}</label>
            </div>
          </div>  
        </div> 
      
        <div className='col-sm-5'>
          <div className='form-group'>
            <div className='icheck-pumpkin'>
              <input 
                type='checkbox'
                name='esMayorista' 
                id='esMayorista' 
                onChange={handleChange} 
                defaultChecked={form.esMayorista}
              />
              <label htmlFor='esMayorista'>{price.lbl.esMayorista}</label>
            </div>
          </div>  
        </div>

        <div className='form-group'>
          <label>{price.lbl.listaPrecio}</label>
          <select
            id='listaPrecioId'
            name='listaPrecioId'
            className='form-control select2'
            onChange={handleChange} 
            required
          >
            <option disabled selected={formNewPrecio && 'selected'}>{price.slct.lista}</option>
            {(listaPrecio.length > 0 )&& 
              listaPrecio.map((i)=> (
                <option value={i.id} selected={i.id == form.listaPrecioId && 'selected'} >{i.lista}</option>
              )
            )}
          </select>
        </div>

        <br />
        <br />
        <br />
        <br />

        <input
          type='submit'
          className='btn btn-outline-success btn-block' 
          value={formNewPrecio ? price.btn.add : price.btn.edit} 
        />
      </div>
    </form>
  </Fragment>
	);
}
