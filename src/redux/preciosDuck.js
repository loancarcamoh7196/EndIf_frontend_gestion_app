/**
 ** Redux de contenedores Precios
 *? nombre en store: precios 
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toastOptions } from '../utils/texts/general';

//* Data inicial
const dataInicial = {
	list: [],
	loading: false,
	form: 0,
};

//* Types
const PRECIO_LIST = 'PRECIO_LIST';
const PRECIO_ADD = 'PRECIO_ADD';
const PRECIO_UPDATE = 'PRECIO_UPDATE';
const PRECIO_DELETE = 'PRECIO_DELETE';
const PRECIOS_ERROR = 'PRECIOS_ERROR';
const PRECIO_LOADING = 'PRECIO_LOADING';
const PRECIO_SHOW = 'PRECIO_SHOW';

//* Reducer
export default function preciosReducer(state = dataInicial, action) {
	switch (action.type) {
		case PRECIOS_ERROR:
			return { ...state, ...action.payload };
		case PRECIO_LIST:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
    case PRECIO_ADD:
      return { ...state, list: action.payload };
		case PRECIO_UPDATE:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case PRECIO_DELETE:
			return { ...state, list: action.payload };
		case PRECIO_LOADING:
			return { ...state, loading: action.payload };
		case PRECIO_SHOW:
			return {  ...state, form: action.payload };
		default:
			return { ...state };
	}
}

//* Action
export const getPreciosAction = (options) => async (dispatch, getState) => {
	dispatch({ type: PRECIO_LOADING, payload: true });
	// const { activo, loading } = getState().user;
	try {
		const { productoId, listaPrecioId } = options;
			let api;
		if( productoId != undefined && listaPrecioId != undefined ){
			// console.log('Producto y Lista');
			api = endPoints.precios.list({ productoId, listaPrecioId });
		}else if( productoId != undefined ){
			// console.log('Producto');
			api = endPoints.precios.list({ productoId });
		}else if( listaPrecioId != undefined ){
			// console.log('Lista');
			api = endPoints.precios.list({ listaPrecioId });
		}else api = endPoints.precios.list();

		// console.log(api);
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: PRECIO_LIST, payload:{ list: res.data, loading: false } });
	} catch (error) {
		dispatch({ type: PRECIO_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, toastOptions);
    dispatch({ type: PRECIOS_ERROR });
	}
};

export const addPrecioAction = (options) => async (dispatch, getState) => {
	dispatch({ type: PRECIO_LOADING, payload: true });
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.precios.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Precio ${body.id} ha sido agregado existosamente`, toastOptions);
		dispatch({ type: PRECIO_ADD, payload: [...getState().precios.list, res.data] });
		dispatch({ type: PRECIO_LOADING, payload: false });
	} catch (error) {
		dispatch({ type: PRECIO_LOADING, payload: false });
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No ha sea podido agregar el precio, porfavor revise los datos e intentelo más tarde`, toastOptions);
		toast.error(msg, toastOptions);	
		dispatch({ type: PRECIOS_ERROR });	
	}
};

export const updatePrecioAction = (options) => async (dispatch, getState) => {
	dispatch({ type: PRECIO_LOADING, payload: true });
	const { id, body } = options; //? Opciones para solicitud a  API
	const api = endPoints.precios.update(id); //? URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().precios.list.map(e => e.id == id ? res.data : e);
		toast.success(`El precio ${id} - ${res.data.nombre} ha sido modificado correctamente`, toastOptions);
		dispatch({  type: PRECIO_UPDATE, payload:{ list: newList, loading: false }});
	} catch (error) {
		dispatch({ type: PRECIO_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`El precio ${body.username} no se ha podido actualizar.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: PRECIOS_ERROR });
	}
};

export const deletePrecioAction = (options) => async (dispatch, getState) => {
	dispatch({ type: PRECIO_LOADING, payload: true });
	const { id } = options; //? Opciones para solicitud a  API
	const api = endPoints.precios.delete(id); //? URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().precios.list.filter((e)=> e.id !== id);

		toast.warning(`El precio con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: PRECIO_DELETE, payload: newList });
		dispatch({ type: PRECIO_LOADING, payload: false });
	} catch (error) {
		dispatch({ type: PRECIO_LOADING, payload: false });
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No se ha podido eliminar el precio con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: PRECIOS_ERROR });
	}
};

export const showFormAction = (options) => async (dispatch, getState) => {
  const { id } = options;

  try {
    dispatch({type: PRECIO_SHOW, payload: id });
  } catch (error) {
    toast.error(`ERROR: Unidad ${id} no se ha podido cargar`, toastOptions);
    dispatch({ type: PRECIOS_ERROR });
  }
}
