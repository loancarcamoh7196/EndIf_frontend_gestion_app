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
const TIENDA_LIST = 'TIENDA_LIST';
const TIENDA_GET = 'TIENDA_GET';
const TIENDA_ADD = 'TIENDA_ADD';
const TIENDA_UPDATE = 'TIENDA_UPDATE';
const TIENDA_DELETE = 'TIENDA_DELETE';
const TIENDA_ERROR = 'TIENDA_ERROR';

//Reducer
export default function tiendasReducer(state = dataInicial, action) {
	switch (action.type) {
		case TIENDA_ERROR:
			return { ...state, ...action.payload };
		case TIENDA_LIST:
			return { ...state, list: action.payload.list };
		case TIENDA_GET:
			return { ...state, ...action.payload };
    case TIENDA_ADD:
      return { ...state, list: action.payload };
		case TIENDA_UPDATE:
			return { ...state,  list: action.payload };
		case TIENDA_DELETE:
			return { ...state, list: 	action.payload };
		default:
			return { ...state };
	}
}

// Action
export const getTiendasAction = (options) => async (dispatch, getState) => {
	const api = endPoints.tiendas.list();
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: TIENDA_LIST, payload:{ list: res.data } });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, {...toastOptions});
    dispatch({ type: TIENDA_ERROR });
	}
};

export const getTiendaAction = (options) => async (dispatch, getState) => {
	const { id } = options;
	const api = endPoints.tiendas.get(id);
	try {
		const res = await axios.get(api);
		dispatch({ type: TIENDA_GET, payload: { results: res.data } });
	} catch (error) {
		// console.log(error);
		dispatch({ type: TIENDA_ERROR });
	}
};

export const addTiendaAction = (options) => async (dispatch, getState) => {
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.tiendas.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Sucursal ${body.id}- ${body.nombre} ha sido agregado existosamente`, {...toastOptions});
		dispatch({ type: TIENDA_ADD, payload: [...getState().tiendas.list, res.data] });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No ha sea podido agregar el rol, porfavor revise los datos e intentelo más tarde`, {...toastOptions});
		toast.error(msg, {...toastOptions});	
		dispatch({ type: TIENDA_ERROR });	
	}
};

export const updateTiendaAction = (options) => async (dispatch, getState) => {
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.tiendas.update(id); // URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().tiendas.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`Tienda ${body.id} - ${body.nombre} ha sido modificado correctamente`, {...toastOptions});
		dispatch({  type: TIENDA_UPDATE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`Tienda ${body.nombre} no se ha podido actualizar.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: TIENDA_ERROR });
	}
};

export const deleteTiendaAction = (options) => async (dispatch, getState) => {
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.tiendas.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().tiendas.list.filter((e)=> e.id !== id);

		toast.warning(`La tienda con ID: ${id} ha sido eliminado.`, {...toastOptions});
		dispatch({ type: TIENDA_DELETE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No se ha podido eliminar la tienda con ID: ${id}, porfavor vuelva intentarlo más tarde.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: TIENDA_ERROR });
	}
};
