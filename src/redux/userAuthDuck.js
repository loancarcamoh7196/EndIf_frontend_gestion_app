import axios from 'axios';
import Cookie from 'js-cookie';
import endPoints from '@services/api';
import { toast } from 'react-toastify';

//Data inicial
const dataInicial = {
  loading: false,
  activo: false,
  token: null,
	isAdmin: false,
	info: [],
}

const toastOptions = {
	position: 'top-right',
	autoClose: 8000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

//Types
const LOADING = 'LOADING';
const USER_ERROR = 'USER_ERROR';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_LOGOUT = 'USER_LOGOUT';
const USER_REFRESH = 'USER_REFRESH';

//Reducer
export default function userAuthReducer(state = dataInicial, action) {
  switch(action.type) {
    case LOADING:
      return {...state, loading: true}
    case USER_ERROR:
      return {...state, activo: false}
    case USER_SUCCESS:
      return  {...state, info: action.payload.info, token: action.payload.token, isAdmin: action.payload.isAdmin, loading: false, activo: true}
    case USER_LOGOUT:
      return {...state}
    case USER_REFRESH:
      return {...state, token: action.payload	}
    default:
      return {...state};
  }
}

//Action
export const loginUserAction = (options) => async (dispatch, getState) => {
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.auth.login;	
	dispatch({ type: LOADING });
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		if (res.status !== 200 ) {
			toast.error('No ha se ha podido iniciar sesión', { ...toastOptions });
			dispatch({ type: USER_LOGOUT });
			throw 'No ha se ha podido iniciar sesión';
		};
		const { user, refreshToken, token } = res.data; // data necesaria
		// axios.defaults.withCredentials = true;
		axios.defaults.headers.Authorization = `Bearer ${refreshToken}`;

		localStorage.setItem(
			'user',
			JSON.stringify({
				id: user.id,
				username: user.username,
				token: user.token_acceso,
				nombres: user.nombres,
				apellidos: user.apellidos,
				email: user.email,
				porcentajeDcto: user.porcentajeDcto,
				empresaRut: user.empresaRut,
				activo: user.activo,
				rolesId: user.rolesId
			})
		);
		
		toast.success('Inicio de Sesión Exitoso', { ...toastOptions });
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
		toast.error('No ha se ha podido iniciar sesión', { ...toastOptions });
		// toast.error(msg, {...toastOptions});

		dispatch({ type: USER_ERROR });
	}
};

export const refreshTokenAction = () => async(dispatch, getState) => {
  const { token } = getState().user;
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
		// Cookie.set('jwt', res.data, { expires: 30 });
	} catch (error) {
		//Encaso que no funcione el refresh token cerrar session forzosamente
		// console.log(error);
		// console.log('Ha fallado proceso de refrescar token');
		// console.log(axiosToken);
		toast.warning('No ha podido actualizar la sesión', {...toastOptions});
		dispatch({ type: USER_LOGOUT, });
	}
};

export const logoutUserAction = () => (dispatch) => {
	localStorage.removeItem('user');
	axios.defaults.headers.Authorization = null;
	Cookie.set('jwt', null);
	toast.info('Se ha cerrado sesión', {...toastOptions});
	dispatch({ type: USER_LOGOUT });
};

export const readUserAction = () => async (dispatch) => {
	if (localStorage.getItem('user')) {
		dispatch({
			type: USER_SUCCESS,
			payload: {
				user: JSON.parse(localStorage.getItem('user')),
			},
		});
	}
};
	