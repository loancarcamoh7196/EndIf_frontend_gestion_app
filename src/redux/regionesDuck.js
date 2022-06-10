import axios from 'axios';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toast } from 'react-toastify';

//Data inicial
const dataInicial = {
  res: [],
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
const REGIONES_GET = 'REGIONES_GET';
const REGION_ERROR = 'REGION_ERROR';

//Reducer
export default function regionesReducer(state = dataInicial, action) {
  switch(action.type) {
    case REGION_ERROR:
      return { ...state, ...action.payload }
    case REGIONES_GET:
      return { ...state, res: action.payload } 
    default:
      return {...state};
  }
}

// Action
export const getRegionesAction = (options) => async (dispatch, getState) => {
	// const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.regiones.list();
  const { activo, loading } = getState().user;
  // console.log(body);
  // console.log(api);
  // console.log(axios.defaults.headers.Authorization);
	try {
		const res = await axios.get(api);
    // console.log(res);

    dispatch({ type: REGIONES_GET, payload:  res.data });
	} catch (error) {
		// console.log(error);
    // console.log(error.request.status)
    // console.log(error);
    // console.log('Usuario a tenido conflicto');
    // console.log('loading: ', loading);
    // console.log('activo: ', activo);
    if (loading === false && activo === true) dispatch(refreshTokenAction()) 
    else console.log('No ha podido refrescar token') ;
    dispatch({ type: REGION_ERROR });
  } 
};

