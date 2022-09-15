/**
 ** Redux Mantenedor Familias
 */
import axios from 'axios';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toast } from 'react-toastify';
import { toastOptions } from '../utils/texts/general';
import { family } from '../utils/texts/modGestion';

//* Data inicial
const dataInicial = {
  list: [],
  loading: false
}

//* Types
const FAMILIAS_LIST = 'FAMILIAS_LIST';
const FAMILIA_GET = 'FAMILIA_GET';
const FAMILIA_ADD = 'FAMILIA_ADD';
const FAMILIA_UPDATE = 'FAMILIA_UPDATE';
const FAMILIA_DELETE = 'FAMILIA_DELETE';
const FAMILIA_ERROR = 'FAMILIA_ERROR';
const FAMILIA_REFRESH = 'FAMILIA_REFRESH';

//* Reducer
export default function familiasReducer(state = dataInicial, action) {
  switch(action.type) {
    case FAMILIA_ERROR:
      return { ...state, ...action.payload }
    case FAMILIAS_LIST:
      return { ...state, list: action.payload.list , loading: action.payload.cargado} 
    case FAMILIA_GET:
      return  { ...state, ...action.payload }
    case FAMILIA_ADD:
      return {...state, list: action.payload }
    case FAMILIA_UPDATE:
      return { ...state, list: action.payload }
    case FAMILIA_DELETE:
      return { state, list: action.payload }
    case FAMILIA_REFRESH:
      return {...state,  }
    default:
      return {...state};
  }
}

//* Action
export const getFamiliasAction = (options) => async (dispatch, getState) => {
	let { empresaSession } = getState().auth;
	// console.log(empresaSession);
	const api = endPoints.familias.list({empresaRut: empresaSession});
	// console.log(api);
	try {
		const res = await axios.get(api);
    // console.log('RES action:', res);
    dispatch({ type: FAMILIAS_LIST, payload: { list: res.data, cargado: true} });
	} catch (error) {
    // console.log(error);
    // console.log('Usuario a tenido conflicto');
    // console.log('loading: ', loading);
    // console.log('activo: ', activo);
    // if (loading === false && activo) dispatch(refreshTokenAction()) 
    // else console.log('No ha podido refrescar token') ;
    dispatch({ type: FAMILIA_ERROR , payload: { cargado: false} });
  } 
};

export const getFamiliaAction= (options) => async (dispatch, getState) => {
  const { id } = options;
  // const { activo, loading } = getState().user;
  const api = endPoints.familias.get(id); 
  // console.log('API: ',api)
  try {
    const res = await axios.get(api);
    // console.log(res);
    dispatch({ type: FAMILIA_GET});
  } catch (error) {
    // console.log('EDIT FAMILIAS: Necesito renovare el cache');
    // console.log(error);
    // console.log('Usuario a tenido conflicto');
    // console.log('loading: ', loading);
    // console.log('activo: ', activo);
    // if (!loading && activo) dispatch(refreshTokenAction());
    // else console.log('No ha podido refrescar token');
    dispatch({ type: FAMILIA_ERROR });
  }
}

export const addFamiliaAction = (options) => async (dispatch, getState) => {
	const { body } = options; //? Opciones para solicitud a  API
	const api = endPoints.familias.add(); //? URL API para empresa
	try {
		const res = await axios.post(api, body);
    toast.success(`Familia ${res.data.nombre} ha sido agregada correctamente.`, toastOptions)
    dispatch({ type: FAMILIA_ADD , payload: [...getState().familias.list, res.data] });
	} catch (error) {
		// console.log(error);
    let msg = error.response.data.body;
		dispatch({ type: FAMILIA_ERROR });
    toast.error(`No se ha podido agregar familia, porfavor intentelo más tarde`, toastOptions);
    toast.error(msg, toastOptions);
	}
};

export const updateFamiliaAction = (options) => async (dispatch, getState) => {
  const { id, body } = options; // Opciones para solicitud a  API
  const api = endPoints.familias.update(id); // URL API
  // console.log(body);
  try {
    const res = await axios.patch(api, body);
    let newList = getState().familias.list.map((e) =>  e.id === id ? res.data : e );
    // console.log('Nueva  lista: ', newList)
    toast.success(`La familia con ID: ${id} ha sido actualizada existosamente.`, toastOptions);
    
    dispatch({ type: FAMILIA_UPDATE, payload: newList });
  } catch (error) {
    // console.log(error);
    let msg = error.response.data.body;
    toast.error(`No ha se ha podido actualizar los datos de empresa, porfavor intentelo más tarde`);
    toast.error(msg, toastOptions);
    dispatch({ type: FAMILIA_ERROR });
  }
}

export const deleteFamiliaAction = (options) => async (dispatch, getState) => {
  const { id } = options; // Opciones para solicitud a  API
  const api = endPoints.familias.delete(id); // URL API
  // console.log(api);
  try {
    // console.log(body);
    const res = await axios.delete(api);
    // console.log(res);
    let familiaList = getState().familias.list.filter((e)=> e.id != id);
    toast.warning(`Familia con ID: ${id} ha sido eliminado exitosamente`);
    dispatch({ type: FAMILIA_DELETE , payload: familiaList });
  } catch (error) {
    // console.log(error);
    let msg = error.response.data;
    toast.error(`La familia con ID: ${id} no se ha podido eliminar`, toastOptions)
    toast.error(msg, toastOptions); // Comentar cuando pase a producción
    dispatch({ type: FAMILIA_ERROR });
  }
}
