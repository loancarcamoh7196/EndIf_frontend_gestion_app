/**
 * * Redux de contenedores Ventas
 * *  Ventas
 * ? nombre en store: ventas 
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toastOptions } from '@utils/texts/general';

//* Data inicial
const dataInicial = {
	list: [],
	loading: false,
	form: 0,
	prod: []
};

//* Types
const VENTA_LIST = 'VENTA_LIST';
const VENTA_ADD = 'VENTA_ADD';
const VENTA_UPDATE = 'VENTA_UPDATE';
const VENTA_DELETE = 'VENTA_DELETE';
const VENTA_ERROR = 'VENTA_ERROR';
const VENTA_LOADING = 'VENTA_LOADING';
const VENTA_SHOW = 'VENTA_SHOW';
const VENTA_PRODUCT_LIST = 'VENTA_PRODUCT_LIST';

//* Reducer
export default function ventasReducer(state = dataInicial, action) {
	switch (action.type) {
		case VENTA_ERROR:
			return { ...state, ...action.payload };
		case VENTA_LIST:
			return { ...state, list: action.payload.list };
    case VENTA_ADD:
      return { ...state, list: action.payload };
		case VENTA_UPDATE:
			return { ...state,  list: action.payload };
		case VENTA_DELETE:
			return { ...state, list: 	action.payload };
    case VENTA_LOADING:
      return { ...state, loading: action.payload };
    case VENTA_SHOW:
      return { ...state, form: action.payload };
		case VENTA_PRODUCT_LIST:
			return { ...state,  prod: action.payload };
		default:
			return { ...state };
	}
}

//* Action
export const getVentasAction = (options) => async (dispatch, getState) => {
	const api = endPoints.ventas.list();
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: VENTA_LIST, payload:{ list: res.data } });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, toastOptions);
    dispatch({ type: VENTA_ERROR });
	}
};

export const addVentaAction = (options) => async (dispatch, getState) => {
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.ventas.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Venta ${body.id}- ${body.nombre} ha sido agregado existosamente`, toastOptions);
		dispatch({ type: VENTA_ADD, payload: [...getState().ventas.list, res.data] });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No ha sea podido agregar el rol, porfavor revise los datos e intentelo más tarde`, toastOptions);
		toast.error(msg, toastOptions);	
		dispatch({ type: VENTA_ERROR });	
	}
};

export const updateVentaAction = (options) => async (dispatch, getState) => {
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.ventas.update(id); // URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().ventas.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`El rol ${body.id} - ${body.nombre} ha sido modificado correctamente`, toastOptions);
		dispatch({  type: VENTA_UPDATE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`El usuario ${body.username} no se ha podido actualizar.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: VENTA_ERROR });
	}
};

export const deleteVentaAction = (options) => async (dispatch, getState) => {
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.ventas.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().ventas.list.filter((e)=> e.id !== id);

		toast.warning(`El rol con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: VENTA_DELETE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No se ha podido eliminar el rol con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: VENTA_ERROR });
	}
};

export const productoListAddAction = (options) => async(dispatch, getState) => {
	const { producto } = options;
	// console.log(producto);
	dispatch({type: VENTA_PRODUCT_LIST, payload: [ ...getState().ventas.prod, producto ] });
}

