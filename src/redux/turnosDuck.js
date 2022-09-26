/**
 ** Redux de contenedores Turnos
 *? nombre en store: turnos 
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toastOptions } from '../utils/texts/general';

//? Data inicial
const dataInicial = {
	list: [],
	loading: false,
	form: 0,
};

//? Types
const TURNO_LIST = 'TURNO_LIST';
const TURNO_ADD = 'TURNO_ADD';
const TURNO_UPDATE = 'TURNO_UPDATE';
const TURNO_DELETE = 'TURNO_DELETE';
const TURNO_ERROR = 'TURNO_ERROR';
const TURNO_LOADING = 'TURNO_LOADING';
const TURNO_SHOW = 'TURNO_SHOW';

//? Reducer
export default function turnosReducer(state = dataInicial, action) {
	switch (action.type) {
		case TURNO_ERROR:
			return { ...state, ...action.payload };
		case TURNO_LIST:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
    case TURNO_ADD:
      return { ...state, list: action.payload.list, loading: action.payload.loading };
		case TURNO_UPDATE:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case TURNO_DELETE:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case TURNO_LOADING:
			return { ...state, loading: action.payload };
		case TURNO_SHOW:
			return { ...state, form: action.payload };
		default:
			return { ...state };
	}
}

//* Action
export const getTurnosAction = (options) => async (dispatch, getState) => {
	dispatch({ type: TURNO_LOADING, payload: true });
	try {
		let api;
		const empresaRut = getState().auth.empresaSession;

		if (empresaRut != undefined) {
			api = endPoints.turnos.list({ empresaRut });
		} else api = endPoints.turnos.list();

		// console.log(api);
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: TURNO_LIST, payload:{ list: res.data, loading: false } });
	} catch (error) {
		dispatch({ type: TURNO_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, toastOptions);
    dispatch({ type: TURNO_ERROR });
	}
};

export const addTurnoAction = (options) => async (dispatch, getState) => {
	dispatch({ type: TURNO_LOADING, payload: true });
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.turnos.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Turno ${res}.id}- ${body.nombre} ha sido agregado existosamente`, toastOptions);
		dispatch({
			type: TURNO_ADD,
			payload: {
				list: [...getState().turnos.list, res.data],
				loading: false
			}
		});
	} catch (error) {
		dispatch({ type: TURNO_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No ha sea podido agregar el turno, porfavor revise los datos e intentelo más tarde`, toastOptions);
		// toast.error(msg, toastOptions);	
		dispatch({ type: TURNO_ERROR });	
	}
};

export const updateTurnoAction = (options) => async (dispatch, getState) => {
	dispatch({ type: TURNO_LOADING, payload: true });
	const { id, body } = options; //? Opciones para solicitud a  API
	const api = endPoints.turnos.update(id); //? URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().turnos.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`El turno ${id} - ${body.nombre} ha sido modificado correctamente`, toastOptions);
		dispatch({
			type: TURNO_UPDATE,
			payload: {
				list: newList,
				loading: false 
			}
		});
	} catch (error) {
		dispatch({ type: TURNO_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`El turno ${id} no se ha podido actualizar.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: TURNO_ERROR });
	}
};

export const deleteTurnoAction = (options) => async (dispatch, getState) => {
	const { id } = options; //? Opciones para solicitud a  API
	const api = endPoints.turnos.delete(id); //? URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().turnos.list.filter((e)=> e.id !== id);

		toast.warning(`El turno con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: TURNO_DELETE, payload: { list: newList, loading: false } });
	} catch (error) {
		dispatch({ type: TURNO_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No se ha podido eliminar el turno con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: TURNO_ERROR });
	}
};

export const showFormAction = (options) => async (dispatch, getState) => {
  const { id } = options;

  try {
    dispatch({type: TURNO_SHOW, payload: id });
  } catch (error) {
    toast.error(`ERROR: Unidad ${id} no se ha podido cargar`, toastOptions);
    dispatch({ type: TURNO_ERROR });
  }
}
