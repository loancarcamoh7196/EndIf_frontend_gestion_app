/**
 ** Redux de contenedores Forma de Pago
 *? nombre en store: formaPago 
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
	form: 0
};

//* Types
const FORMA_PAGO_LIST = 'FORMA_PAGO_LIST';
const FORMA_PAGO_ADD = 'FORMA_PAGO_ADD';
const FORMA_PAGO_UPDATE = 'FORMA_PAGO_UPDATE';
const FORMA_PAGO_DELETE = 'FORMA_PAGO_DELETE';
const FORMAS_PAGO_ERROR = 'FORMAS_PAGO_ERROR';
const FORMA_PAGO_LOADING = 'FORMA_PAGO_LOADING';
const FORMA_PAGO_SHOW = 'FORMA_PAGO_SHOW';

//* Reducer
export default function formasPagoReducer(state = dataInicial, action) {
	switch (action.type) {
		case FORMAS_PAGO_ERROR:
			return { ...state, ...action.payload };
		case FORMA_PAGO_LIST:
			return { ...state, list: action.payload.list };
    case FORMA_PAGO_ADD:
      return { ...state, list: action.payload };
		case FORMA_PAGO_UPDATE:
			return { ...state,  list: action.payload };
		case FORMA_PAGO_DELETE:
			return { ...state, list: 	action.payload };
		case FORMA_PAGO_LOADING:
			return { ...state, loading: action.payload };
		case FORMA_PAGO_SHOW:
			return { ...state, form: action.payload };
		default:
			return { ...state };
	}
}

//* Action
export const getFormasPagoAction = (options) => async (dispatch, getState) => {
	// dispatch({ type: FORMA_PAGO_LOADING, payload: true });
	const api = endPoints.formasPago.list();
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: FORMA_PAGO_LIST, payload:{ list: res.data } });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, toastOptions);
    dispatch({ type: FORMAS_PAGO_ERROR });
	}
};

export const addFormaPagoAction = (options) => async (dispatch, getState) => {
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.formasPago.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`FormaPago ${body.id}- ${body.nombre} ha sido agregado existosamente`, toastOptions);
		dispatch({ type: FORMA_PAGO_ADD, payload: [...getState().usuarios.list, res.data] });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No ha sea podido agregar el rol, porfavor revise los datos e intentelo más tarde`, toastOptions);
		// toast.error(msg, toastOptions);	
		dispatch({ type: FORMAS_PAGO_ERROR });	
	}
};

export const updateFormaPagoAction = (options) => async (dispatch, getState) => {
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.formasPago.update(id); // URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().formasPago.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`El rol ${body.id} - ${body.nombre} ha sido modificado correctamente`, toastOptions);
		dispatch({  type: FORMA_PAGO_UPDATE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`El usuario ${body.username} no se ha podido actualizar.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: FORMAS_PAGO_ERROR });
	}
};

export const deleteFormaPagoAction = (options) => async (dispatch, getState) => {
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.formasPago.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().formasPago.list.filter((e)=> e.id !== id);

		toast.warning(`El rol con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: FORMA_PAGO_DELETE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No se ha podido eliminar el rol con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: FORMAS_PAGO_ERROR });
	}
};
