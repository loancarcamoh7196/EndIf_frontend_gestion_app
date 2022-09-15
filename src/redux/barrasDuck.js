/**
 ** Redux de contenedores Barras
 *? nombre en store: barras
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toastOptions } from '../utils/texts/general';

//Data inicial
const dataInicial = {
	list: [],
	loading: false
};

//* Types
const BARRA_LIST = 'BARRA_LIST';
const BARRA_GET = 'BARRA_GET';
const BARRA_ADD = 'BARRA_ADD';
const BARRA_UPDATE = 'BARRA_UPDATE';
const BARRA_DELETE = 'BARRA_DELETE';
const BARRA_ERROR = 'BARRA_ERROR';
const BARRA_SHOW = 'BARRA_SHOW';
const BARRA_LOADING = 'BARRA_LOADING';

//* Reducer
export default function barrasReducer(state = dataInicial, action) {
	switch (action.type) {
		case BARRA_ERROR:
			return { ...state, ...action.payload };
		case BARRA_LIST:
			return { ...state, list: action.payload.list };
		case BARRA_GET:
			return { ...state, ...action.payload };
    case BARRA_ADD:
      return { ...state, list: action.payload.list, loading: action.payload.loading };
		case BARRA_UPDATE:
			return { ...state,  list: action.payload.list, loading: action.payload.loaading };
		case BARRA_DELETE:
			return { ...state, list: 	action.payload.list, loading: action.payload.loaading };
		case BARRA_SHOW:
			return { ...state, loading: action.payload };
		default:
			return { ...state };
	}
}

//* Action
export const getBarrasAction = (options) => async (dispatch, getState) => {
	const api = endPoints.barras.list();
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: BARRA_LIST, payload: { list: res.data } });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, toastOptions);
    dispatch({ type: BARRA_ERROR });
	}
};

export const getBarraAction = (options) => async (dispatch, getState) => {
	const { id } = options;
	const api = endPoints.barras.get(id);
	try {
		const res = await axios.get(api);
		dispatch({ type: BARRA_GET, payload: { results: res.data } });
	} catch (error) {
		// console.log(error);
		dispatch({ type: BARRA_ERROR });
	}
};

export const addBarraAction = (options) => async (dispatch, getState) => {
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.barras.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Barra ${body.id}- ${body.nombre} ha sido agregado existosamente`, toastOptions);
		dispatch({ type: BARRA_ADD, payload: [...getState().usuarios.list, res.data] });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No ha sea podido agregar el código de barra, porfavor revise los datos e intentelo más tarde`, toastOptions);
		toast.error(msg, toastOptions);	
		dispatch({ type: BARRA_ERROR });	
	}
};

export const updateBarraAction = (options) => async (dispatch, getState) => {
	const { id, body } = options; //? Opciones para solicitud a  API
	const api = endPoints.barras.update(id); // URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().barras.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`El código de barra ${body.id} - ${body.nombre} ha sido modificado correctamente`, toastOptions);
		dispatch({  type: BARRA_UPDATE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`El codigo de barra ${body.id} no se ha podido actualizar.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: BARRA_ERROR });
	}
};

export const deleteBarraAction = (options) => async (dispatch, getState) => {
	const { id } = options; //? Opciones para solicitud a  API
	const api = endPoints.barras.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().barras.list.filter((e)=> e.id !== id);

		toast.warning(`El código de barra con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: BARRA_DELETE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No se ha podido eliminar el código de barra con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: BARRA_ERROR });
	}
};
