/**
 ** Redux TiendasDuck
 *? store: tiendas
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
//* Texto
import { toastOptions } from '../utils/texts/general';


//? Data inicial
const dataInicial = {
	list: [],
	loading: false
};

//? Types
const TIENDA_LIST = 'TIENDA_LIST';
const TIENDA_ADD = 'TIENDA_ADD';
const TIENDA_UPDATE = 'TIENDA_UPDATE';
const TIENDA_DELETE = 'TIENDA_DELETE';
const TIENDA_ERROR = 'TIENDA_ERROR';

//? Reducer
export default function tiendasReducer(state = dataInicial, action) {
	switch (action.type) {
		case TIENDA_ERROR:
			return { ...state, ...action.payload };
		case TIENDA_LIST:
			return { ...state, list: action.payload.list };
    case TIENDA_ADD:
      return { ...state, list: action.payload };
		case TIENDA_UPDATE:
			return { ...state,  list: action.payload };
		case TIENDA_DELETE:
			return { ...state, list: action.payload };
		default:
			return { ...state };
	}
}

//? Action
export const getTiendasAction = (options) => async (dispatch, getState) => {
	let { empresaSession } = getState().auth;
	// console.log(empresaSession);
	const api = endPoints.tiendas.list({empresaRut: empresaSession});
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: TIENDA_LIST, payload:{ list: res.data } });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, toastOptions);
    dispatch({ type: TIENDA_ERROR });
	}
};

export const addTiendaAction = (options) => async (dispatch, getState) => {
	const { familia, direccion } = options; // Opciones para solicitud a  API
	const api = endPoints.tiendas.add();
	const apiDir= endPoints.direcciones.add();
	// console.log(body);
	// console.log(api);
	try {
		const direccionRes = await axios.post(apiDir, direccion);
		toast.success(direccionRes, { ...toastOptions});
    familia.direccionId = direccionRes.data.id;
		toast.success(`Direccion Agregada`, toastOptions);
		const res = await axios.post(api, familia);
		// console.log(res);
		toast.success(`Sucursal con ID ${res.data.id}- ${res.data.nombre} ha sido agregado existosamente`, toastOptions);
		dispatch({ type: TIENDA_ADD, payload: [...getState().tiendas.list, res.data] });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`No ha sea podido agregar la sucursal, porfavor revise los datos e intentelo más tarde`, toastOptions);
		// toast.error(msg, toastOptions);	
		dispatch({ type: TIENDA_ERROR });	
	}
};

export const updateTiendaAction = (options) => async (dispatch, getState) => {
	const { id, familia, direccion } = options; //? Opciones para solicitud a  API
	const api = endPoints.tiendas.update(id); //? URL API

	try {
		// console.log(api);
		const res = await axios.patch(api, familia);
		// console.log(familia);
    let newList = getState().tiendas.list.map((e) =>  e.id == id ? res.data : e );
    // console.log('Nueva  lista: ', newList)
    toast.success(`La sucursal ${id} ha sido actualizada existosamente.`, toastOptions);
    
    if(Object.keys(direccion).length !== 0){
      try {
        const direccionApi = endPoints.direcciones.update(direccion.id); //? URL API para direccion
        delete direccion.id; //? quitar Id de datos actualizar
        const dir = await axios.patch(direccionApi, direccion);
        toast.success('Dirección Actualizada', toastOptions);
        } catch (error) {
        toast.error(`La direccion de la sucursal ${id}, no se ha podido actualizar.`, toastOptions);
      }
    }
		dispatch({  type: TIENDA_UPDATE, payload: newList });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		toast.error(`Tienda ${familia.nombre} no se ha podido actualizar.`, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: TIENDA_ERROR });
	}
};

export const deleteTiendaAction = (options) => async (dispatch, getState) => {
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.tiendas.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().tiendas.list.filter((e)=> e.id != id);
		toast.warning(`La familia con ID: ${id} ha sido eliminado.`, toastOptions);
		dispatch({ type: TIENDA_DELETE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No se ha podido eliminar la sucursal con ID: ${id}, porfavor vuelva intentarlo más tarde.`, toastOptions);
		toast.error(msg, toastOptions);
		dispatch({ type: TIENDA_ERROR });
	}
};
