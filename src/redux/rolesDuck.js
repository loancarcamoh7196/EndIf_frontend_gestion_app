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
const ROL_LIST = 'ROL_LIST';
const ROL_GET = 'ROL_GET';
const ROL_ADD = 'ROL_ADD';
const ROL_UPDATE = 'ROL_UPDATE';
const ROL_DELETE = 'ROL_DELETE';
const ROLES_ERROR = 'ROLES_ERROR';

//Reducer
export default function rolesReducer(state = dataInicial, action) {
	switch (action.type) {
		case ROLES_ERROR:
			return { ...state, ...action.payload };
		case ROL_LIST:
			return { ...state, list: action.payload.list };
		case ROL_GET:
			return { ...state, ...action.payload };
    case ROL_ADD:
      return { ...state, list: action.payload };
		case ROL_UPDATE:
			return { ...state,  list: action.payload };
		case ROL_DELETE:
			return { ...state, list: 	action.payload };
		default:
			return { ...state };
	}
}

// Action
export const getRolesAction = (options) => async (dispatch, getState) => {
	const api = endPoints.roles.list();
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: ROL_LIST, payload:{ list: res.data.rows } });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, toastOptions);
    dispatch({ type: ROLES_ERROR });
	}
};

export const getRolAction = (options) => async (dispatch, getState) => {
	const { id } = options;
	const api = endPoints.roles.get(id);
	try {
		const res = await axios.get(api);
		dispatch({ type: ROL_GET, payload: { results: res.data } });
	} catch (error) {
		// console.log(error);
		dispatch({ type: ROLES_ERROR });
	}
};

export const addRolAction = (options) => async (dispatch, getState) => {
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.roles.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Rol ${body.id}- ${body.nombre} ha sido agregado existosamente`, toastOptions);
		dispatch({ type: ROL_ADD, payload: [...getState().usuarios.list, res.data] });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No ha sea podido agregar el rol, porfavor revise los datos e intentelo más tarde`, toastOptions);
		toast.error(msg, toastOptions);	
		dispatch({ type: ROLES_ERROR });	
	}
};

export const updateRolAction = (options) => async (dispatch, getState) => {
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.roles.update(id); // URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().roles.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`El rol ${body.id} - ${body.nombre} ha sido modificado correctamente`, toastOptions);
		dispatch({  type: ROL_UPDATE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`El usuario ${body.username} no se ha podido actualizar.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: ROLES_ERROR });
	}
};

export const deleteRolAction = (options) => async (dispatch, getState) => {
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.roles.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().roles.list.filter((e)=> e.id !== id);

		toast.warning(`El rol con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: ROL_DELETE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No se ha podido eliminar el rol con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: ROLES_ERROR });
	}
};
