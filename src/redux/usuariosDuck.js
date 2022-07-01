import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';

//Data inicial
const dataInicial = {
	list: [],
	unidad: {},
	formNew: false,
	formEdit: false
};

const toastOptions = {
	position: "top-right",
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

//Types
const USUARIO_LIST = 'USUARIO_LIST';
const USUARIO_GET = 'USUARIO_GET';
const USUARIO_ADD = 'USUARIO_ADD';
const USUARIO_UPDATE = 'USUARIO_UPDATE';
const USUARIO_DELETE = 'USUARIO_DELETE';
const USUARIOS_ERROR = 'USUARIOS_ERROR';

//Reducer
export default function usuariosReducer(state = dataInicial, action) {
	switch (action.type) {
		case USUARIOS_ERROR:
			return { ...state, ...action.payload };
		case USUARIO_LIST:
			return { ...state, list: action.payload.list };
		case USUARIO_GET:
			return { ...state, ...action.payload };
    case USUARIO_ADD:
      return { ...state, list: action.payload };
		case USUARIO_UPDATE:
			return { ...state,  list: action.payload };
		case USUARIO_DELETE:
			return { ...state, list: 	action.payload };
		default:
			return { ...state };
	}
}

// Action
export const getUsuariosAction = (options) => async (dispatch, getState) => {
	const api = endPoints.usuarios.list();
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: USUARIO_LIST, payload:{ list: res.data } });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, {...toastOptions});
    dispatch({ type: USUARIOS_ERROR });
	}
};

export const getUsuarioAction = (options) => async (dispatch, getState) => {
	const { id } = options;
	const { formNew, formEdit } = getState().usuarios;
	const api = endPoints.usuarios.get(id);
	try {
		const res = await axios.get(api);
		dispatch({ type: USUARIO_GET, payload: { results: res.data } });
	} catch (error) {
		// console.log(error);
		dispatch({ type: USUARIOS_ERROR });
	}
};

export const addUsuarioAction = (options) => async (dispatch, getState) => {
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.usuarios.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Usuario ${body.username} ha sido agregado existosamente`, {...toastOptions});
		dispatch({ type: USUARIO_ADD, payload: [...getState().usuarios.list, res.data] });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No ha sea podido agregar el usuario, porfavor revise los datos e intentelo más tarde`, {...toastOptions});
		toast.error(msg, {...toastOptions});	
		dispatch({ type: USUARIOS_ERROR });	
	}
};

export const updateUsuarioAction = (options) => async (dispatch, getState) => {
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.usuarios.update(id); // URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().usuarios.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`El usuario ${body.username} ha sido modificado correctamente`, {...toastOptions});
		dispatch({  type: USUARIO_UPDATE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`El usuario ${body.username} no se ha podido actualizar.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: USUARIOS_ERROR });
	}
};

export const deleteUsuarioAction = (options) => async (dispatch, getState) => {
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.usuarios.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().usuarios.list.filter((e)=> e.id !== id);

		toast.warning(`El usuario con ID: ${id} ha sido eliminado.`, {...toastOptions});
		dispatch({ type: USUARIO_DELETE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No se ha podido eliminar el usario con ID: ${id}, porfavor vuelva intentarlo más tarde.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: USUARIOS_ERROR });
	}
};