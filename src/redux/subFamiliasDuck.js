/**
 ** Redux Mantenedor Sub SubFamilias
 */
import axios from 'axios';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toast } from 'react-toastify';
import { toastOptions } from '@utils/texts/general';
import { subfamily } from '../utils/texts/modGestion';

//* Data inicial
const dataInicial = {
  list: [],
  loading: false,
  formShow: false,
  form: 0
}

//* Types
const SUBFAMILIAS_LIST = 'SUBFAMILIAS_LIST';
const SUBFAMILIA_GET = 'SUBFAMILIA_GET';
const SUBFAMILIA_ADD = 'SUBFAMILIA_ADD';
const SUBFAMILIA_UPDATE = 'SUBFAMILIA_UPDATE';
const SUBFAMILIA_DELETE = 'SUBFAMILIA_DELETE';
const SUBFAMILIA_ERROR = 'SUBFAMILIA_ERROR';
const SUBFAMILIA_LOADING = 'SUBFAMILIA_LOADING';
const SUBFAMILIA_REFRESH = 'SUBFAMILIA_REFRESH';
const SUBFAMILIA_SHOW = 'SUBFAMILIA_SHOW';
const SUBFAMILIA_HIDDEN = 'SUBFAMILIA_HIDDEN';

//* Reducer
export default function subFamiliasReducer(state = dataInicial, action) {
  switch(action.type) {
    case SUBFAMILIA_ERROR:
      return { ...state, ...action.payload }
    case SUBFAMILIAS_LIST:
      return { ...state, list: action.payload.list , loading: action.payload.loading }
    case SUBFAMILIA_GET:
      return  { ...state, ...action.payload }
    case SUBFAMILIA_ADD:
      return { ...state, list: action.payload }
    case SUBFAMILIA_UPDATE:
      return { ...state, list: action.payload }
    case SUBFAMILIA_DELETE:
      return { state, list: action.payload }
    case SUBFAMILIA_REFRESH:
      return {...state, }
    case SUBFAMILIA_LOADING:
      return { ...state, loading: action.payload }
    case SUBFAMILIA_SHOW:
      return {...state, form: action.payload, formShow: true }
    case SUBFAMILIA_HIDDEN:
      return {...state, form: action.payload, formShow: false}
    default:
      return {...state};
  }
}

//* Action
export const getSubFamiliasAction = (options) => async (dispatch, getState) => {
  dispatch({ type: SUBFAMILIA_LOADING, payload: true }); //? Cargar Lista
  const { familiaId } = options;
	try {
    const api = endPoints.subFamilias.list({ familiaId });
    // console.log(api);
		const res = await axios.get(api);
    // console.log('RES action:', res);
    dispatch({ type: SUBFAMILIAS_LIST, payload: { list: res.data, loading: false} });
	} catch (error) {
    // console.log(error);
    // console.log('Usuario a tenido conflicto');
    // console.log('loading: ', loading);
    // console.log('activo: ', activo);
    // if (loading === false && activo) dispatch(refreshTokenAction()) 
    // else console.log('No ha podido refrescar token') ;
    dispatch({ type: SUBFAMILIA_ERROR , payload: { loading: false} });
  } 
};

export const addSubFamiliaAction = (options) => async (dispatch, getState) => {
  dispatch({ type: SUBFAMILIA_LOADING, payload: true });
	const { body } = options; //? Opciones para solicitud a  API
	const api = endPoints.subFamilias.add(); //? URL API para empresa
  // console.log(api);
	try {
		const res = await axios.post(api, body);
    // console.log(res.data);
    // console.log(getState().subfamilias.list);
    const newList = [...getState().subfamilias.list, res.data];
    dispatch({ type: SUBFAMILIA_ADD , payload: newList });
    dispatch({ type: SUBFAMILIA_LOADING, payload: false });
    toast.success(`SubFamilia ${res.data.nombre} ha sido agregada correctamente.`, toastOptions);
	} catch (error) {
		// console.log(error);
    // let msg = error.response.data;
		dispatch({ type: SUBFAMILIA_ERROR });
    toast.error(`No se ha podido agregar familia, porfavor intentelo más tarde`, toastOptions);
    // toast.error(msg, toastOptions);
	}
};

export const updateSubFamiliaAction = (options) => async (dispatch, getState) => {
  dispatch({ type: SUBFAMILIA_LOADING, payload: true }); //? Cargar Lista
  const { id, body } = options; // Opciones para solicitud a  API
  const api = endPoints.subFamilias.update(id); // URL API
  // console.log(body);
  try {
    const res = await axios.patch(api, body);
    let newList = getState().subfamilias.list.map((e) =>  e.id === id ? res.data : e );
    // console.log('Nueva  lista: ', newList)
    dispatch({ type: SUBFAMILIA_UPDATE, payload: newList });
    dispatch({ type: SUBFAMILIA_LOADING, payload: false }); //? Cargar Lista
    toast.success(`La familia con ID: ${id} ha sido actualizada existosamente.`, toastOptions);
  } catch (error) {
    // console.log(error);
    let msg = error.response.data.body;
    toast.error(`No ha se ha podido actualizar los datos de empresa, porfavor intentelo más tarde`);
    toast.error(msg, toastOptions);
    dispatch({ type: SUBFAMILIA_ERROR });
  }
}

export const deleteSubFamiliaAction = (options) => async (dispatch, getState) => {
  dispatch({ type: SUBFAMILIA_LOADING, payload: true }); //? Cargar Lista
  const { id } = options; // Opciones para solicitud a  API
  // console.log(id);
  const api = endPoints.subFamilias.delete(id); // URL API
  // console.log(api);
  try {
    // console.log(body);
    const res = await axios.delete(api);
    // console.log(res);
    let familiaList = getState().subfamilias.list.filter((e)=> e.id != id);
    // console.log(familiaList);
    dispatch({ type: SUBFAMILIA_DELETE, payload: familiaList });
    dispatch({ type: SUBFAMILIA_LOADING, payload: false }); //? Cargar Lista
    toast.warning(`SubFamilia con ID: ${id} ha sido eliminado exitosamente`);
  } catch (error) {
    // console.log(error);
    // let msg = error.data;
    toast.error(`La familia con ID: ${id} no se ha podido eliminar`, toastOptions)
    // toast.error(msg, toastOptions); // Comentar cuando pase a producción
    dispatch({ type: SUBFAMILIA_ERROR });
  }
}

export const showFormEditSBAction = (options) => async (dispatch, getState) => {
  const { id } = options;

  try {
    dispatch({type: SUBFAMILIA_SHOW, payload: id });
  } catch (error) {
    toast.error(`La familia con ID: ${id} no se ha podido eliminar`, toastOptions)
    // toast.error(msg, toastOptions); // Comentar cuando pase a producción
    dispatch({ type: SUBFAMILIA_ERROR });
  }
}
