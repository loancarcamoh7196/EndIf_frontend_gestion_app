/**
 ** Redux de contenedores Familia - SubFamilia
 *? nombre en store: familiaDetalle 
 */
import axios from 'axios';
import { toast } from 'react-toastify';
import endPoints from '@services/api';
import { refreshTokenAction } from '@redux/userAuthDuck';
import { toastOptions } from '@utils/texts/general';

//Data inicial
const dataInicial = {
	list: [],
};

//* Types
const FAMILIA_DETALLE_LIST = 'FAMILIA_DETALLE_LIST';
const FAMILIA_DETALLE_ERROR = 'FAMILIA_DETALLE_ERROR';

//* Reducer
export default function familiaDetalleReducer(state = dataInicial, action) {
	switch (action.type) {
		case FAMILIA_DETALLE_ERROR:
			return { ...state, ...action.payload };
		case FAMILIA_DETALLE_LIST:
			return { ...state, list: action.payload };
		default:
			return { ...state };
	}
}

//* Action
export const getFamiliaDetalleAction = (options) => async (dispatch, getState) => {

	try {
		const { empresaSession } = getState().auth;
		const api = endPoints.familiaDetalle.list(empresaSession);
		// console.log(api);
		// console.log(body);
		const res = await axios.get(api);	
		dispatch({ type: FAMILIA_DETALLE_LIST, payload: res.data });
	} catch (error) {
    dispatch({ type: FAMILIA_DETALLE_ERROR });
	}
};
