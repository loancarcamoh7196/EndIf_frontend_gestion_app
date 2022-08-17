/**
 ** Redux de contenedores Lista de Precios
 *? nombre en store: listaPrecios
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toastOptions } from '@utils/texts/general';

//Data inicial
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
	const { body } = options; //? Opciones para solicitud a  API
	const api = endPoints.listaPrecios.add();
	// console.log(body);
	// console.log(api);
	try {
		body.empresaRut = getState().auth.empresaSession;//? Empresa almacenda en session
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Lista de Precio ${res.data.id}- ${body.lista} ha sido agregado existosamente`, toastOptions);
		dispatch({ type: LISTA_PRECIO_ADD, payload:{ list: [...getState().listaPrecios.list, res.data], loading: false}});
	} catch (error) {
		dispatch({ type: LISTA_PRECIO_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No ha sea podido agregar la lista de precio, porfavor revise los datos e intentelo más tarde`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: LISTA_PRECIO_ERROR });	
	}
};

export const updateListaPrecioAction = (options) => async (dispatch, getState) => {
	dispatch({ type: LISTA_PRECIO_LOADING, payload: true });
	const { id, body } = options; //? Opciones para solicitud a  API
	const api = endPoints.listaPrecios.update(id); //? URL API

	try {
		body.empresaRut = getState().auth.empresaSession;//? Empresa almacenda en session
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().listaPrecios.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`La lista de precio ${id} - ${res.data.lista} ha sido modificado correctamente`, toastOptions);
		dispatch({  type: LISTA_PRECIO_UPDATE, payload: { list: newList, loading: false }});
	} catch (error) {
		dispatch({ type: LISTA_PRECIO_LOADING, payload: false });
		// console.log(error);
		let msg = error.response.data;
		toast.error(`La lista de precio ${body.username} no se ha podido actualizar.`, toastOptions);
		toast.error(msg, toastOptions);
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
		const res = await axios.delete(api);
		let newList = getState().listaPrecios.list.filter((e)=> e.id !== id);
		toast.warning(`La lista de precio con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: LISTA_PRECIO_DELETE, payload: {list: newList, loading: false} });
	} catch (error) {
		dispatch({ type: LISTA_PRECIO_LOADING, payload: false });
		// console.log(error);
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
