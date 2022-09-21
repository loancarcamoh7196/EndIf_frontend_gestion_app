/**
 ** Redux de contenedores Tienda Lista Precio 
 *? nombre en store: tiendaListas
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
};

//* Types
const LISTA_LIST = 'LISTA_LIST';
const LISTA_ADD = 'LISTA_ADD';
const LISTA_UPDATE = 'LISTA_UPDATE';
const LISTA_DELETE = 'LISTA_DELETE';
const LISTAS_ERROR = 'LISTAS_ERROR';
const LISTA_LOADING = 'LISTA_LOADING';
const LISTA_SHOW = 'LISTA_SHOW';

//* Reducer
export default function tiendaListasReducer(state = dataInicial, action) {
	switch (action.type) {
		case LISTAS_ERROR:
			return { ...state, ...action.payload };
		case LISTA_LIST:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
    case LISTA_ADD:
      return { ...state, list: action.payload.list, loading: action.payload.loading };
		case LISTA_UPDATE:
			return { ...state, list: action.payload.list };
		case LISTA_DELETE:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case LISTA_LOADING:
			return { ...state, loading: action.payload };
		case LISTA_SHOW:
			return { ...state, form: action.payload };
		default:
			return { ...state };
	}
}

//* Action
export const getTiendaListasAction = (options) => async (dispatch, getState) => {
	dispatch({ type: LISTA_LOADING, payload: true });
	let api;
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);j
	try {
		const { tiendaId, listaPrecioId } = options;

		if (tiendaId != undefined && listaPrecioId != undefined) {
			api = endPoints.tiendaListaPrecio.list({tiendaId, listaPrecioId});
		}else if (tiendaId != undefined) {
			api = endPoints.tiendaListaPrecio.list({tiendaId});
		}else if (listaPrecioId != undefined){
			api = endPoints.tiendaListaPrecio.list({listaPrecioId});
		}else api = endPoints.tiendaListaPrecio.list();

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

export const addTiendaListaAction = (options) => async (dispatch, getState) => {
	dispatch({ type: LISTA_LOADING, payload: true });
	const { body } = options; //? Opciones para solicitud a  API
	const api = endPoints.tiendaListaPrecio.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Relación Tienda <-> Lista de Precio ha sido agregado existosamente`, toastOptions);
		dispatch({
			type: LISTA_ADD,
			payload:{
				list: [...getState().tiendaListas.list, res.data],
				loading: false
			} 
		});
	} catch (error) {
		dispatch({ type: LISTA_LOADING, payload: false });
		// console.log(error);
		toast.error(`No ha se podido agregar relacion Tienda - Lista, porfavor revise los datos e intentelo más tarde`, toastOptions);
		dispatch({ type: LISTAS_ERROR });	
	}
};

export const updateTiendaListaAction = (options) => async (dispatch, getState) => {
	dispatch({ type: LISTA_LOADING, payload: true });
	const { id, body } = options; //? Opciones para solicitud a  API
	const api = endPoints.tiendaListaPrecio.update(id); //? URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().tiendaListas.list.map(e => e.id == id ? res.data : e);
		toast.success(`Relación Tienda <-> Lista Precio con Id ${id} fue modificada exitosamente`, toastOptions);
		dispatch({
			type: LISTA_UPDATE, 
			payload: {
				list: newList,
				// loading: false
			} 
		});
		dispatch({ type: LISTA_LOADING, payload: false });
	} catch (error) {
		dispatch({ type: LISTA_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No ha se podido actualizar relacion Tienda - Lista.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: LISTAS_ERROR });
	}
};

export const deleteTiendaListaAction = (options) => async (dispatch, getState) => {
	dispatch({ type: LISTA_LOADING, payload: true });
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.tiendaListaPrecio.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().tiendaListas.list.filter((e)=> e.id != id);

		toast.warning(`La relación Tienda <-> Lista, con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: LISTA_DELETE, payload: { list: newList, loading: false } });
		
	} catch (error) {
		dispatch({ type: LISTA_LOADING, payload: false });
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No se ha podido eliminar la relación Tienda <-> Lista con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: LISTAS_ERROR });
	}
};

export const showFormAction = (options) => async (dispatch, getState) => {
  const { id } = options;

  try {
    dispatch({ type: LISTA_SHOW, payload: id });
  } catch (error) {
    toast.error(`Error: Tienda Lista de Precio ${id} no se ha podido cargar`, toastOptions)
    dispatch({ type: LISTAS_ERROR });
  }
}
