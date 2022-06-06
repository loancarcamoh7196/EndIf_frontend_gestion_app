import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import productosReducer from '@redux/productosDuck';
import userAuthReducer, { readUserAction } from '@redux/userAuthDuck';
import empresasReducer from '@redux/empresasDuck';
import usuariosReducer from '@redux/usuariosDuck';
// import actionsReducer from '@redux/actionsDuck';

const rootReducer = combineReducers({
	productos: productosReducer,
	user: userAuthReducer,
	empresas: empresasReducer,
	usuarios: usuariosReducer,
	// actions: actionsReducer
});

export default function generateStore() {
	const store = createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(thunk))
	);
	readUserAction()(store.dispatch);

	return store;
}
