import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//Reducers de la App
import productosReducer from '@redux/productosDuck';
import userAuthReducer, { readUserAction } from '@redux/userAuthDuck';
import empresasReducer from '@redux/empresasDuck';
import usuariosReducer from '@redux/usuariosDuck';
import regionesReducer from '@redux/regionesDuck';
import comunasReducer from '@redux/comunasDuck';

//Declaración de Reducers
const rootReducer = combineReducers({
	productos: productosReducer,
	user: userAuthReducer,
	empresas: empresasReducer,
	usuarios: usuariosReducer,
	regiones: regionesReducer,
	comunas: comunasReducer
});

// Store de App
export default function generateStore() {
	const store = createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(thunk))
	);
	readUserAction()(store.dispatch);

	return store;
}
