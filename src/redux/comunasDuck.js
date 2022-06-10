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
const COMUNAS_GET = 'COMUNAS_GET';
const COMUNA_ERROR = 'COMUNA_ERROR';

//Reducer
export default function comunasReducer(state = dataInicial, action) {
  switch(action.type) {
    case COMUNA_ERROR:
      return { ...state, ...action.payload }
    case COMUNAS_GET:
      return { ...state, res: action.payload } 
    default:
      return {...state};
  }
}

// Action
export const getComunasAction = (options) => async (dispatch, getState) => {
	const { comunas } = options; // Opciones para solicitud a  API
	const api = endPoints.comunas.list();
  // const { activo, loading } = getState().user;
  // console.log(body);
  // console.log(api);
  // console.log(axios.defaults.headers.Authorization);
	try {
		// const res = await axios.get(api);
    // console.log(res);

    dispatch({ type: COMUNAS_GET, payload:  comunas });
	} catch (error) {
		// console.log(error);
    // console.log(error.request.status)
    // console.log(error);
    // console.log('Usuario a tenido conflicto');
    // console.log('loading: ', loading);
    // console.log('activo: ', activo);
    // if (loading === false && activo === true) dispatch(refreshTokenAction()) 
    // else console.log('No ha podido refrescar token') ;
    dispatch({ type: COMUNA_ERROR });
  } 
};

