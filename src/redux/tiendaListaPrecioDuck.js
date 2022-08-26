/**
 ** Redux de contenedores Tienda Lista Precio 
 *? nombre en store: tiendaLista
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toastOptions } from '../utils/texts/general';

//* Data inicial
const dataInicial = {
	list: [],
	loading: false,
};

//* Types
const LISTA_LIST = 'LISTA_LIST';
const LISTA_ADD = 'LISTA_ADD';
const LISTA_UPDATE = 'LISTA_UPDATE';
const LISTA_DELETE = 'LISTA_DELETE';
const LISTAS_ERROR = 'LISTAS_ERROR';
const LISTA_LOADING = 'LISTA_LOADING';

//* Reducer
export default function tiendaListasReducer(state = dataInicial, action) {
	switch (action.type) {
		case LISTAS_ERROR:
			return { ...state, ...action.payload };
		case LISTA_LIST:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
    case LISTA_ADD:
      return { ...state, list: action.payload };
		case LISTA_UPDATE:
			return { ...state, list: action.payload };
		case LISTA_DELETE:
			return { ...state, list: 	action.payload };
		case LISTA_LOADING:
			return { ...state, loading: action.payload };
		default:
			return { ...state };
	}
}

//* Action
export const getListasAction = (options) => async (dispatch, getState) => {
	dispatch({ type: LISTA_LOADING, payload: true });
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const { tiendaId, listaPrecioId } = options;
		const api = endPoints.tiendaLista.list({tiendaId});
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: LISTA_LIST, payload:{ list: res.data, loading: false } });
	} catch (error) {
		dispatch({ type: LISTA_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, toastOptions);
    dispatch({ type: LISTAS_ERROR });
	}
};

export const addListaAction = (options) => async (dispatch, getState) => {
	dispatch({ type: LISTA_LOADING, payload: true });
	const { body } = options; //? Opciones para solicitud a  API
	const api = endPoints.tiendaLista.add();
	// console.log(body);
	// console.log(api);
	try {
		const { tiendaId } = body;
		delete body.tiendaId;
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Lista ${body.id}- ${body.nombre} ha sido agregado existosamente`, toastOptions);
		dispatch({ type: LISTA_ADD, payload: [...getState().usuarios.list, res.data] });

		try {
			const apiLista = endPoints.tiendaListaPrecio.add();
			const res2 = await axios.post(apiLista, { tiendaId, listaPrecioId: res.id });
			toast.success(`Relación  Tienda <-> Lista Precio agrega exitosamente`, toastOptions);
		} catch (error) {
			toast.error('No ha se podido agregar relacion Tienda - Lista', toastOptions);
		}

		dispatch({ type: LISTA_LOADING, payload: false });

	} catch (error) {
		dispatch({ type: LISTA_LOADING, payload: false });
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No ha sea podido agregar el lista, porfavor revise los datos e intentelo más tarde`, toastOptions);
		toast.error(msg, toastOptions);	
		dispatch({ type: LISTAS_ERROR });	
	}
};

export const updateListaAction = (options) => async (dispatch, getState) => {
	dispatch({ type: LISTA_LOADING, payload: true });
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.tiendaLista.update(id); // URL API

	try {
		const { tiendaId } = body;
		delete body.tiendaId;
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().tiendaLista.list.map((e) =>  e.id === id ? res.data : e );

		try {
			const apiLista = endPoints.tiendaListaPrecio.add();
			const res2 = await axios.post(apiLista, { tiendaId, listaPrecioId: res.id });
			toast.success(`Relación  Tienda <-> Lista Precio modificada exitosamente`, toastOptions);
		} catch (error) {
			toast.error('No ha se podido agregar relacion Tienda - Lista', toastOptions);
		}

		toast.success(`La lista ${body.id} - ${body.nombre} ha sido modificado correctamente`, toastOptions);
		dispatch({  type: LISTA_UPDATE, payload: { list: newList, loading: false } });
	} catch (error) {
		dispatch({ type: LISTA_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`La lista ${body.nombre} no se ha podido actualizar.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: LISTAS_ERROR });
	}
};

export const deleteListaAction = (options) => async (dispatch, getState) => {
	dispatch({ type: LISTA_LOADING, payload: true });
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.tiendaLista.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().tiendaLista.list.filter((e)=> e.id !== id);

		toast.warning(`La lista con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: LISTA_DELETE, payload: { list: newList, loading: false } });
	} catch (error) {
		dispatch({ type: LISTA_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No se ha podido eliminar la lista con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: LISTAS_ERROR });
	}
};
