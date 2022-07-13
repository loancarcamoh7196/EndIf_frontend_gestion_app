import axios from 'axios';
import endPoints from '@services/api';
import {refreshTokenAction} from '@redux/userAuthDuck'
import { toast } from 'react-toastify';

//Constantes
const dataInicial = {
	results:[],
	offset: 0,
	listaId: 1
}

const toastOptions = {
	position: "top-right",
	autoClose:5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

const PRODUCTO_ERROR = 'PRODUCTO_ERROR';
const PRODUCTOS_LIST = 'PRODUCTOS_LIST';
const PRODUCTO_GET = 'PRODUCTO_GET';
const PRODUCTO_UPDATE = 'PRODUCTO_UPDATE';
const PRODUCTO_ADD = 'PRODUCTO_ADD';
const PRODUCTO_DELETE = 'PRODUCTO_DELETE';

//Reducer
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

//Acciones
export const getProductosAccion= (options) => async (dispatch, getState) => {
	const user = getState().user.result;
	// console.log(user)
	// const bd = (user.id == 1 ) ? 'gestioncoffeetest': user.bdNombre;
	const { listaId } = options;
	const api = endPoints.productos.get(listaId);
	try {
		// console.log('option en f(x): ',options);
		// console.log(options.listaId)
		// console.log(`${api}?listaId=${parseInt(listaId)}`);
		const res = await axios.get(api);
		dispatch({ type: PRODUCTOS_LIST, payload: { results: res.data.body, listaId } });
	} catch (error) {
		const {loading, activo} = getState().user;

		if (!loading && activo) dispatch(refreshTokenAction());
		else console.log('No ha podido refrescar token');
		dispatch({ type: PRODUCTO_ERROR });
	}
}

export const getProductoAction = (options) => async (dispatch, getState) => {
  const { productoId, precioId, listaId } = options;
	const user = getState().user.result;
	// const bd = (user.id == 1 ) ? 'gestioncoffeetest': user.bdNombre;
  const api = endPoints.productos.get(productoId, precioId);
  
  try {
    const res = await axios.get(api);
    dispatch({ type: PRODUCTO_GET, payload: { results: res.data.body, listaId } });
  } catch (error) {
    const {loading, activo} = getState().user;
		
		if (!loading && activo) dispatch(refreshTokenAction());
    else console.log('No ha podido refrescar token');
    dispatch({ type: PRODUCTO_ERROR });
  }
}

export const addProductoAction = (options) => async (dispatch, getState) => {
	const { body } = options; // Opciones para solicitud a  API
	const { formNew, formEdit } = getState().usuarios;
	const api = endPoints.usuarios.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		const info = await axios.get(endPoints.usuarios.getUsuarios());
		// console.log(res);
		toast.success(`Usuario ${body.username} ha sido agregada existosamente`, {...toastOptions});
		dispatch({ type: PRODUCTO_ADD, payload: info.data });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data.body;
		toast.error(`No ha sea podido agregar el usuario, porfavor revise los datos e intentelo más tarde`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: PRODUCTO_ERROR });
	}
};

export const updateProductoAction = (options) => async (dispatch, getState) => {
	const { id, precioId, body } = options; // Opciones para solicitud a  API
	// console.log('opciones update:', options);
	// const { activo, token } = getState().user;
	const user = getState().user.result;
	const { listaId } = getState().products;
	// const bd = (user.empRut == 1 ) ? 'gestioncoffeetest': user.bdNombre;
	const api = endPoints.productos.updateProductos(id, precioId); // URL API

	try {
		// console.log(body);
		const res = await axios.patch(api, body);
		const info = await axios.get(endPoints.productsReport.getProductosReport(listaId));
		toast.success(`El producto con ID: ${id} ha sido modificado existosamente`, {...toastOptions});
		dispatch({ type: PRODUCTO_UPDATE, payload: { results: info.data.body } });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data.body;
		toast.error(`No se ha podido actualizar el prodcuto con ID: ${id}`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: PRODUCTO_ERROR });
	}
};

export const deleteProductoAction = (options) => async (dispatch) => {
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.usuarios.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		toast.warning(`El usuario con ID: ${id} ha sido eliminado.`, {...toastOptions});
		dispatch({ type: PRODUCTO_DELETE });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data.body;
		toast.error(`No se ha podido eliminar el usario con ID: ${id}, porfavor vuelva intentarlo más tarde.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: PRODUCTO_ERROR });
	}
};






// export const siguientePokeAction = (numero) => async (dispatch, getState) => {
// 	const { listaId, offset } = getState().pokemones;
	
// 	const siguiente = offset + numero;

// 	console.log('siguiente: ', siguiente);
// 	try {
// 		const res = await axios.get(
// 			`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`
// 		);
// 		dispatch({
// 			type: GET_POKE_NEXT_SUCCESS,
// 			payload: {
// 				array: res.data.results,
// 				offset: siguiente,
// 			},
// 		});
// 	} catch (error) {
// 		const {loading, activo} = getState().user;

// 		if (!loading && activo) dispatch(refreshTokenAction());
//     else console.log('No ha podido refrescar token');
//     dispatch({ type: COMPANY_ERROR });
// 	}
// };

// export const anteriorPokemonAccion = () => async (dispatch, getState) => {
// 	const { previous } = getState().pokemones;

// 	try {
// 		const res = await axios.get(previous);
// 		dispatch({
// 			type: SIGUIENTE_POKEMONES_EXITO,
// 			payload: res.data,
// 		});
// 	} catch (error) {
// 		const {loading, activo} = getState().user;
		
// 		if (!loading && activo) dispatch(refreshTokenAction());
//     else console.log('No ha podido refrescar token');
//     dispatch({ type: COMPANY_ERROR });
// 	}
// };
