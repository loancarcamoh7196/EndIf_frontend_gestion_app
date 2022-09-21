/**
 ** URL de consumo de API's
 *? Contiene rutas de  API Auth y API Enjambre
 *
 */
const api_url = process.env.REACT_APP_API_BACKEND;
const puerto = process.env.REACT_APP_API_PORT;
const version = process.env.REACT_APP_URI_API;
// console.log(process.env.REACT_APP_API_BACKEND);
// console.log(process.env.REACT_APP_URI_API);

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
  usuarios: {
    list: (options) => {
      const { empresaRut } = options;
      let url = '';

      empresaRut !=
      undefined
        ? (url = `${api_url}:${puerto}/${version}/usuarios/?empresaRut=${empresaRut}`)
        : (url = `${api_url}:${puerto}/${version}/usuarios/`);

      return url;
    },
    get: (id) => `${api_url}:${puerto}/${version}/usuarios/${id}/`,
    add: () => `${api_url}:${puerto}/${version}/usuarios`,
    update: (id) => `${api_url}:${puerto}/${version}/usuarios/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/usuarios/${id}/`,
    confirmUsername: (username) => `${api_url}:${puerto}/${version}/usuarios/${username}/`,
  },
  roles: {
    list: () => `${api_url}:${puerto}/${version}/roles/` ,
    get: (id) => `${api_url}:${puerto}/${version}/roles/${id}`,
    add: () => `${api_url}:${puerto}/${version}/roles`,
    update: (id) => `${api_url}:${puerto}/${version}/roles/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/roles/${id}/`,
  },
  regiones: {
    list: () => `${api_url}:${puerto}/${version}/regiones`,
  },
  comunas: {
    list: () => `${api_url}:${puerto}/${version}/comunas` ,
    get: (id) => `${api_url}:${puerto}/${version}/comunas/${id}`
  },
  direcciones: {
    list: () => `${api_url}:${puerto}/${version}/direcciones` ,
    get: (id) => `${api_url}:${puerto}/${version}/direcciones/${id}`,
    add: () => `${api_url}:${puerto}/${version}/direcciones`,
    update: (id) => `${api_url}:${puerto}/${version}/direcciones/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/direcciones/${id}/`,
  },
  tiendas: {
    list: (options) => {
      const { empresaRut } = options;
      let url = '';
      
      empresaRut !=
      undefined
        ? (url = `${api_url}:${puerto}/${version}/tiendas?empresaRut=${empresaRut}`)
        : (url = `${api_url}:${puerto}/${version}/tiendas`);

      return url;
    } ,
    get: (id) => `${api_url}:${puerto}/${version}/tiendas/${id}`,
    add: () => `${api_url}:${puerto}/${version}/tiendas`,
    update: (id) => `${api_url}:${puerto}/${version}/tiendas/${id}`,
    delete: (id) => `${api_url}:${puerto}/${version}/tiendas/${id}/`,
  },
  productos: {
    list: (options) => {
      const { empresaRut, nombre, codigoInterno } = options;
      let url = `${api_url}:${puerto}/${version}/productos/`;

      if(codigoInterno != undefined && nombre !=  undefined) {
        url = url + `?codigoInterno=${codigoInterno}&nombre=${nombre}`; 
      } else if (nombre != undefined) {
        url = url + `?nombre=${nombre}`
      } else if (codigoInterno != undefined) {
        url = url + `?codigoInterno=${codigoInterno}`
      }

      return url;
    },
    get: (id) => `${api_url}:${puerto}/${version}/productos/${id}`,
    add: () => `${api_url}:${puerto}/${version}/productos`,
    update: (id) => `${api_url}:${puerto}/${version}/productos/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/productos/${id}/`,
  },
  precios: {
    list: (options) => {
      const { listaPrecioId, productoId } = options;
      let url = `${api_url}:${puerto}/${version}/precios/`;

      if( listaPrecioId != undefined && productoId !=  undefined ) {
        url = url + `?listaPrecioId=${listaPrecioId}&productoId=${productoId}`
      } else if( listaPrecioId != undefined ) {
        url = url + `?listaPrecioId=${listaPrecioId}`; 
      } else if (productoId != undefined){
        url = url +`?productoId=${productoId}` ;
      } 

      return url;
    },
    get: (id) => `${api_url}:${puerto}/${version}/precios/${id}`,
    add: () => `${api_url}:${puerto}/${version}/precios`,
    update: (id) => `${api_url}:${puerto}/${version}/precios/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/precios/${id}/`,
  },  
  barras: {
    list: (options) => {
      const { productoId } = options;

      let url = `${api_url}:${puerto}/${version}/barras/`;

      if (productoId != undefined) {
        url = url + `?productoId=${productoId}`;
      }

      return url;
    },
    get: (id) => `${api_url}:${puerto}/${version}/barras/${id}`,
    add: () => `${api_url}:${puerto}/${version}/barras`,
    update: (id) => `${api_url}:${puerto}/${version}/barras/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/barras/${id}/`,
  },
  familias: {
    list: (options) => {
      const { empresaRut } = options;
      let url = '';
      
      empresaRut !=
      undefined
        ? (url = `${api_url}:${puerto}/${version}/familias/?empresaRut=${empresaRut}`)
        : (url = `${api_url}:${puerto}/${version}/familias`);

      return url;
    },
    get: (id) => `${api_url}:${puerto}/${version}/familias/${id}`,
    add: () => `${api_url}:${puerto}/${version}/familias`,
    update: (id) => `${api_url}:${puerto}/${version}/familias/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/familias/${id}/`,
  },
  subFamilias: {
    list: (options) => {
      const { familiaId } = options;
      let url = '';
      
      familiaId !=
      undefined
        ? (url = `${api_url}:${puerto}/${version}/subfamilias?familiaId=${familiaId}`)
        : (url = `${api_url}:${puerto}/${version}/subfamilias`);

      return url;
    },
    get: (id) => `${api_url}:${puerto}/${version}/subfamilias/${id}`,
    add: () => `${api_url}:${puerto}/${version}/subfamilias`,
    update: (id) => `${api_url}:${puerto}/${version}/subfamilias/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/subfamilias/${id}`,
  },
  unidades: {
    list: () => `${api_url}:${puerto}/${version}/unidades`,
    get: (id) => `${api_url}:${puerto}/${version}/unidades/${id}`,
    add: () => `${api_url}:${puerto}/${version}/unidades`,
    update: (id) => `${api_url}:${puerto}/${version}/unidades/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/unidades/${id}`,
  },
  familiaDetalle :{
    list: (empresaRut) => `${api_url}:${puerto}/${version}/familia_detalle/${empresaRut}`,
  },
  marcas: {
    list: () => `${api_url}:${puerto}/${version}/marcas`,
    get: (id) => `${api_url}:${puerto}/${version}/marcas/${id}`,
    add: () => `${api_url}:${puerto}/${version}/marcas`,
    update: (id) => `${api_url}:${puerto}/${version}/marcas/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/marcas/${id}`,
  },
  cajas: {
    list: (empresaRut) => `${api_url}:${puerto}/${version}/caja_detalle/${empresaRut}`,
    get: (id) => `${api_url}:${puerto}/${version}/cajas/${id}`,
    add: () => `${api_url}:${puerto}/${version}/cajas`,
    update: (id) => `${api_url}:${puerto}/${version}/cajas/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/cajas/${id}`,
  },
  listaPrecios: {
    list: (options) => {
      const { empresaRut } = options;
      let url = '';
      
      empresaRut !=
      undefined
        ? (url = `${api_url}:${puerto}/${version}/listaprecios?empresaRut=${empresaRut}`)
        : (url = `${api_url}:${puerto}/${version}/listaprecios`);

      return url;
    },
    get: (id) => `${api_url}:${puerto}/${version}/listaprecios/${id}`,
    add: () => `${api_url}:${puerto}/${version}/listaprecios`,
    update: (id) => `${api_url}:${puerto}/${version}/listaprecios/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/listaprecios/${id}`,
  },
  formaPago : {
    list: () => `${api_url}:${puerto}/${version}/forma_pago`,
    get: (id) => `${api_url}:${puerto}/${version}/forma_pago/${id}`,
    add: () => `${api_url}:${puerto}/${version}/forma_pago`,
    update: (id) => `${api_url}:${puerto}/${version}/forma_pago/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/forma_pago/${id}`,
  },
  documentoTipo: {
    list: () => `${api_url}:${puerto}/${version}/documentos_tipo`,
    get: (id) => `${api_url}:${puerto}/${version}/documentos_tipo/${id}`,
    add: () => `${api_url}:${puerto}/${version}/documentos_tipo`,
    update: (id) => `${api_url}:${puerto}/${version}/documentos_tipo/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/documentos_tipo/${id}`,
  },
  ventas:{
    list: () => `${api_url}:${puerto}/${version}/documentos_tipo`,
    get: (id) => `${api_url}:${puerto}/${version}/documentos_tipo/${id}`,
    add: () => `${api_url}:${puerto}/${version}/documentos_tipo`,
    update: (id) => `${api_url}:${puerto}/${version}/documentos_tipo/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/documentos_tipo/${id}`,
  },
  formasPago:{
    list: () => `${api_url}:${puerto}/${version}/forma_pago`,
    get: (id) => `${api_url}:${puerto}/${version}/forma_pago/${id}`,
    add: () => `${api_url}:${puerto}/${version}/forma_pago`,
    update: (id) => `${api_url}:${puerto}/${version}/forma_pago/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/forma_pago/${id}`,
  },
  tiendaListaPrecio: {
    list: (options) => {
      const { tiendaId, listaPrecioId } = options;
      let url = `${api_url}:${puerto}/${version}/tienda_lista/`;
      
      if (tiendaId != undefined && listaPrecioId != undefined) {
        url = url + `?tiendaId=${tiendaId}&listaPrecioId=${listaPrecioId}`;
      }else if (tiendaId != undefined ) {
        url = url + `?tiendaId=${tiendaId}`;
      }else if (listaPrecioId != undefined) {
        url = url + `?listaPrecioId=${listaPrecioId}`;
      }
      console.log(url);
      return url;
    },
    get: (id) => `${api_url}:${puerto}/${version}/tienda_lista/${id}`,
    add: () => `${api_url}:${puerto}/${version}/tienda_lista`,
    update: (id) => `${api_url}:${puerto}/${version}/tienda_lista/${id}/`,
    delete: (id) => `${api_url}:${puerto}/${version}/tienda_lista/${id}`,
  }
};

export default endPoints;
