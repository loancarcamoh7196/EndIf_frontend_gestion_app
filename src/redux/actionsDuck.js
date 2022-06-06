import axios from 'axios';
import endPoints from '@services/api';

//Data inicial
const dataInicial = {
  formShow: false,
	newForm: false,
	formContent: {}
};

//Types
const ACTIONS_ERROR = 'ACTIONS_ERROR';
const ACTION_FORM = 'ACTIONS_FORM';
const ACTION_GET = 'ACTION_GET';
const ACTION_ADD = 'ACTION_ADD';
const ACTION_UPDATE = 'ACTION_UPDATE';
const ACTION_DELETE = 'ACTION_DELETE';


//Reducer
export default function actionsReducer(state = dataInicial, action) {
	switch (action.type) {
		case ACTIONS_ERROR:
			return { ...state, ...action.payload };
		case ACTION_FORM:
			return { ...state, formShow: action.payload.formShow, formContent: action.payload.formContent };
		// case ACTION_GET:
		// 	return { ...state, results: action.payload };
    // case ACTION_ADD:
    //   return { ...state, ...action.payload };
		// case ACTION_UPDATE:
		// 	return { ...state,  results: action.payload };
		// case ACTION_DELETE:
		// 	return { ...state, results: action.payload };
		default:
			return { ...state };
	}
}

// Action
export const modifeStateFormAction = (options) => async (dispatch, getState) => {
  const { formShow, formContent } = getState().actions;
	
	try {
		dispatch({
			type: ACTION_FORM,
			payload: {formShow: !formShow, formContent:{ ...options}}
		});
		console.log(getState().actions);
	} catch (error) {
		console.log(error);
		dispatch({ type: ACTIONS_ERROR });
	}
};

