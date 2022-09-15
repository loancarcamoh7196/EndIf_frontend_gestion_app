/**
 ** Redux de contenedores Lista de Precios
 *? nombre en store: listaPrecios
 */
//? Utilidad 
import axios from 'axios';
// ? Compoenente Msj
import { toast } from 'react-toastify';
//? Redux
import { refreshTokenAction } from '@redux/userAuthDuck';
import { addTiendaListaAction, updateTiendaListaAction } from '@redux/tiendaListaPrecioDuck';
//? Texto
import endPoints from '@services/api';
import { toastOptions } from '@utils/texts/general';

//* Data inicial
const dataInicial = {
	list: [],
	loading: false,
	form: 0,
};

//* Types
const LISTA_PRECIO_LIST = 'LISTA_PRECIO_LIST';
const LISTA_PRECIO_ADD = 'LISTA_PRECIO_ADD';
const LISTA_PRECIO_UPDATE = 'LISTA_PRECIO_UPDATE';
const LISTA_PRECIO_DELETE = 'LISTA_PRECIO_DELETE';
const LISTA_PRECIO_ERROR = 'LISTA_PRECIO_ERROR';
const LISTA_PRECIO_LOADING = 'LISTA_PRECIO_LOADING';
const LISTA_PRECIO_SHOW ='LISTA_PRECIO_SHOW';

//* Reducer
export default function listaPreciosReducer(state = dataInicial, action) {
	switch (action.type) {
		case LISTA_PRECIO_ERROR:
			return { ...state, ...action.payload };
		case LISTA_PRECIO_LIST:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
    case LISTA_PRECIO_ADD:
      return { ...state, list: action.payload.list, loading: action.payload.loading };
		case LISTA_PRECIO_UPDATE:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case LISTA_PRECIO_DELETE:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case LISTA_PRECIO_LOADING:
			return { ...state, loading: action.payload };
		case LISTA_PRECIO_SHOW:
			return { ...state, form: action.payload };
		default:
			return { ...state };
	}
}

//* Action
export const getListaPreciosAction = (options) => async (dispatch, getState) => {
	dispatch({ type: LISTA_PRECIO_LOADING, payload: true });

	try {
		const empresaSession = getState().auth.empresaSession;
		const api = endPoints.listaPrecios.list({ empresaRut: empresaSession});
		// const { activo, loading } = getState().user;
		// console.log(body);
		// console.log(api);
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: LISTA_PRECIO_LIST, payload:{ list: res.data, loading: false } });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, toastOptions);
    dispatch({ type: LISTA_PRECIO_ERROR });
	}
};

export const addListaPrecioAction = (options) => async (dispatch, getState) => {
	dispatch({ type: LISTA_PRECIO_LOADING, payload: true });
	const { body, bodyRelacion } = options; //? Opciones para solicitud a  API
	const api = endPoints.listaPrecios.add();

	try {
		body.empresaRut = getState().auth.empresaSession;//? Empresa almacenda en session

		delete body.tiendaId; // ? Se elimina -tiendaId para regisro de Listado
		delete body.listaPrecioId; //? Se elimina - precioId para registro de Listado

		const res = await axios.post(api, body); //? Se agrega listado
		// console.log(res.data);
		const { id, lista } = res.data;
		// bodyRelacion.listaPrecioId = id; //? Se ha agragado ListaId a TiendaListaPrecio
		// //? Se agrega despues relación de Tienda con Lista Precio
		// // console.log(bodyRelacion);
		// dispatch(addTiendaListaAction({body: bodyRelacion}));//? Agrega relacion Tienda <-> Lista

		toast.success(`Lista de Precio ${id} - ${lista} ha sido agregado existosamente.`, toastOptions);
		dispatch({
			type: LISTA_PRECIO_ADD,
			payload: { 
				list: [...getState().listaPrecios.list, res.data],
				loading: false
			}
		});
	} catch (error) {
		dispatch({ type: LISTA_PRECIO_LOADING, payload: false });
		// console.log(error);
		toast.error(`No ha sea podido agregar la lista de precio, porfavor revise los datos e intentelo más tarde`, toastOptions);
		dispatch({ type: LISTA_PRECIO_ERROR });	
	}
};

export const updateListaPrecioAction = (options) => async (dispatch, getState) => {
	dispatch({ type: LISTA_PRECIO_LOADING, payload: true });
	const { id, tiendaListaBody, body } = options; //? Opciones para solicitud a  API
	try {
		
		const api = endPoints.listaPrecios.update(id); //? URL API
		// console.log('TiendaLista Body: ', tiendaListaBody);
		body.empresaRut = getState().auth.empresaSession;//? Empresa almacenda en session
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().listaPrecios.list.map((e) =>  e.id === id ? res.data : e );
		

		// console.log('cuerpo :', tiendaListaBody)
		// console.log('Tienda Lista ID: ', tiendaListaBody.id);
		// delete tiendaListaBody.id;
		// dispatch(updateTiendaListaAction({id: tiendaListaBody.id, body: tiendaListaBody}));//? Actualiza Relación de entre Tienda <-> Lista de Precio
		const { lista } = res.data
		toast.success(`La lista de precio ${id} - ${lista} ha sido modificado correctamente`, toastOptions);
		dispatch({ type: LISTA_PRECIO_UPDATE, payload: { list: newList, loading: false } });

	} catch (error) {
		dispatch({ type: LISTA_PRECIO_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`La lista de precio ${id} no se ha podido actualizar.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: LISTA_PRECIO_ERROR });
	}
};

export const deleteListaPrecioAction = (options) => async (dispatch, getState) => {
	dispatch({ type: LISTA_PRECIO_LOADING, payload: true });
	const { id } = options; //? Opciones para solicitud a  API
	const api = endPoints.listaPrecios.delete(id); //? URL API
	// console.log(api);
	// console.log(body);
	try {
		//? Extraer registro que se desea eliminar
		const listDelete = {...getState().listaPrecios.list.filter((e)=> e.id == id)};
		
		if (listDelete.length > 0 && listDelete[0].length > 0) {
			console.log('Paso')
			// console.log(listDelete[0]);
			// console.log(tiendasLista);
			//? Eliminar Relacion Tienda <-> Lista de Precio
			console.log(listDelete[0].tiendasLista);
			listDelete[0].tiendasLista.map(e => dispatch(deleteListaPrecioAction(e.id)) );

		}
		
		//? Eliminar Lista Precio
		const res = await axios.delete(api);
		let newList = getState().listaPrecios.list.filter((e)=> e.id != id);
		toast.warning(`La Lista de Precio con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({
			type: LISTA_PRECIO_DELETE,
			payload: {
				list: newList,
				loading: false
			} 
		});
	} catch (error) {
		dispatch({ type: LISTA_PRECIO_LOADING, payload: false });
		console.log(error);
		// let msg = error.response.data;
		toast.error(`No se ha podido eliminar la lista de precio con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: LISTA_PRECIO_ERROR });
	}
};

export const showFormAction = (options) => async (dispatch, getState) => {
  const { id } = options;
  try {
    dispatch({type: LISTA_PRECIO_SHOW, payload: id });
  } catch (error) {
    toast.error(`Error: Lista de Precio ${id} no se ha podido cargar`, toastOptions)
    dispatch({ type: LISTA_PRECIO_ERROR });
  }
}
