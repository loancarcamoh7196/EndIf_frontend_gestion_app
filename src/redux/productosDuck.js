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

const PRODUCT_ERROR = 'PRODUCT_ERROR';
const GET_PRODUCT_LIST_SUCCESS = 'GET_PRODUCT_LIST_SUCCESS';
const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS';
const UPDATE_PRODUCT_SUCCES = 'UPDATE_PRODUCT';

//Reducer
export default function productsReducer(state = dataInicial, action){
	switch (action.type) {
		case PRODUCT_ERROR:
			return { ...state, ...action.payload };
		case GET_PRODUCT_LIST_SUCCESS:
			return { ...state, ...action.payload };
		case GET_PRODUCT_SUCCESS:
			return { ...state, ...action.payload };
		case UPDATE_PRODUCT_SUCCES:
			return { ...state, ...action.payload };
		default:
			return state;
	}
}

//Acciones
export const getProductsReportAccion= (options) => async (dispatch, getState) => {
	const user = getState().user.result;
	// console.log(user)
	const bd = (user.id == 1 ) ? 'gestioncoffeetest': user.bdNombre;
	const { listaId } = options;
	const api = endPoints.productsReport.getProductsReport(bd, listaId);
	try {
		// console.log('option en f(x): ',options);
		// console.log(options.listaId)
		// console.log(`${api}?listaId=${parseInt(listaId)}`);
		const res = await axios.get(api);
		dispatch({ type: GET_PRODUCT_LIST_SUCCESS, payload: { results: res.data.body, listaId } });
	} catch (error) {
		const {loading, activo} = getState().user;

		if (!loading && activo) dispatch(refreshTokenAction());
		else console.log('No ha podido refrescar token');
		dispatch({ type: PRODUCT_ERROR });
	}
}

export const getProductReportAction = (options) => async (dispatch, getState) => {
  const { productoId, precioId, listaId } = options;
	const user = getState().user.result;
	const bd = (user.id == 1 ) ? 'gestioncoffeetest': user.bdNombre;
  const api = endPoints.productsReport.getProductReport(bd, productoId, precioId);
  
  try {
    const res = await axios.get(api);
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: { results: res.data.body, listaId } });
  } catch (error) {
    const {loading, activo} = getState().user;
		
		if (!loading && activo) dispatch(refreshTokenAction());
    else console.log('No ha podido refrescar token');
    dispatch({ type: PRODUCT_ERROR });
  }
}

export const updateProductsReportAction = (options) => async (dispatch, getState) => {
	const { id, precioId, body } = options; // Opciones para solicitud a  API
	// console.log('opciones update:', options);
	// const { activo, token } = getState().user;
	const user = getState().user.result;
	const { listaId } = getState().products;
	const bd = (user.empRut == 1 ) ? 'gestioncoffeetest': user.bdNombre;
	const api = endPoints.productsReport.updateProductsReport(bd, id, precioId); // URL API

	try {
		// console.log(body);
		const res = await axios.patch(api, body);
		const info = await axios.get(endPoints.productsReport.getProductsReport(bd, listaId));
		toast.success(`El producto con ID: ${id} ha sido modificado existosamente`, {...toastOptions});
		dispatch({ type: UPDATE_PRODUCT_SUCCES, payload: { results: info.data.body } });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data.body;
		toast.error(`No se ha podido actualizar el prodcuto con ID: ${id}`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: PRODUCT_ERROR });
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
