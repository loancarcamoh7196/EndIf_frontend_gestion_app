/**
 ** Redux de contenedores Cuadratura
 *? nombre en store: cuadraturas 
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toastOptions } from '../utils/texts/general';

//Data inicial
const dataInicial = {
	list: [],
};

//Types
const CUADRATURA_LIST = 'CUADRATURA_LIST';
const CUADRATURA_GET = 'CUADRATURA_GET';
const CUADRATURA_ADD = 'CUADRATURA_ADD';
const CUADRATURA_UPDATE = 'CUADRATURA_UPDATE';
const CUADRATURA_DELETE = 'CUADRATURA_DELETE';
const CUADRATURA_ERROR = 'CUADRATURA_ERROR';

//Reducer
export default function cuadraturasReducer(state = dataInicial, action) {
	switch (action.type) {
		case CUADRATURA_ERROR:
			return { ...state, ...action.payload };
		case CUADRATURA_LIST:
			return { ...state, list: action.payload.list };
		case CUADRATURA_GET:
			return { ...state, ...action.payload };
    case CUADRATURA_ADD:
      return { ...state, list: action.payload };
		case CUADRATURA_UPDATE:
			return { ...state,  list: action.payload };
		case CUADRATURA_DELETE:
			return { ...state, list: 	action.payload };
		default:
			return { ...state };
	}
}

// Action
export const getCuadraturasAction = (options) => async (dispatch, getState) => {
	const api = endPoints.cuadraturas.list();
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: CUADRATURA_LIST, payload:{ list: res.data.rows } });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, toastOptions);
    dispatch({ type: CUADRATURA_ERROR });
	}
};

export const getCuadraturaAction = (options) => async (dispatch, getState) => {
	const { id } = options;
	const api = endPoints.cuadraturas.get(id);
	try {
		const res = await axios.get(api);
		dispatch({ type: CUADRATURA_GET, payload: { results: res.data } });
	} catch (error) {
		// console.log(error);
		dispatch({ type: CUADRATURA_ERROR });
	}
};

export const addCuadraturaAction = (options) => async (dispatch, getState) => {
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.cuadraturas.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Cuadratura ${body.id}- ${body.nombre} ha sido agregado existosamente`, toastOptions);
		dispatch({ type: CUADRATURA_ADD, payload: [...getState().usuarios.list, res.data] });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No ha sea podido agregar la cuadratura, porfavor revise los datos e intentelo más tarde`, toastOptions);
		toast.error(msg, toastOptions);	
		dispatch({ type: CUADRATURA_ERROR });	
	}
};

export const updateCuadraturaAction = (options) => async (dispatch, getState) => {
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.cuadraturas.update(id); // URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().cuadraturas.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`La cuadratura ${body.id} - ${body.nombre} ha sido modificado correctamente`, toastOptions);
		dispatch({  type: CUADRATURA_UPDATE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`El usuario ${body.username} no se ha podido actualizar.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: CUADRATURA_ERROR });
	}
};

export const deleteCuadraturaAction = (options) => async (dispatch, getState) => {
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.cuadraturas.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().cuadraturas.list.filter((e)=> e.id !== id);

		toast.warning(`La cuadratura con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: CUADRATURA_DELETE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No se ha podido eliminar la cuadratura con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: CUADRATURA_ERROR });
	}
};
