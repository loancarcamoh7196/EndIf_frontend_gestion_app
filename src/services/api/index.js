/**
 ** URL de consumo de API's
 * ? Contiene rutas de  API Auth y API Enjambre
 *? 
 */
const api_url = process.env.REACT_APP_API_BACKEND;
const puerto = process.env.REACT_APP_API_PORT;
const version = process.env.REACT_APP_URI_API;

console.log(process.env.REACT_APP_API_BACKEND);
console.log(process.env.REACT_APP_URI_API);




/**
 * URI de API_URL backend
 */
const endPoints = {
  auth: {
    login: `${api_url}:${puerto}/${version}/auth/login`,
    refreshToken: `${api_url}:${puerto}/${version}/auth/refresh`,
    profile: `${api_url}:${puerto}/${version}/auth/profile`, 
  },
  empresas: {
    list: () => `${api_url}:${puerto}/${version}/empresas`,
    get: (id) => `${api_url}:${puerto}/${version}/empresas/${id}`,
    add: () => `${api_url}:${puerto}/${version}/empresas`,
    update: (id) => `${api_url}:${puerto}/${version}/empresas/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/empresas/${id}/`,
  },
  usuario: {
    list: (id) => `${api_url}:${puerto}/${version}/usuarios/${id}/`,
    get: () => `${api_url}:${puerto}/${version}/users/`,
    add: () => `${api_url}:${puerto}/${version}/users`,
    update: (id) => `${api_url}:${puerto}/${version}/users/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/users/${id}/`,
  },
  roles: {
    list: () => `${api_url}:${puerto}/${version}/roles` ,
    get: (id) => `${api_url}:${puerto}/${version}/roless/${id}`,
    add: () => `${api_url}:${puerto}/${version}/roless`,
    update: (id) => `${api_url}:${puerto}/${version}/roles/${id}/edit`,
    delete: (id) => `${api_url}:${puerto}/${version}/roles/${id}/`,
  },
  producto: {
    list: () => `${api_url}:${puerto}/${version}/productos` ,
    get: (id) => `${api_url}:${puerto}/${version}/productos/${id}`,
    add: () => `${api_url}:${puerto}/${version}/productos`,
    update: (id) => `${api_url}:${puerto}/${version}/productos/${id}/edit`,
    delete: (id) => `${api_url}:${puerto}/${version}/productos/${id}/`,
  },
  listaPrecio: {
    list: () => `${api_url}:${puerto}/${version}/listaprecios` ,
    get: (id) => `${api_url}:${puerto}/${version}/listaprecios/${id}`,
    add: () => `${api_url}:${puerto}/${version}/listaprecios`,
    update: (id) => `${api_url}:${puerto}/${version}/listaprecios/${id}/edit`,
    delete: (id) => `${api_url}:${puerto}/${version}/listaprecios/${id}/`,
  },  
  priceLists: {
    getPriceLists: (bd) => `${api_url}:${puerto}/${version}/pricelist/?empresaBd=${bd}`,
  },
};

export default endPoints;
