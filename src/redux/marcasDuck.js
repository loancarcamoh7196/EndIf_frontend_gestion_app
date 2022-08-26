/**
 ** Redux de contenedores Marcas
 *? nombre en store: marcas 
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
const MARCA_LIST = 'MARCA_LIST';
const MARCA_ADD = 'MARCA_ADD';
const MARCA_UPDATE = 'MARCA_UPDATE';
const MARCA_DELETE = 'MARCA_DELETE';
const MARCA_REFRESH = 'MARCA_REFRESH';
const MARCA_LOADING = 'MARCA_LOADING';
const MARCA_SHOW = 'MARCA_SHOW';
const MARCA_ERROR = 'MARCA_ERROR';

//* Reducer
export default function marcasReducer(state = dataInicial, action) {
	switch (action.type) {
		case MARCA_ERROR:
			return { ...state, ...action.payload };
		case MARCA_LIST:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
    case MARCA_ADD:
      return { ...state, list: action.payload.list, loading: action.payload.loading };
		case MARCA_UPDATE:
			return { ...state,  list: action.payload.list, loading: action.payload.loading };
		case MARCA_DELETE:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case MARCA_LOADING:
			return { ...state, loading: action.payload };
		case MARCA_SHOW:
			return { ...state, form: action.payload, formShow: true };
		default:
			return { ...state };
	}
}

//* Action
export const getMarcasAction = (options) => async (dispatch, getState) => {
	dispatch({ type: MARCA_LOADING, payload: true });
	const api = endPoints.marcas.list();
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: MARCA_LIST, payload:{ list: res.data, loading: false } });
	} catch (error) {
		dispatch({ type: MARCA_LOADING, payload: false });
		console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, {...toastOptions});
    dispatch({ type: MARCA_ERROR });
	}
};

export const addMarcaAction = (options) => async (dispatch, getState) => {
	dispatch({ type: MARCA_LOADING, payload: true });
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.marcas.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Marca ${body.id}- ${body.nombre} ha sido agregado existosamente`, {...toastOptions});
		dispatch({ type: MARCA_ADD, payload: { list: [...getState().marcas.list, res.data], loading: false} });
	} catch (error) {
		dispatch({ type: MARCA_LOADING, payload: false });
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No ha sea podido agregar el marca, porfavor revise los datos e intentelo más tarde`, {...toastOptions});
		toast.error(msg, {...toastOptions});	
		dispatch({ type: MARCA_ERROR });	
	}
};

export const updateMarcaAction = (options) => async (dispatch, getState) => {
	dispatch({ type: MARCA_LOADING, payload: true });
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.marcas.update(id); // URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().marcas.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`El marca ${body.id} - ${body.nombre} ha sido modificado correctamente`, {...toastOptions});
		dispatch({  type: MARCA_UPDATE, payload: { list: newList, loading: false }});
	} catch (error) {
		dispatch({ type: MARCA_LOADING, payload: false });
		// console.log(error);
		let msg = error.response.data;
		toast.error(`El usuario ${body.username} no se ha podido actualizar.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: MARCA_ERROR });
	}
};

export const deleteMarcaAction = (options) => async (dispatch, getState) => {
	dispatch({ type: MARCA_LOADING, payload: true });
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.marcas.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().marcas.list.filter((e)=> e.id !== id);

		toast.warning(`El marca con ID: ${id} ha sido eliminado.`, {...toastOptions});
		dispatch({ type: MARCA_DELETE, payload: { list: newList, loading: false} });
	} catch (error) {
		dispatch({ type: MARCA_LOADING, payload: false });
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No se ha podido eliminar el marca con ID: ${id}, porfavor vuelva intentarlo más tarde.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: MARCA_ERROR });
	}
};

export const showFormAction = (options) => async (dispatch, getState) => {
  const { id } = options;
  try {
    dispatch({ type: MARCA_SHOW, payload: id });
  } catch (error) {
    toast.error(`ERROR: Unidad ${id} no se ha podido cargar`, toastOptions)
    // toast.error(msg, toastOptions); // Comentar cuando pase a producción
    dispatch({ type: MARCA_ERROR });
  }
}

