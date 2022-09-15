/**
 * * Redux de Manejo de Session
 * ? Nombre en store: auth
 */
import axios from 'axios';
import endPoints from '@services/api';
import { toast } from 'react-toastify';
//* Texto 
import { toastOptions, auth } from '../utils/texts/general';


//* Data inicial
const dataInicial = {
  loading: false,
  logged: false,
  token: null,
	isAdmin: false,
	info: [],
	empresaSession: '',
}

//* Types
const LOADING = 'LOADING';
const USER_ERROR = 'USER_ERROR';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_LOGOUT = 'USER_LOGOUT';
const USER_REFRESH = 'USER_REFRESH';
const EMPRESA_SESSION = 'EMPRESA_SESSION';

//* Reducer
export default function userAuthReducer(state = dataInicial, action) {
  switch(action.type) {
    case LOADING:
      return {...state, loading: true}
    case USER_ERROR:
      return {...state, logged: false}
    case USER_SUCCESS:
      return  {...state, info: action.payload.info, token: action.payload.token, isAdmin: action.payload.isAdmin, loading: false, logged: true}
    case USER_LOGOUT:
      return {...state, logged: false}
    case USER_REFRESH:
      return {...state, token: action.payload	}
		case EMPRESA_SESSION:
			return {...state, empresaSession: action.payload};
    default:
      return {...state};
  }
}

//* Action
export const loginUserAction = (options) => async (dispatch, getState) => {
	const { body } = options; //? Opciones para solicitud a  API
	const api = endPoints.auth.login;	
	dispatch({ type: LOADING }); //? Loader
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		if (res.status !== 200 ) {
			toast.error(auth.txt.loginError, toastOptions);
			dispatch({ type: USER_LOGOUT });
			throw auth.txt.loginError;
		};
		const { user, refreshToken, token } = res.data; //? data necesaria
		// axios.defaults.withCredentials = true;
		axios.defaults.headers.Authorization = `Bearer ${refreshToken}`;
		toast.success(auth.txt.success, toastOptions);
		// console.log(axios.defaults.headers.Authorization);
		dispatch({
			type: USER_SUCCESS,
			payload: { 	
				info: {
					id: user.id,
					username: user.username,
					nombres: user.nombres,
					apellidos: user.apellidos,
					email: user.email,
					porcentajeDcto: user.porcentajeDcto,
					empresaRut: user.empresaRut,
					activo: user.activo,
					rolesId: user.rolesId
				},
				token: refreshToken,
				isAdmin: ( user.rolesId === 1 ? true : false )
			}
		});
	} catch (error) {	
		// console.log(error);
		// let msg = error.data.body;
		toast.error(auth.txt.loginError, toastOptions);
		// toast.error(msg, toastOptions);
		dispatch({ type: USER_ERROR });
	}
};

export const refreshTokenAction = () => async(dispatch, getState) => {
  const { token } = getState().auth;
	let axiosToken = axios.defaults.headers.Authorization;
	const api = endPoints.auth.refreshToken;
	// console.log(api)
	// console.log('Token refresh:', token);
	try {
		// axios.defaults.headers.Authorization = `Bearer ${token}`;
		const res = await axios.get(api);
		// console.log(res.data.body);
		axios.defaults.headers.Authorization = `Bearer ${res.data}`;
		// axiosToken = axios.defaults.headers.Authorization;
		dispatch({ type: USER_REFRESH, payload: res.data, });
		// console.log(axiosToken);
	} catch (error) {
		//? En caso que no funcione el refresh token cerrar session forzosamente
		// console.log(error);
		// console.log('Ha fallado proceso de refrescar token');
		// console.log(axiosToken);
		toast.warning(auth.txt.refreshError, toastOptions);
		dispatch({ type: USER_LOGOUT, });
	}
};

export const logoutUserAction = () => (dispatch) => {
	localStorage.removeItem('user');
	axios.defaults.headers.Authorization = null;
	toast.info(auth.txt.closeSession, toastOptions);
	dispatch({ type: USER_LOGOUT });
};

export const readUserAction = () => async (dispatch, getState) => {
	const userAuth = getState().auth;
	if (localStorage.getItem('user')) {
		dispatch({
			type: USER_SUCCESS,
			payload: {
				info: userAuth.info,
				token: userAuth.token,
				isAdmin: ( userAuth.info.rolesId === 1 ? true : false )
			},
		});
	}else return null;
};

export const setEmpresaSessionAction = (options) => async (dispatch, getState) =>{
	const { empresaRut } = options;
	try {
		dispatch({ type: 'EMPRESA_SESSION', payload: empresaRut })
	} catch (error) {
		toast.error(error);
	}
};
