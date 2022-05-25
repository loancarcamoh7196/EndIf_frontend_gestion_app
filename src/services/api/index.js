/**
 ** URL de consumo de API's
 * ? Contiene rutas de  API Auth y API Enjambre
 *? 
 */
const API_URL = `${process.env.API_BACKEND}:${process.env.API_PORT}`;
const VERSION = `${process.env.URI_API}`;


/**
 * URI de API_URL backend
 */
const endPoints = {
  auth: {
    login: `${API_URL}/${VERSION}/auth/login`,
    refreshToken: `${API_URL}/${VERSION}/auth/refresh`,
    profile: `${API_URL}/${VERSION}/auth/profile`, 
  },
  companies: {
    getCompany: (id) => `${API_URL}/${VERSION}/companies/${id}/`,
    getCompanies: () => `${API_URL}/${VERSION}/companies/`,
    addCompany: () => `${API_URL}/${VERSION}/companies`,
    updateCompany: (id) => `${API_URL}/${VERSION}/companies/${id}/`,
    deleteCompany: (id) => `${API_URL}/${VERSION}/companies/${id}/`,
  },
  users: {
    getUser: (id) => `${API_URL}/${VERSION}/users/${id}/`,
    getUsers: () => `${API_URL}/${VERSION}/users/`,
    addUser: () => `${API_URL}/${VERSION}/users`,
    updateUser: (id) => `${API_URL}/${VERSION}/users/${id}/`,
    deleteUser: (id) => `${API_URL}/${VERSION}/users/${id}/`,
  },
  products: {
    getProducts: () => `${API_URL}/${VERSION}/products` ,
    getProduct: (id) => `${API_URL}/${VERSION}/products/${id}`,
    addProduct: () => `${API_URL}/${VERSION}/products`,
    updateProduct: (id) => `${API_URL}/${VERSION}/products/${id}/edit`,
    deleteProduct: (id) => `${API_URL}/${VERSION}/products/${id}/`,
  },
  priceLists: {
    getPriceLists: (bd) => `${API_URL}/${VERSION}/pricelist/?empresaBd=${bd}`,
  },
};

export default endPoints;
