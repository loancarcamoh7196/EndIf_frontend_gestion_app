import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//* Reducers de la App
import userAuthReducer, { readUserAction } from '@redux/userAuthDuck';
import empresasReducer from '@redux/empresasDuck';
import usuariosReducer from '@redux/usuariosDuck';
import regionesReducer from '@redux/regionesDuck';
import comunasReducer from '@redux/comunasDuck';
import rolesReducer from '@redux/rolesDuck';
import tiendasReducer from '@redux/tiendasDuck';
import familiasReducer from '@redux/familiasDuck';
import productosReducer from '@redux/productosDuck';

//Declaración de Reducers
const rootReducer = combineReducers({
	productos: productosReducer,
	user: userAuthReducer,
	empresas: empresasReducer,
	usuarios: usuariosReducer,
	regiones: regionesReducer,
	comunas: comunasReducer,
	roles: rolesReducer,
	tiendas: tiendasReducer,
	familia: familiasReducer,
	productos: productosReducer,
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
