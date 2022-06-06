import axios from 'axios';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toast } from 'react-toastify';

//Data inicial
const dataInicial = {
  results: [],
}

const toastOptions = {
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};


//Types
const COMPANIES_GET = 'COMPANIES_GET';
const COMPANY_GET = 'COMPANY_GET';
const COMPANY_ADD = 'COMPANY_ADD';
const COMPANY_UPDATE = 'COMPANY_UPDATE';
const COMPANY_DELETE = 'COMPANY_DELETE';
const COMPANY_ERROR = 'COMPANY_ERROR';
const COMPANY_REFRESH = 'COMPANY_REFRESH';

//Reducer
export default function companiesReducer(state = dataInicial, action) {
  switch(action.type) {
    case COMPANY_ERROR:
      return { ...state, ...action.payload }
    case COMPANIES_GET:
      return { ...state, results: action.payload } 
    case COMPANY_GET:
      return  { ...state, results: action.payload }
    case COMPANY_UPDATE:
      return { ...state, results: action.payload }
    case COMPANY_DELETE:
      return { ...state, results: action.payload }
    case COMPANY_REFRESH:
      return {...state,  }
    default:
      return {...state};
  }
}

// Action
export const getCompaniesAction = (options) => async (dispatch, getState) => {
	// const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.companies.getCompanies();
  const { activo, token, loading } = getState().user;
  // console.log(body);
  // console.log(api);
  // console.log(axios.defaults.headers.Authorization);
	try {
		const res = await axios.get(api);
    // console.log(res);

    dispatch({ type: COMPANIES_GET, payload:  res.data.body });
	} catch (error) {
		// console.log(error);
    // console.log(error.request.status)
    // console.log(error);
    // console.log('Usuario a tenido conflicto');
    // console.log('loading: ', loading);
    // console.log('activo: ', activo);
    if (loading==false && activo==true) dispatch(refreshTokenAction()) 
    else console.log('No ha podido refrescar token') ;
    dispatch({ type: COMPANY_ERROR });
  } 
};

export const getCompanyReportAccion= (options) => async (dispatch, getState) => {
  const { id } = options;
  const { activo, token, loading } = getState().user;
  const api = endPoints.companies.getCompany(id);
  
  try {
    const res = await axios.get(api );
    // console.log(res);
    dispatch({ type: COMPANY_GET, payload:  res.data.body });
  } catch (error) {
    // console.log(error);
    // console.log(error.request.status);
    // console.log('EDIT COMPANIES: Necesito renovare el cache');
    // console.log(error);
    // console.log('Usuario a tenido conflicto');
    // console.log('loading: ', loading);
    // console.log('activo: ', activo);
    if (!loading && activo) dispatch(refreshTokenAction());
    else console.log('No ha podido refrescar token');
    dispatch({ type: COMPANY_ERROR });
  }
}

export const addCompanyAction = (options) => async (dispatch, getState) => {
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.companies.addCompany();
  // console.log(body);
  // console.log(api);
	try {
		const res = await axios.post(api, body);
    const info = await axios.get(endPoints.companies.getCompanies());
    // console.log(res);
    toast.success(`Empresa  ${body.razon} ha sido agregada correctamente.`, { ...toastOptions})
    dispatch({ type: COMPANY_ADD, payload: info.data.body });
	} catch (error) {
		// console.log(error);
    let msg = error.response.data.body;
    
		dispatch({ type: COMPANY_ERROR });
    toast.error(`No se ha podido agregar empres, porfavor intentelo más tarde`, {...toastOptions});
    toast.error(msg, {...toastOptions});
	}
};

export const updateCompanyAction = (options) => async (dispatch, getState) => {
  const { id, body } = options; // Opciones para solicitud a  API
  const api = endPoints.companies.updateCompany(id); // URL API
  // console.log(body);
  try {
    const res = await axios.patch(api, body);
    const info = await axios.get(endPoints.companies.getCompanies());
    toast.success(`La empresa con ID: ${id} ha sido actualizad existosamente.`, {...toastOptions});
    dispatch({ type: COMPANY_UPDATE, payload: info.data.body });
  } catch (error) {
    // console.log(error);
    let msg = error.response.data.body;
    toast.error(`No ha se ha podido actualizar los datos de empresa, porfavor intentelo más tarde`);
    toast.error(msg, {...toastOptions});
    dispatch({ type: COMPANY_ERROR });
  }
}

export const deleteCompanyAction = (options) => async (dispatch) => {
  const { id } = options; // Opciones para solicitud a  API
  const api = endPoints.companies.deleteCompany(id); // URL API
  // console.log(api);
  try {
    // console.log(body);
    const res = await axios.delete(api);
    // console.log(res);
    toast.warning(`Empresa con ID: ${id} ha sido eliminado exitosamente`);
    dispatch({ type: COMPANY_DELETE, payload: { results }, });
  } catch (error) {
    // console.log(error);
    let msg = error.response.data.body;
    toast.error(`La empresa con ID: ${id} no se ha podido eliminar`, {...toastOptions})
    toast.error(msg, {...toastOptions});
    dispatch({ type: COMPANY_ERROR });
  }
}

