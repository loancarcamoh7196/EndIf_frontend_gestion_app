/**
 ** Configuración de Store
 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import storage from 'redux-persist/lib/storage';

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
import subFamiliasReducer from '@redux/subFamiliasDuck';
import unidadesReducer from '@redux/unidadesDuck';
import familiaDetalleReducer from '@redux/familiaDetalleDuck';
import marcasReducer from '@redux/marcasDuck';
import cajasReducer from '@redux/cajasDuck';

//* Declaración de Reducers
const appReducer = combineReducers({
	auth: userAuthReducer,
	empresas: empresasReducer,
	usuarios: usuariosReducer,
	regiones: regionesReducer,
	comunas: comunasReducer,
	roles: rolesReducer,
	tiendas: tiendasReducer,
	familias: familiasReducer,
	productos: productosReducer,
	subfamilias: subFamiliasReducer,
	unidades: unidadesReducer,
	familiaDetalle: familiaDetalleReducer,
	marcas: marcasReducer,
	cajas: cajasReducer
});

//* Limpieza de Storage en caso de logout
const rootReducer= (state, action)=>{
	if (action.type === 'USER_LOGOUT')  return appReducer(undefined, action);
  return appReducer(state, action)
}
//* Persist - Redux
const persistConfig ={
	key: 'app',
	storage,
	whitelist: ['auth', 'empresas'],
	stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

//* Store de App
export default function generateStore() {
	const store = createStore(
		persistedReducer,
		composeWithDevTools(applyMiddleware(thunk))
	);
	// readUserAction()(store.dispatch, store.getState);

	const persistor = persistStore(store);	

	return { persistor, store };
}

