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
const FAMILIAS_LIST = 'FAMILIAS_LIST';
const FAMILIA_GET = 'FAMILIA_GET';
const FAMILIA_ADD = 'FAMILIA_ADD';
const FAMILIA_UPDATE = 'FAMILIA_UPDATE';
const FAMILIA_DELETE = 'FAMILIA_DELETE';
const FAMILIA_ERROR = 'FAMILIA_ERROR';
const FAMILIA_REFRESH = 'FAMILIA_REFRESH';

//Reducer
export default function familiasReducer(state = dataInicial, action) {
  switch(action.type) {
    case FAMILIA_ERROR:
      return { ...state, ...action.payload }
    case FAMILIAS_LIST:
      return { ...state, list: action.payload.list , cargado: action.payload.cargado} 
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

// Action
export const getFamiliasAction = (options) => async (dispatch, getState) => {
	// const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.empresas.list();
  // const { activo, loading } = getState().user; // Op
  // console.log(body);
  // console.log(api);
  // console.log(axios.defaults.headers.Authorization);
	try {
		const res = await axios.get(api);
    // console.log('RES action:', res);
    dispatch({ type: FAMILIAS_LIST, payload: { list: res.data, cargado: true} });
	} catch (error) {
		// console.log(error);
    // console.log(error.request.status)
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
  const { rut } = options;
  // const { activo, loading } = getState().user;
  const api = endPoints.empresas.get(rut); 
  // console.log('API: ',api)
  try {
    const res = await axios.get(api);
    // console.log(res);
    dispatch({ type: FAMILIA_GET});
  } catch (error) {
    // console.log(error);
    // console.log(error.request.status);
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
    toast.success(`Familia ${empresa.razonSocial} ha sido agregada correctamente.`, { ...toastOptions})
    dispatch({ type: FAMILIA_ADD , payload: [...getState().empresas.list, res.data] });
	} catch (error) {
		// console.log(error);
    let msg = error.response.data.body;
		dispatch({ type: FAMILIA_ERROR });
    toast.error(`No se ha podido agregar empresa, porfavor intentelo más tarde`, {...toastOptions});
    toast.error(msg, {...toastOptions});
	}
};

export const updateFamiliaAction = (options) => async (dispatch, getState) => {
  const { rut, empresa, direccion } = options; // Opciones para solicitud a  API
  // console.log('RUT Update:', rut);
  // console.log('Familia UPD: ', empresa);
  // console.log('Dir UPD: ', direccion);
  const api = endPoints.empresas.update(rut); // URL API
  // console.log(body);
  try {
    const res = await axios.patch(api, empresa);
    let newList = getState().empresas.list.map((e) =>  e.rut === rut ? res.data : e );
    // console.log('Nue  lisat: ', newList)
    toast.success(`La empresa con RUT: ${rut} ha sido actualizada existosamente.`, {...toastOptions});
    
    if(Object.keys(direccion).length !== 0){
      try {
        const direccionApi = endPoints.direcciones.update(direccion.id); // URL API para direccion
        delete direccion.id; // quitar Id de datos actualizar
        const dir = await axios.patch(direccionApi, direccion);
        toast.success('Dirección Actualizada', {...toastOptions});
        } catch (error) {
        toast.error(`La direccion de la empresa ${rut}, no se ha podido actualizar.`, toastOptions);
      }
    }
    
    dispatch({ type: FAMILIA_UPDATE, payload: newList });
  } catch (error) {
    // console.log(error);
    let msg = error.response.data.body;
    toast.error(`No ha se ha podido actualizar los datos de empresa, porfavor intentelo más tarde`);
    toast.error(msg, {...toastOptions});
    dispatch({ type: FAMILIA_ERROR });
  }
}

export const deleteFamiliaAction = (options) => async (dispatch, getState) => {
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
    toast.warning(`Familia con ID: ${rut} ha sido eliminado exitosamente`);
    dispatch({ type: FAMILIA_DELETE , payload: empList });
    // dispatch({type: FAMILIAS_GET, payload: info.data})
  } catch (error) {
    // console.log(error);
    let msg = error.response.data;
    toast.error(`La empresa con ID: ${rut} no se ha podido eliminar`, {...toastOptions})
    toast.error(msg, {...toastOptions}); // Comentar cuando pase a producción
    dispatch({ type: FAMILIA_ERROR });
  }
}
