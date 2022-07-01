import axios from 'axios';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toast } from 'react-toastify';

//Data inicial
const dataInicial = {
  list: [],
  cargado: false,
  unidad: {}
}

const toastOptions = {
	position: "top-right",
	autoClose: 8000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

//Types
const EMPRESAS_LIST = 'EMPRESAS_LIST';
const EMPRESA_GET = 'EMPRESA_GET';
const EMPRESA_ADD = 'EMPRESA_ADD';
const EMPRESA_UPDATE = 'EMPRESA_UPDATE';
const EMPRESA_DELETE = 'EMPRESA_DELETE';
const EMPRESA_ERROR = 'EMPRESA_ERROR';
const EMPRESA_REFRESH = 'EMPRESA_REFRESH';

//Reducer
export default function companiesReducer(state = dataInicial, action) {
  switch(action.type) {
    case EMPRESA_ERROR:
      return { ...state, ...action.payload }
    case EMPRESAS_LIST:
      return { ...state, list: action.payload.list , cargado: action.payload.cargado} 
    case EMPRESA_GET:
      return  { ...state, ...action.payload }
    case EMPRESA_ADD:
      return {...state, list: action.payload }
    case EMPRESA_UPDATE:
      return { ...state, list: action.payload }
    case EMPRESA_DELETE:
      return { state, list: action.payload }
    case EMPRESA_REFRESH:
      return {...state,  }
    default:
      return {...state};
  }
}

// Action
export const getEmpresasAction = (options) => async (dispatch, getState) => {
	// const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.empresas.list();
  // const { activo, loading } = getState().user; // Op
  // console.log(body);
  // console.log(api);
  // console.log(axios.defaults.headers.Authorization);
	try {
		const res = await axios.get(api);
    // console.log('RES action:', res);
    dispatch({ type: EMPRESAS_LIST, payload: { list: res.data, cargado: true} });
	} catch (error) {
		// console.log(error);
    // console.log(error.request.status)
    // console.log(error);
    // console.log('Usuario a tenido conflicto');
    // console.log('loading: ', loading);
    // console.log('activo: ', activo);
    // if (loading === false && activo) dispatch(refreshTokenAction()) 
    // else console.log('No ha podido refrescar token') ;
    dispatch({ type: EMPRESA_ERROR , payload: { cargado: false} });
  } 
};

export const getEmpresaAction= (options) => async (dispatch, getState) => {
  const { rut } = options;
  // const { activo, loading } = getState().user;
  const api = endPoints.empresas.get(rut); 
  // console.log('API: ',api)
  try {
    const res = await axios.get(api);
    // console.log(res);
    dispatch({ type: EMPRESA_GET});
  } catch (error) {
    // console.log(error);
    // console.log(error.request.status);
    // console.log('EDIT EMPRESAS: Necesito renovare el cache');
    // console.log(error);
    // console.log('Usuario a tenido conflicto');
    // console.log('loading: ', loading);
    // console.log('activo: ', activo);
    // if (!loading && activo) dispatch(refreshTokenAction());
    // else console.log('No ha podido refrescar token');
    dispatch({ type: EMPRESA_ERROR });
  }
}

export const addEmpresaAction = (options) => async (dispatch, getState) => {
	const { empresa, direccion } = options; // Opciones para solicitud a  API
  const direccionApi = endPoints.direcciones.add(); // URL API para direccion
	const api = endPoints.empresas.add(); // URL API para empresa
	try {
    const direccionRes = await axios.post(direccionApi, direccion);
    // console.log('RES add Dir: ',direccionRes);
    toast.success(direccionRes, { ...toastOptions});
    empresa.direccionId = direccionRes.data.id;
		const res = await axios.post(api, empresa);
    
    toast.success(`Direccion Agregada`, {...toastOptions});
    toast.success(`Empresa ${empresa.razonSocial} ha sido agregada correctamente.`, { ...toastOptions})
    dispatch({ type: EMPRESA_ADD , payload: [...getState().empresas.list, res.data] });
	} catch (error) {
		// console.log(error);
    let msg = error.response.data.body;
		dispatch({ type: EMPRESA_ERROR });
    toast.error(`No se ha podido agregar empresa, porfavor intentelo más tarde`, {...toastOptions});
    toast.error(msg, {...toastOptions});
	}
};

export const updateEmpresaAction = (options) => async (dispatch, getState) => {
  const { rut, empresa, direccion } = options; // Opciones para solicitud a  API
  console.log('RUT Update:', rut);
  console.log('Empresa UPD: ', empresa);
  console.log('Dir UPD: ', direccion);

  const api = endPoints.empresas.update(rut); // URL API
  // console.log(body);
  try {
    const res = await axios.patch(api, empresa);
    // const info = await axios.get(endPoints.empresas.list());
    let newList = getState().empresas.list.map((e) =>  e.rut === rut ? res.data : e );
    // console.log('Nue  lisat: ', newList)
    toast.success(`La empresa con RUT: ${rut} ha sido actualizada existosamente.`, {...toastOptions});
    dispatch({ type: EMPRESA_UPDATE, payload: newList });
  } catch (error) {
    // console.log(error);
    let msg = error.response.data.body;
    toast.error(`No ha se ha podido actualizar los datos de empresa, porfavor intentelo más tarde`);
    toast.error(msg, {...toastOptions});
    dispatch({ type: EMPRESA_ERROR });
  }
}

export const deleteEmpresaAction = (options) => async (dispatch, getState) => {
  const { rut } = options; // Opciones para solicitud a  API
  const api = endPoints.empresas.delete(rut); // URL API
  // console.log(api);
  try {
    // console.log(body);
    const res = await axios.delete(api);
    // const info = await axios.get(endPoints.empresas.list());
    // console.log(res);
    let empList = getState().empresas.list.filter((e)=> e.rut !== rut);

    // console.log(getState().empresas.list.filter((e)=> e.rut !== rut));
    toast.warning(`Empresa con ID: ${rut} ha sido eliminado exitosamente`);
    dispatch({ type: EMPRESA_DELETE , payload: empList });
    // dispatch({type: EMPRESAS_GET, payload: info.data})
  } catch (error) {
    // console.log(error);
    let msg = error.response.data;
    toast.error(`La empresa con ID: ${rut} no se ha podido eliminar`, {...toastOptions})
    toast.error(msg, {...toastOptions}); // Comentar cuando pase a producción
    dispatch({ type: EMPRESA_ERROR });
  }
}
