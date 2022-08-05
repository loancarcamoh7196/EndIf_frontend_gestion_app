/**
 * * Redux de mantenedor Productos
 */
import axios from 'axios';
import endPoints from '@services/api';
import {refreshTokenAction} from '@redux/userAuthDuck'
import { toast } from 'react-toastify';
import { toastOptions } from '@utils/texts/general';

//* Constantes
const dataInicial = {
	list:[],
	loading: false,
  unidad: {}
}

const PRODUCTO_ERROR = 'PRODUCTO_ERROR';
const PRODUCTOS_LIST = 'PRODUCTOS_LIST';
const PRODUCTO_GET = 'PRODUCTO_GET';
const PRODUCTO_UPDATE = 'PRODUCTO_UPDATE';
const PRODUCTO_ADD = 'PRODUCTO_ADD';
const PRODUCTO_DELETE = 'PRODUCTO_DELETE';

//* Reducer
export default function productosReducer(state = dataInicial, action){
	switch (action.type) {
		case PRODUCTO_ERROR:
			return { ...state, ...action.payload };
		case PRODUCTOS_LIST:
			return { ...state, ...action.payload };
		case PRODUCTO_GET:
			return { ...state, ...action.payload };
		case PRODUCTO_UPDATE:
			return { ...state, ...action.payload };
		case PRODUCTO_ADD:
			return {...state, ...action.payload};
		case PRODUCTO_DELETE:
			return {...state, ...action.payload}	
		default:
			return state;
	}
}

//* Acciones
export const getProductosAction= (options) => async (dispatch, getState) => {
	const { empresaRut } = options;
	const api = endPoints.productos.list(empresaRut);
	try {
		// console.log('option en f(x): ',options);
		// console.log(options.listaId)
		// console.log(`${api}?listaId=${parseInt(listaId)}`);
		const res = await axios.get(api);
		dispatch({ type: PRODUCTOS_LIST, payload: { list: res.data } });
	} catch (error) {
		const {loading, activo} = getState().user;

		if (!loading && activo) dispatch(refreshTokenAction());
		else console.log('No ha podido refrescar token');
		dispatch({ type: PRODUCTO_ERROR });
	}
}

export const addProductoAction = (options) => async (dispatch, getState) => {
	const { body } = options; // Opciones para solicitud a  API

	const api = endPoints.productos.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`Usuario ${body.username} ha sido agregada existosamente`, toastOptions);
		dispatch({ type: PRODUCTO_ADD, payload: [ ...getState().productos.list , res.data ] });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data.body;
		toast.error(`No ha sea podido agregar el usuario, porfavor revise los datos e intentelo más tarde`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: PRODUCTO_ERROR });
	}
};

export const updateProductoAction = (options) => async (dispatch, getState) => {
	const { id, body } = options; // Opciones para solicitud a  API
	// console.log('opciones update:', options);
	// const { activo, token } = getState().user;
	// const user = getState().user.result;
	// const { listaId } = getState().products;
	// const bd = (user.empRut == 1 ) ? 'gestioncoffeetest': user.bdNombre;
	const api = endPoints.productos.update(id); // URL API

	try {
		// console.log(body);
		const res = await axios.patch(api, body);
		toast.success(`El producto con ID: ${id} ha sido modificado existosamente`, toastOptions);
		dispatch({ type: PRODUCTO_UPDATE, payload: { list: res.data } });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data.body;
		toast.error(`No se ha podido actualizar el producto con ID: ${id}`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: PRODUCTO_ERROR });
	}
};

export const deleteProductoAction = (options) => async (dispatch) => {
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.productos.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		toast.warning(`El producto con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: PRODUCTO_DELETE });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data.body;
		toast.error(`No se ha podido eliminar el producto con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: PRODUCTO_ERROR });
	}
};

