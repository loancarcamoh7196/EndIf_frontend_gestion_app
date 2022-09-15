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
};

//Types
const OFERTA_LIST = 'OFERTA_LIST';
const OFERTA_ADD = 'OFERTA_ADD';
const OFERTA_UPDATE = 'OFERTA_UPDATE';
const OFERTA_DELETE = 'OFERTA_DELETE';
const OFERTA_ERROR = 'OFERTA_ERROR';

//Reducer
export default function ofertasReducer(state = dataInicial, action) {
	switch (action.type) {
		case OFERTA_ERROR:
			return { ...state, ...action.payload };
		case OFERTA_LIST:
			return { ...state, list: action.payload.list };
    case OFERTA_ADD:
      return { ...state, list: action.payload };
		case OFERTA_UPDATE:
			return { ...state,  list: action.payload };
		case OFERTA_DELETE:
			return { ...state, list: 	action.payload };
		default:
			return { ...state };
	}
}

// Action
export const getOfertasAction = (options) => async (dispatch, getState) => {
	const api = endPoints.ofertas.list();
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: OFERTA_LIST, payload:{ list: res.data } });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, {...toastOptions});
    dispatch({ type: OFERTA_ERROR });
	}
};

export const addOfertaAction = (options) => async (dispatch, getState) => {
	const { body } = options; //? Opciones para solicitud a  API
	const api = endPoints.ofertas.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Oferta ${body.id}- ${body.nombre} ha sido agregado existosamente`, {...toastOptions});
		dispatch({ type: OFERTA_ADD, payload: [...getState().ofertas.list, res.data] });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No ha sea podido agregar la oferta, porfavor revise los datos e intentelo más tarde`, {...toastOptions});
		toast.error(msg, {...toastOptions});	
		dispatch({ type: OFERTA_ERROR });	
	}
};

export const updateOfertaAction = (options) => async (dispatch, getState) => {
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.ofertas.update(id); // URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().ofertas.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`El oferta ${body.id} - ${body.nombre} ha sido modificado correctamente`, {...toastOptions});
		dispatch({  type: OFERTA_UPDATE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`El usuario ${body.username} no se ha podido actualizar.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: OFERTA_ERROR });
	}
};

export const deleteOfertaAction = (options) => async (dispatch, getState) => {
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.ofertas.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().ofertas.list.filter((e)=> e.id !== id);

		toast.warning(`El oferta con ID: ${id} ha sido eliminado.`, {...toastOptions});
		dispatch({ type: OFERTA_DELETE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No se ha podido eliminar la oferta con ID: ${id}, porfavor vuelva intentarlo más tarde.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: OFERTA_ERROR });
	}
};
