/**
 ** Redux de contenedores Documento Tipo
 *? nombre en store: docTipo
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toastOptions } from '@utils/texts/general';

//* Data inicial
const dataInicial = {
	list: [],

};

//* Types
const DOCUMENTOS_TIPO_LIST = 'DOCUMENTOS_TIPO_LIST';
const DOCUMENTOS_TIPO_GET = 'DOCUMENTOS_TIPO_GET';
const DOCUMENTOS_TIPO_ADD = 'DOCUMENTOS_TIPO_ADD';
const DOCUMENTOS_TIPO_UPDATE = 'DOCUMENTOS_TIPO_UPDATE';
const DOCUMENTOS_TIPO_DELETE = 'DOCUMENTOS_TIPO_DELETE';
const DOCUMENTOS_TIPO_ERROR = 'DOCUMENTOS_TIPO_ERROR';
const DOCUMENTO_TIPO_LOADING = 'DOCUMENTO_TIPO_LOADING';

//* Reducer
export default function documentoTipoReducer(state = dataInicial, action) {
	switch (action.type) {
		case DOCUMENTOS_TIPO_ERROR:
			return { ...state, ...action.payload };
		case DOCUMENTOS_TIPO_LIST:
			return { ...state, list: action.payload.list };
		case DOCUMENTOS_TIPO_GET:
			return { ...state, ...action.payload };
    case DOCUMENTOS_TIPO_ADD:
      return { ...state, list: action.payload };
		case DOCUMENTOS_TIPO_UPDATE:
			return { ...state,  list: action.payload };
		case DOCUMENTOS_TIPO_DELETE:
			return { ...state, list: 	action.payload };
		case DOCUMENTO_TIPO_LOADING:
			return { ...state, list: action.payload };
		default:
			return { ...state };
	}
}

//* Action
export const getDocumentosTipoAction = (options) => async (dispatch, getState) => {
	const api = endPoints.documentoTipo.list();
	// const { activo, loading } = getState().user;
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.get(api);
		// console.log(res);
		dispatch({ type: DOCUMENTOS_TIPO_LIST, payload:{ list: res.data.rows } });
	} catch (error) {
		// console.log(error);
		// let msg = error.response.data;
		// (loading === false && activo === true) ? dispatch(refreshTokenAction()) : console.log('No ha podido refrescar token');
		// toast.error(``, {...toastOptions});
    dispatch({ type: DOCUMENTOS_TIPO_ERROR });
	}
};

export const getDocumentoTipoAction = (options) => async (dispatch, getState) => {
	const { id } = options;
	const api = endPoints.documentoTipo.get(id);
	try {
		const res = await axios.get(api);
		dispatch({ type: DOCUMENTOS_TIPO_GET, payload: { results: res.data } });
	} catch (error) {
		// console.log(error);
		dispatch({ type: DOCUMENTOS_TIPO_ERROR });
	}
};

export const addDocumentoTipoAction = (options) => async (dispatch, getState) => {
	const { body } = options; // Opciones para solicitud a  API
	const api = endPoints.documentoTipo.add();
	// console.log(body);
	// console.log(api);
	try {
		const res = await axios.post(api, body);
		// console.log(res);
		toast.success(`DocumentoTipo ${body.id}- ${body.nombre} ha sido agregado existosamente`, {...toastOptions});
		dispatch({ type: DOCUMENTOS_TIPO_ADD, payload: [...getState().usuarios.list, res.data] });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No ha sea podido agregar el rol, porfavor revise los datos e intentelo más tarde`, {...toastOptions});
		toast.error(msg, {...toastOptions});	
		dispatch({ type: DOCUMENTOS_TIPO_ERROR });	
	}
};

export const updateDocumentoTipoAction = (options) => async (dispatch, getState) => {
	const { id, body } = options; // Opciones para solicitud a  API
	const api = endPoints.documentoTipo.update(id); // URL API

	try {
		const res = await axios.patch(api, body);
		// console.log(res.data);
		let newList = getState().documentoTipo.list.map((e) =>  e.id === id ? res.data : e );
		toast.success(`El rol ${body.id} - ${body.nombre} ha sido modificado correctamente`, {...toastOptions});
		dispatch({  type: DOCUMENTOS_TIPO_UPDATE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`El usuario ${body.username} no se ha podido actualizar.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: DOCUMENTOS_TIPO_ERROR });
	}
};

export const deleteDocumentoTipoAction = (options) => async (dispatch, getState) => {
	const { id } = options; // Opciones para solicitud a  API
	const api = endPoints.documentoTipo.delete(id); // URL API
	// console.log(api);
	// console.log(body);
	try {
		const res = await axios.delete(api);
		let newList = getState().documentoTipo.list.filter((e)=> e.id !== id);

		toast.warning(`El rol con ID: ${id} ha sido eliminado.`, {...toastOptions});
		dispatch({ type: DOCUMENTOS_TIPO_DELETE, payload: newList });
	} catch (error) {
		// console.log(error);
		let msg = error.response.data;
		toast.error(`No se ha podido eliminar el rol con ID: ${id}, porfavor vuelva intentarlo más tarde.`, {...toastOptions});
		toast.error(msg, {...toastOptions});
		dispatch({ type: DOCUMENTOS_TIPO_ERROR });
	}
};
