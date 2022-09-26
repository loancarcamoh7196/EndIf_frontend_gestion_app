/**
 ** Redux de contenedores Promociones
 *? nombre en store: promociones 
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toastOptions } from '../utils/texts/general';

//*  Data inicial
const dataInicial = {
	list: [],
	loading: false,
	form: 0,
};

//* Types
const PROMO_LIST = 'PROMO_LIST';
const PROMO_GET = 'PROMO_GET';
const PROMO_ADD = 'PROMO_ADD';
const PROMO_UPDATE = 'PROMO_UPDATE';
const PROMO_DELETE = 'PROMO_DELETE';
const PROMO_ERROR = 'PROMO_ERROR';
const PROMO_LOADING = 'PROMO_LOADING';
const PROMO_SHOW = 'PROMO_SHOW';

//* Reducer
export default function promocionesReducer(state = dataInicial, action) {
	switch (action.type) {
		case PROMO_ERROR:
			return { ...state, ...action.payload };
		case PROMO_LIST:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
    case PROMO_ADD:
      return { ...state, list: action.payload.list, loading: action.payload.loading  };
		case PROMO_UPDATE:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case PROMO_DELETE:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case PROMO_LOADING:
			return { ...state, loading: action.payload };
		case PROMO_SHOW:
			return {  ...state, form: action.payload };
		default:
			return { ...state };
	}
}

//* Action
export const getPromocionesAction = (options) => async (dispatch, getState) => {
	dispatch({ type: PROMO_LOADING, payload: true });
	
	const api = endPoints.promociones.list();
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: PROMO_LIST, payload:{ list: res.data, loading: false } });
	} catch (error) {
		dispatch({ type: PROMO_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, toastOptions);
    dispatch({ type: PROMO_ERROR });
	}
};

export const getPromocionAction = (options) => async (dispatch, getState) => {
	dispatch({ type: PROMO_LOADING, payload: true });
	const { id } = options;
	const api = endPoints.promociones.get(id);
	try {
		const res = await axios.get(api);
		dispatch({ type: PROMO_GET, payload: { list: res.data, loading: false } });
	} catch (error) {
		dispatch({ type: PROMO_LOADING, payload: false });
		// console.log(error);
		dispatch({ type: PROMO_ERROR });
	}
};

export const addPromocionAction = (options) => async (dispatch, getState) => {
	dispatch({ type: PROMO_LOADING, payload: true });
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.promociones.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Promocion ${res.data.id}- ${res.data.nombre} ha sido agregado existosamente`, toastOptions);
		dispatch({
			type: PROMO_ADD,
			payload: {
				list: [...getState().promociones.list, res.data],
				loading: false
			}
		});
	} catch (error) {
		dispatch({ type: PROMO_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No ha sea podido agregar la promocion, porfavor revise los datos e intentelo más tarde`, toastOptions);
		// toast.error(msg, toastOptions);	
		dispatch({ type: PROMO_ERROR });	
	}
};

export const updatePromocionAction = (options) => async (dispatch, getState) => {
	dispatch({ type: PROMO_LOADING, payload: true });
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.promociones.update(id); // URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().promociones.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`La promocion ${id} - ${res.data.nombre} ha sido modificado correctamente`, toastOptions);
		dispatch({
			type: PROMO_UPDATE,
			payload: { list: newList, loading: false } 
		});
	} catch (error) {
		dispatch({ type: PROMO_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`La promocion ${body.username} no se ha podido actualizar.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: PROMO_ERROR });
	}
};

export const deletePromocionAction = (options) => async (dispatch, getState) => {
	dispatch({ type: PROMO_LOADING, payload: false });
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.promociones.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().promociones.list.filter((e)=> e.id !== id);

		toast.warning(`La promocion con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({
			type: PROMO_DELETE,
			payload: {
				list: newList,
				loading: false
			}
		});
	} catch (error) {
		dispatch({ type: PROMO_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No se ha podido eliminar la promocion con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: PROMO_ERROR });
	}
};

export const showFormAction = (options) => async (dispatch, getState) => {
  const { id } = options;

  try {
    dispatch({type: PROMO_SHOW, payload: id });
  } catch (error) {
    toast.error(`ERROR: Unidad ${id} no se ha podido cargar`, toastOptions);
    dispatch({ type: PROMO_ERROR });
  }
}
