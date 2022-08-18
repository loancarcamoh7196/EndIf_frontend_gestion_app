/**
 * * Redux de mantenedor Productos
 * ? nombre en store: productos
 */
import axios from 'axios';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck'
import { toast } from 'react-toastify';
import { toastOptions } from '@utils/texts/general';
import { product } from '@utils/texts/modGestion';

//* Constantes
const dataInicial = {
	list: [],
	loading: false,
  form: 0,
}

//* Types
const PRODUCTO_ERROR = 'PRODUCTO_ERROR';
const PRODUCTOS_LIST = 'PRODUCTOS_LIST';
const PRODUCTO_UPDATE = 'PRODUCTO_UPDATE';
const PRODUCTO_ADD = 'PRODUCTO_ADD';
const PRODUCTO_DELETE = 'PRODUCTO_DELETE';
const PRODUCTO_LOADING = 'PRODUCTO_LOADING';
const PRODUCTO_SHOW = 'PRODUCTO_SHOW'

//* Reducer
export default function productosReducer(state = dataInicial, action){
	switch (action.type) {
		case PRODUCTO_ERROR:
			return { ...state, ...action.payload };
		case PRODUCTOS_LIST:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case PRODUCTO_UPDATE:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case PRODUCTO_ADD:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case PRODUCTO_DELETE:
			return { ...state, list: action.payload.list, loading: action.payload.loading };
		case PRODUCTO_LOADING:
			return { ...state, loading: action.payload };
		case PRODUCTO_SHOW:
			return { ...state, form: action.payload }
		default:
			return state;
	}
}

//* Acciones
export const getProductosAction= (options) => async (dispatch, getState) => {
	dispatch({ type: PRODUCTO_LOADING, payload: true });
	
	try {
		const empresaRut = getState().auth.empresaSession;
		const api = endPoints.productos.list(empresaRut);
		const res = await axios.get(api);
		dispatch({ type: PRODUCTOS_LIST, payload: { list: res.data, loading: false } });
	} catch (error) {
		dispatch({ type: PRODUCTO_LOADING, payload: false });
		// const {loading, activo} = getState().user;
		// if (!loading && activo) dispatch(refreshTokenAction());
		// else console.log('No ha podido refrescar token');
		dispatch({ type: PRODUCTO_ERROR });
	}
}

export const addProductoAction = (options) => async (dispatch, getState) => {
	dispatch({ type: PRODUCTO_LOADING, payload: true });
	const { body } = options; //? Opciones para solicitud a  API
	const api = endPoints.productos.add();

	try {
		body.empresaRut = getState().auth.empresaSession;
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Producto ${res.data.id} - ${res.data.nombre} ha sido agregada existosamente`, toastOptions);
		dispatch({
			type: PRODUCTO_ADD, 
			payload: { 
				list: [ ...getState().productos.list , res.data ],
				loading: false
			}
		});
	} catch (error) {
		dispatch({ type: PRODUCTO_LOADING, payload: false });
		toast.error(product.txt.errAdd, toastOptions);
		dispatch({ type: PRODUCTO_ERROR });
	}
};

export const updateProductoAction = (options) => async (dispatch, getState) => {
	dispatch({ type: PRODUCTO_LOADING, payload: true });
	const { id, body } = options; //? Opciones para solicitud a  API

	try {
		const api = endPoints.productos.update(id); //? URL API

		body.empresaRut = getState().auth.empresaSession;
		console.log(body);
		const res = await axios.patch(api, body);
		console.log(res.data);
		let newList = getState().productos.list.map(e => e.id == id ? res.data : e);

		toast.success(`El producto con ID: ${id} ha sido modificado existosamente`, toastOptions);
		dispatch({ 
			type: PRODUCTO_UPDATE, 
			payload: { list: newList, loading: false } 
		});

	} catch (error) {
		dispatch({ type: PRODUCTO_LOADING, payload: false });
		// console.log(error);
		toast.error(`No se ha podido actualizar el producto con ID: ${id}`, toastOptions);
		dispatch({ type: PRODUCTO_ERROR });
	}
};

export const deleteProductoAction = (options) => async (dispatch, getState) => {
	dispatch({ type: PRODUCTO_LOADING, payload: true });
	const { id } = options; //? Opciones para solicitud a  API
	const api = endPoints.productos.delete(id); //? URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().productos.list.filter(e => e.id != id);

		toast.warning(`El producto con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: PRODUCTO_DELETE, payload: { list: newList, loading: false } });
	} catch (error) {
		dispatch({ type: PRODUCTO_LOADING, payload: false });
		// console.log(error);
		toast.error(`No se ha podido eliminar el producto con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		dispatch({ type: PRODUCTO_ERROR });
	}
};

export const showFormAction = (options) => async (dispatch, getState) => {
  const { id } = options;

  try {
    dispatch({type: PRODUCTO_SHOW, payload: id });
  } catch (error) {
    toast.error(`ERROR: Unidad ${id} no se ha podido cargar`, toastOptions)
    dispatch({ type: PRODUCTO_SHOW });
  }
}
