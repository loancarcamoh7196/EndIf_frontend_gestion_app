/**
 ** Redux de contenedores Turnos
 *? nombre en store: turnos 
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
const TURNO_LIST = 'TURNO_LIST';
const TURNO_GET = 'TURNO_GET';
const TURNO_ADD = 'TURNO_ADD';
const TURNO_UPDATE = 'TURNO_UPDATE';
const TURNO_DELETE = 'TURNO_DELETE';
const TURNO_ERROR = 'TURNO_ERROR';

//Reducer
export default function turnosReducer(state = dataInicial, action) {
	switch (action.type) {
		case TURNO_ERROR:
			return { ...state, ...action.payload };
		case TURNO_LIST:
			return { ...state, list: action.payload.list };
		case TURNO_GET:
			return { ...state, ...action.payload };
    case TURNO_ADD:
      return { ...state, list: action.payload };
		case TURNO_UPDATE:
			return { ...state,  list: action.payload };
		case TURNO_DELETE:
			return { ...state, list: 	action.payload };
		default:
			return { ...state };
	}
}

// Action
export const getTurnosAction = (options) => async (dispatch, getState) => {
	const api = endPoints.turnos.list();
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: TURNO_LIST, payload:{ list: res.data.rows } });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, toastOptions);
    dispatch({ type: TURNO_ERROR });
	}
};

export const getTurnoAction = (options) => async (dispatch, getState) => {
	const { id } = options;
	const api = endPoints.turnos.get(id);
	try {
		const res = await axios.get(api);
		dispatch({ type: TURNO_GET, payload: { results: res.data } });
	} catch (error) {
		// console.log(error);
		dispatch({ type: TURNO_ERROR });
	}
};

export const addTurnoAction = (options) => async (dispatch, getState) => {
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.turnos.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Turno ${body.id}- ${body.nombre} ha sido agregado existosamente`, toastOptions);
		dispatch({ type: TURNO_ADD, payload: [...getState().usuarios.list, res.data] });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No ha sea podido agregar el turno, porfavor revise los datos e intentelo más tarde`, toastOptions);
		toast.error(msg, toastOptions);	
		dispatch({ type: TURNO_ERROR });	
	}
};

export const updateTurnoAction = (options) => async (dispatch, getState) => {
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.turnos.update(id); // URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().turnos.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`El turno ${body.id} - ${body.nombre} ha sido modificado correctamente`, toastOptions);
		dispatch({  type: TURNO_UPDATE, payload: newList });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`El turno ${body.username} no se ha podido actualizar.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: TURNO_ERROR });
	}
};

export const deleteTurnoAction = (options) => async (dispatch, getState) => {
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.turnos.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().turnos.list.filter((e)=> e.id !== id);

		toast.warning(`El turno con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: TURNO_DELETE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No se ha podido eliminar el turno con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: TURNO_ERROR });
	}
};
