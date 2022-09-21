/**
 * * Formulario de Tienda Lista de Precio
 * ? Para agregar y editar
 */
import { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
//* Textos
import { universal, priceList, shopPriceList } from '@utils/texts/modGestion';
//* Componentes propios

//* Redux ~ Duck necesarios
import { addTiendaListaAction, updateTiendaListaAction } from '@redux/tiendaListaPrecioDuck';
import { getTiendasAction } from '@redux/tiendasDuck';


export default function FormTiendaListaPrecio({ formNewLista = true, tiendaListaForm }) {
  const params = useParams(); //? Acceso a params de la URL
	const dispatch = useDispatch(); //? Disparador

  const { id } = params; //? Extraer ID de URL
	let tiendas = useSelector((store)=> store.tiendas.list); //? Valores para Select Tiendas

  // Almacenamiento de Datos formulario
	const [form, setForm] = useState({
    id: tiendaListaForm.id,
		tiendaId: tiendaListaForm.tiendaId,
		listaPrecioId: tiendaListaForm.listaPrecioId
	});

  //? ejecucion de metodo al renderizar pagina
  useEffect(() => { dispatch(getTiendasAction())}, []);

	/**
	 * * Manejador de Actualizar Tienda Lista Precio
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => { 
		const listaTiendaId = parseInt(form.id); //? Extraer ID de URL
    delete form.id;
		try {
			const options = { id: listaTiendaId, body: form };
			dispatch(updateTiendaListaAction(options));
		} catch (error) {
			console.log(error);
		}
	};

	/** 
	 * * Manejador para Agregar Tienda Lista Precio
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {	
      delete form.id;
      form.listaPrecioId = id;
      dispatch(addTiendaListaAction({body: form}));
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
		formNewLista ? postData(form) : putData(form);
	};

	return (
  <Fragment>
    <form id='formulario' onSubmit={handleSubmit} >
      { (!formNewLista) && 
      <div className='form-group'>
        <label htmlFor='id'>{shopPriceList.lbl.id}</label>
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
        <label htmlFor='tiendaId'>{shopPriceList.lbl.tienda}</label>
        <select
          name='tiendaId' 
          className='form-control select2 custom-select'
          onChange={handleChange}
        >
          <option
            disabled
            selected={ (!formNewLista) && 'selected' }
          >
            {shopPriceList.slct.tienda}
          </option>
          { (tiendas.length > 0) && 
            tiendas.map((i) =>(
              <option value={i.id} selected={(i.id == form.tiendaId ) && 'selected'}>
                {i.nombre} 
              </option>)) 
          }
        </select>
      </div>

      <input
        type='hidden'
        id='listaPrecioId'
        name='listaPrecioId'
        value={form.listaPrecioId}
      />

      <br/> <br/> <br/> <br/> <br/> <br/> 
      
      <input
        type='submit'
        className='btn btn-outline-success btn-block'
        // data-bs-dismiss='offcanvas'
        value={formNewLista ? shopPriceList.btn.agregar : shopPriceList.btn.editar}
      />
    </form>
  </Fragment>
	);
}