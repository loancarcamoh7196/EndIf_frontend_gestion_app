/**
 ** Redux de contenedores Unidad
 *? nombre en store: unidades 
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toastOptions } from '@utils/texts/general';

//* Data inicial
const dataInicial = {
	list: [],
	form: '',
	loading: false,
};

//* Types
const UNIDAD_LIST = 'UNIDAD_LIST';
const UNIDAD_GET = 'UNIDAD_GET';
const UNIDAD_ADD = 'UNIDAD_ADD';
const UNIDAD_UPDATE = 'UNIDAD_UPDATE';
const UNIDAD_DELETE = 'UNIDAD_DELETE';
const UNIDAD_SHOW = 'UNIDAD_SHOW';
const UNIDAD_LOADING = 'UNIDAD_LOADING';
const UNIDAD_ERROR = 'UNIDAD_ERROR';

//* Reducer
export default function unidadesReducer(state = dataInicial, action) {
	switch (action.type) {
		case UNIDAD_ERROR:
			return { ...state, ...action.payload };
		case UNIDAD_LIST:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case UNIDAD_GET:
			return { ...state, ...action.payload };
    case UNIDAD_ADD:
      return { ...state, list: action.payload };
		case UNIDAD_UPDATE:
			return { ...state, list: action.payload };
		case UNIDAD_DELETE:
			return { ...state, list: action.payload };
		case UNIDAD_SHOW:
			return { ...state, form: action.payload };
		case UNIDAD_LOADING:
			return { ...state, loading: action.payload };
		default:
			return { ...state };
	}
}

//* Action
export const getUnidadesAction = (options) => async (dispatch, getState) => {
	dispatch({ type: UNIDAD_LOADING, payload: true });
	const api = endPoints.unidades.list();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: UNIDAD_LIST, payload:{ list: res.data} });
		dispatch({ type: UNIDAD_LOADING, payload: false });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(error, toastOptions);
		dispatch({ type: UNIDAD_LOADING, payload: false });
    dispatch({ type: UNIDAD_ERROR });
	}
};

export const addUnidadAction = (options) => async (dispatch, getState) => {
	dispatch({ type: UNIDAD_LOADING, payload: true });
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.unidades.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Unidad ${res.data.id} - ${res.data.nombre} ha sido agregado existosamente`, toastOptions);
		dispatch({ type: UNIDAD_ADD, payload: [...getState().unidades.list, res.data]});
		dispatch({ type: UNIDAD_LOADING, payload: false });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No ha sea podido agregar unidad, porfavor revise los datos e intentelo más tarde`, toastOptions);
		// toast.error(msg, toastOptions);	
		dispatch({ type: UNIDAD_ERROR });	
	}
};

export const updateUnidadAction = (options) => async (dispatch, getState) => {
	dispatch({ type: UNIDAD_LOADING, payload: true });
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.unidades.update(id); // URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().unidades.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`La unidad ${id} ha sido modificado correctamente`, toastOptions);
		dispatch({  type: UNIDAD_UPDATE, payload: newList });
		dispatch({ type: UNIDAD_LOADING, payload: false });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`El usuario ${body.username} no se ha podido actualizar.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: UNIDAD_ERROR });
	}
};

export const deleteUnidadAction = (options) => async (dispatch, getState) => {
	dispatch({ type: UNIDAD_LOADING, payload: true });
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.unidades.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().unidades.list.filter((e)=> e.id !== id);

		toast.warning(`El rol con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: UNIDAD_DELETE, payload: newList });
		dispatch({ type: UNIDAD_LOADING, payload: false });
	} catch (error) {
		dispatch({ type: UNIDAD_LOADING, payload: false });
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No se ha podido eliminar el rol con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: UNIDAD_ERROR });
	}
};

export const showFormAction = (options) => async (dispatch, getState) => {
  const { id } = options;
  try {
    dispatch({type: UNIDAD_SHOW, payload: id });
  } catch (error) {
    toast.error(`ERROR: Unidad ${id} no se ha podido cargar`, toastOptions)
    // toast.error(msg, toastOptions); // Comentar cuando pase a producción
    dispatch({ type: UNIDAD_ERROR });
  }
}

