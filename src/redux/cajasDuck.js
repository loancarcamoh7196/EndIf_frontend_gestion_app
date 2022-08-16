/**
 ** Redux de contenedores Cajas
 *? nombre en store: cajas 
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toastOptions } from '@utils/texts/general';

//? Data inicial
const dataInicial = {
	list: [],
	loading: false,
};

//? Types
const CAJA_LIST = 'CAJA_LIST';
const CAJA_ADD = 'CAJA_ADD';
const CAJA_UPDATE = 'CAJA_UPDATE';
const CAJA_DELETE = 'CAJA_DELETE';
const CAJA_ERROR = 'CAJA_ERROR';
const CAJA_LOADING = 'CAJA_LOADING';

//? Reducer
export default function cajasReducer(state = dataInicial, action) {
	switch (action.type) {
		case CAJA_ERROR:
			return { ...state, ...action.payload };
		case CAJA_LIST:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
    case CAJA_ADD:
      return { ...state, list: action.payload };
		case CAJA_UPDATE:
			return { ...state, list: action.payload };
		case CAJA_DELETE:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case CAJA_LOADING:
			return { ...state, loading: action.payload };
		default:
			return { ...state };
	}
}

//? Action
export const getCajasAction = (options) => async (dispatch, getState) => {
	dispatch({ type: CAJA_LOADING, payload: true });
	const empresa = getState().auth.empresaSession;
	try {
		const api = endPoints.cajas.list(empresa);
		// const { activo, loading } = getState().user;
		// console.log(body);
		// console.log(api);
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: CAJA_LIST, payload:{ list: res.data, loading: false } });
	} catch (error) {
		dispatch({ type: CAJA_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, toastOptions);
    dispatch({ type: CAJA_ERROR });
	}
};

export const addCajaAction = (options) => async (dispatch, getState) => {
	const { body } = options; //? Opciones para solicitud a API
	const api = endPoints.cajas.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Caja ${res.data.id} - ${body.nombre} ha sido agregado existosamente`, toastOptions);
		dispatch({ type: CAJA_ADD, payload: [...getState().cajas.list, res.data] });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No ha sea podido agregar la caja, porfavor revise los datos e intentelo más tarde`, toastOptions);
		// toast.error(msg, toastOptions);	
		dispatch({ type: CAJA_ERROR });	
	}
};

export const updateCajaAction = (options) => async (dispatch, getState) => {
	const { id, body } = options; //? Opciones para solicitud a  API
	const api = endPoints.cajas.update(id); //? URL API
	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().cajas.list.map((e) =>  e.id == id ? res.data : e );
		toast.success(`La caja ${res.data.id} - ${body.nombre} ha sido modificado correctamente`, toastOptions);
		dispatch({  type: CAJA_UPDATE, payload: newList });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`La caja ID: ${id} no se ha podido actualizar.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: CAJA_ERROR });
	}
};

export const deleteCajaAction = (options) => async (dispatch, getState) => {
	dispatch({ type: CAJA_LOADING, payload: true });
	const { id } = options; //? Opciones para solicitud a  API
	const api = endPoints.cajas.delete(id); //? URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().cajas.list.filter((e)=> e.id != id);
		toast.warning(`La caja con ID: ${id} ha sido eliminada.`, toastOptions);
		dispatch({ type: CAJA_DELETE, payload: { list: newList, loading: false }});
	} catch (error) {
		dispatch({ type: CAJA_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No se ha podido eliminar la caja con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: CAJA_ERROR });
	}
};
