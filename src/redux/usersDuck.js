import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';


//Data inicial
const dataInicial = {
	results: [],
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
const USERS_GET = 'USERS_GET';
const USER_GET = 'USER_GET';
const USER_ADD = 'USER_ADD';
const USER_NEW_SHOW = 'USER_NEW_SHOW';
const USER_UPDATE = 'USER_UPDATE';
const USER_EDIT_FORM = 'USER_EDIT_FORM';
const USER_DELETE = 'USER_DELETE';
const USERS_ERROR = 'USERS_ERROR';

//Reducer
export default function usersReducer(state = dataInicial, action) {
	switch (action.type) {
		case USERS_ERROR:
			return { ...state, ...action.payload };
		case USERS_GET:
			return { ...state, results: action.payload };
		case USER_GET:
			return { ...state, results: action.payload };
    case USER_ADD:
      return { ...state, results: action.payload };
		case USER_NEW_SHOW:
			return {...state, formNew: action.payload };
		case USER_UPDATE:
			return { ...state,  results: action.payload };
		case USER_EDIT_FORM:
			return { ...state, formEdit: action.payload };
		case USER_DELETE:
			return { ...state, results: action.payload };
		default:
			return { ...state };
	}
}

// Action
export const getUsersAction = (options) => async (dispatch, getState) => {
	const api = endPoints.users.getUsers();
	const { activo, token, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: USERS_GET, payload: res.data.body });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data.body;
		(loading==false && activo==true) ?  dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token') ;
		// toast.error(``, {...toastOptions});
    dispatch({ type: USERS_ERROR });
	}
};

export const getUserReportAction = (options) => async (dispatch, getState) => {
	const { id } = options;
	const { formNew, formEdit } = getState().users;
	const api = endPoints.users.getUser(id);
	try {
		const res = await axios.get(api);
		dispatch({ type: USER_GET, payload: { results: res.data.body } });
	} catch (error) {
		// console.log(error);
		dispatch({ type: USERS_ERROR });
	}
};

export const addUserAction = (options) => async (dispatch, getState) => {
	const { body } = options; // Opciones para solicitud a  API
	const { formNew, formEdit } = getState().users;
	const api = endPoints.users.addUser();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		const info = await axios.get(endPoints.users.getUsers());
		// console.log(res);
		toast.success(`Usuario ${body.username} ha sido agregada existosamente`, {...toastOptions});
		dispatch({ type: USER_ADD, payload: info.data.body });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data.body;
		toast.error(`No ha sea podido agregar el usuario, porfavor revise los datos e intentelo más tarde`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: USERS_ERROR });
	}
};

export const updateUserAction = (options) => async (dispatch, getState) => {
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.users.updateUser(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.patch(api, body);
		const info = await axios.get(endPoints.users.getUsers());
		toast.success(`El usuario ${body.username} ha sido modificado correctamente`, {...toastOptions});
		dispatch({  type: USER_UPDATE, payload: info.data.body });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data.body;
		toast.error(`El usuario ${body.username} no se ha podido actualizar.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: USERS_ERROR });
	}
};

export const deleteUserAction = (options) => async (dispatch) => {
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.users.deleteUser(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		toast.warning(`El usuario con ID: ${id} ha sido eliminado.`, {...toastOptions});
		dispatch({ type: USER_DELETE, payload: { results } });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data.body;
		toast.error(`No se ha podido eliminar el usario con ID: ${id}, porfavor vuelva intentarlo más tarde.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: USERS_ERROR });
	}
};

/**
 * 
 * @param {*} options 
 * @returns [action] Muestra formulario para Agregar
 */
export const formNewShowAction = (options) => async (dispatch, getState) => {
	const { formNew } = getState().users;

	try {
		dispatch({ type: USER_NEW_SHOW, payload: !formNew });
	} catch (error) {
		// console.log('Ha fallado al abrir formulario.')
		// console.log(error);
		dispatch({ type: USERS_ERROR });
	}
}
