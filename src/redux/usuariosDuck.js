import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';

//Data inicial
const dataInicial = {
	res: [],
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
const USUARIOS_GET = 'USUARIOS_GET';
const USUARIO_GET = 'USUARIO_GET';
const USUARIO_ADD = 'USUARIO_ADD';
const USUARIO_NEW_SHOW = 'USUARIO_NEW_SHOW';
const USUARIO_UPDATE = 'USUARIO_UPDATE';
const USUARIO_EDIT_FORM = 'USUARIO_EDIT_FORM';
const USUARIO_DELETE = 'USUARIO_DELETE';
const USUARIOS_ERROR = 'USUARIOS_ERROR';

//Reducer
export default function usuariosReducer(state = dataInicial, action) {
	switch (action.type) {
		case USUARIOS_ERROR:
			return { ...state, ...action.payload };
		case USUARIOS_GET:
			return { ...state, results: action.payload };
		case USUARIO_GET:
			return { ...state, results: action.payload };
    case USUARIO_ADD:
      return { ...state, results: action.payload };
		case USUARIO_NEW_SHOW:
			return {...state, formNew: action.payload };
		case USUARIO_UPDATE:
			return { ...state,  results: action.payload };
		case USUARIO_EDIT_FORM:
			return { ...state, formEdit: action.payload };
		case USUARIO_DELETE:
			return { ...state, ...action.payload };
		default:
			return { ...state };
	}
}

// Action
export const getUsuariosAction = (options) => async (dispatch, getState) => {
	const api = endPoints.usuarios.get();
	const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: USUARIOS_GET, payload: res.data });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		(loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token') ;
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
	const { formNew, formEdit } = getState().usuarios;
	const api = endPoints.usuarios.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		const info = await axios.get(endPoints.usuarios.getUsuarios());
		// console.log(res);
		toast.success(`Usuario ${body.username} ha sido agregada existosamente`, {...toastOptions});
		dispatch({ type: USUARIO_ADD, payload: info.data });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data.body;
		toast.error(`No ha sea podido agregar el usuario, porfavor revise los datos e intentelo más tarde`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: USUARIOS_ERROR });
	}
};

export const updateUsuarioAction = (options) => async (dispatch, getState) => {
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.usuarios.update(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.patch(api, body);
		const info = await axios.get(endPoints.usuarios.getUsuarios());
		toast.success(`El usuario ${body.username} ha sido modificado correctamente`, {...toastOptions});
		dispatch({  type: USUARIO_UPDATE, payload: info.data.body });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data.body;
		toast.error(`El usuario ${body.username} no se ha podido actualizar.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: USUARIOS_ERROR });
	}
};

export const deleteUsuarioAction = (options) => async (dispatch) => {
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.usuarios.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		toast.warning(`El usuario con ID: ${id} ha sido eliminado.`, {...toastOptions});
		dispatch({ type: USUARIO_DELETE });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data.body;
		toast.error(`No se ha podido eliminar el usario con ID: ${id}, porfavor vuelva intentarlo más tarde.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: USUARIOS_ERROR });
	}
};

/**
 * 
 * @param {*} options 
 * @returns [action] Muestra formulario para Agregar
 */
export const formNewShowAction = (options) => async (dispatch, getState) => {
	const { formNew } = getState().usuarios;

	try {
		dispatch({ type: USUARIO_NEW_SHOW, payload: !formNew });
	} catch (error) {
		// console.log('Ha fallado al abrir formulario.')
		// console.log(error);
		dispatch({ type: USUARIOS_ERROR });
	}
}
