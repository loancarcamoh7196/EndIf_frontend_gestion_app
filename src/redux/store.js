import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import productsReducer from '@redux/productsDuck';
import userAuthReducer, { readUserAction } from '@redux/userAuthDuck';
import companiesReducer from '@redux/companiesDuck';
import usersReducer from '@redux/usersDuck';
import actionsReducer from '@redux/actionsDuck';

const rootReducer = combineReducers({
	products: productsReducer,
	user: userAuthReducer,
	companies: companiesReducer,
	users: usersReducer,
	actions: actionsReducer
});

export default function generateStore() {
	const store = createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(thunk))
	);
	readUserAction()(store.dispatch);

	return store;
}
