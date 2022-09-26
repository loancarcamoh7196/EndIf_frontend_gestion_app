/**
 ** Redux de contenedores Ofertas
 *? nombre en store: ofertas 
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toastOptions } from '@utils/texts/general';

//Data inicial
const dataInicial = {
	list: [],
	loading: false,
	form: 0
};

//Types
const OFERTA_LIST = 'OFERTA_LIST';
const OFERTA_ADD = 'OFERTA_ADD';
const OFERTA_UPDATE = 'OFERTA_UPDATE';
const OFERTA_DELETE = 'OFERTA_DELETE';
const OFERTA_LOADING = 'OFERTA_LOADING';
const OFERTA_SHOW = 'OFERTA_SHOW';
const OFERTA_ERROR = 'OFERTA_ERROR';

//Reducer
export default function ofertasReducer(state = dataInicial, action) {
	switch (action.type) {
		case OFERTA_ERROR:
			return { ...state, ...action.payload };
		case OFERTA_LIST:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
    case OFERTA_ADD:
      return { ...state, list: action.payload.list, loading: action.payload.loading };
		case OFERTA_UPDATE:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case OFERTA_DELETE:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case OFERTA_LOADING:
			return { ...state, loading: action.payload.loading };
		case OFERTA_SHOW:
			return { ...state, form: action.payload };
		default:
			return { ...state };
	}
}

// Action
export const getOfertasAction = (options) => async (dispatch, getState) => {
	dispatch({ type: OFERTA_LOADING, payload: true });
	const api = endPoints.ofertas.list();
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({
			type: OFERTA_LIST,
			payload: {
				list: res.data,
				loading: false
			}
		});

	} catch (error) {
		dispatch({ type: OFERTA_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, toastOptions);
    dispatch({ type: OFERTA_ERROR });
	}
};

export const addOfertaAction = (options) => async (dispatch, getState) => {
	dispatch({ type: OFERTA_LOADING, payload: true });
	const { body } = options; //? Opciones para solicitud a  API
	const api = endPoints.ofertas.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Oferta ${body.descripcion} ha sido agregado existosamente`, toastOptions);
		dispatch({
			type: OFERTA_ADD,
			payload: {
				list: [ ...getState().ofertas.list, res.data ],
				loading: false 
			}
		});
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No ha sea podido agregar la oferta, porfavor revise los datos e intentelo más tarde`, toastOptions);
		// toast.error(msg, toastOptions);	
		dispatch({ type: OFERTA_ERROR });	
	}
};

export const updateOfertaAction = (options) => async (dispatch, getState) => {
	dispatch({ type: OFERTA_LOADING, payload: true });
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.ofertas.update(id); // URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().ofertas.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`La oferta ${id} - ${body.descripcion} ha sido modificado correctamente`, toastOptions);
		dispatch({
			type: OFERTA_UPDATE,
			payload: {
				list: newList, 
				loading: false 
			} 
		});

	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`La oferta ${id} no se ha podido actualizar.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: OFERTA_ERROR });
	}
};

export const deleteOfertaAction = (options) => async (dispatch, getState) => {
	dispatch({ type: OFERTA_LOADING, payload: true });
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.ofertas.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().ofertas.list.filter((e)=> e.id !== id);

		toast.warning(`La oferta con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: OFERTA_DELETE, payload: { list: newList, loading: false } });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No se ha podido eliminar la oferta con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: OFERTA_ERROR });
	}
};

export const showFormAction = (options) => async (dispatch, getState) => {
  const { id } = options;

  try {
    dispatch({type: OFERTA_SHOW, payload: id });
  } catch (error) {
    toast.error(`ERROR: Oferta ${id} no se ha podido cargar`, toastOptions);
    dispatch({ type: OFERTA_SHOW });
  }
}
