/**
 ** URL de consumo de API's
 * ? Contiene rutas de  API Auth y API Enjambre
 *? 
 */
const API_URL = `${process.env.REACT_APP_API_BACKEND}:${process.env.REACT_APP_API_PORT}`;
const VERSION = `${process.env.REACT_APP_URI_API}`;


/**
 * URI de API_URL backend
 */
const endPoints = {
  auth: {
    login: `${API_URL}/${VERSION}/auth/login`,
    refreshToken: `${API_URL}/${VERSION}/auth/refresh`,
    profile: `${API_URL}/${VERSION}/auth/profile`, 
  },
  empresas: {
    list: (id) => `${API_URL}/${VERSION}/empresas/${id}/`,
    get: () => `${API_URL}/${VERSION}/empresas/`,
    add: () => `${API_URL}/${VERSION}/empresas`,
    update: (id) => `${API_URL}/${VERSION}/empresas/${id}/`,
    delete: (id) => `${API_URL}/${VERSION}/empresas/${id}/`,
  },
  usuario: {
    list: (id) => `${API_URL}/${VERSION}/usuarios/${id}/`,
    get: () => `${API_URL}/${VERSION}/users/`,
    add: () => `${API_URL}/${VERSION}/users`,
    update: (id) => `${API_URL}/${VERSION}/users/${id}/`,
    delete: (id) => `${API_URL}/${VERSION}/users/${id}/`,
  },
  producto: {
    list: () => `${API_URL}/${VERSION}/productos` ,
    get: (id) => `${API_URL}/${VERSION}/productos/${id}`,
    add: () => `${API_URL}/${VERSION}/productos`,
    update: (id) => `${API_URL}/${VERSION}/productos/${id}/edit`,
    delete: (id) => `${API_URL}/${VERSION}/productos/${id}/`,
  },
    
  priceLists: {
    getPriceLists: (bd) => `${API_URL}/${VERSION}/pricelist/?empresaBd=${bd}`,
  },
};

export default endPoints;
