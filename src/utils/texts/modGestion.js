/**
 ** Texto duro del modulo Administración 
 *? Invocar import { [nombre_modulo] } from '../utils/texts/modGestion';
 */
const universal = {
  btn: {
    volver: 'Volver'
  },
  title: {},
  lbl: {
    nueva: 'Nueva'
  }
};

const shop = {
  title: {
    index: 'Sucursales/Bodegas',
    new: 'Agregar Nueva Sucursal',
    secDireccion: 'Dirección'
  },
  lbl: {
    id: 'ID',
    nombre: 'Nombre',
    empresa: 'Empresa',
    direccion: 'Direccion',
    changeDireccion: 'Desea cambiar de Dirección?',
    region: 'Región',
    comuna: 'Comuna',
    calle: 'Calle',
    ciudad: 'Ciudad',
  },
  btn: {
    agregar: 'Agregar',
    editar: 'Editar',
  },
  txt: {
    valNombre: '* Campo requerido, recuerde que no puede ingresar caracteres especiales',
    valCalle: '* Campo requerido, caracteres especiales permitidos # , ° .',
    valCiudad: '* Campo requerido, sin caracteres especiales.'
  },
  plhld: {  
    nombre: 'Sucursal Apoquindo',
    calle: 'Avenida Pajaritos 556',
    ciudad: 'Santiago'
  },
  slct: {
    empresa: 'Seleccione Empresa',
    region: 'Seleccione Región',
    comuna: 'Seleccione Comuna'
  },
  lnk: {}
};

const address = {
  title: {},
  lbl: {
    id: 'ID',
    calle: 'Calle',
    ciudad: 'Ciudad',
    comunaId: 'Comuna'
  },
  btn: {},
  txt: {},
  plhld: {},
  slct: {
    comunas: 'Seleccione Comuna'
  },
  lnk: {}
};

const family ={
  title: {
    index: 'Familias',
    new: 'Agregar familia',
    edit: 'Editar familia',
  },
  lbl: {
    id: 'ID',
    nombre: 'Nombre',
    empresaRut: 'RUT Empresa'
  },
  btn: {
    agregar: 'Agregar',
    editar: 'Editar',
  },
  txt: {},
  plhld: {
    nombre: 'Cervezas',
  },
  slct: {
    empresas: 'Seleccione Empresa'
  },
  lnk: {}
};

const subfamily = {
  title: {
    index: 'SubFamilia',
    new: 'Nueva Sub Familia',
    edit: 'Editar Sub Familia'
  },
  lbl: {
    id: 'ID',
    nombre: 'Nombre Subfamilia',
    empresaRut: 'RUT Empresa',
  },
  btn: {},
  txt: {},
  plhld: {},
  slct: {
    subfamilia: 'Seleccione SubFamilia',
  },
  lnk: {}
};

const product = {
  title: {
    index: 'Productos',
    new: 'Nuevo Producto',
    edit: 'Editar Producto',
  },
  lbl: {
    id: 'ID Producto',
    nombre: 'Nombre del Producto',
    codigo: 'Codigo Interno',
    activo: 'Producto Activo?',
    exento: 'Esta exento?',
    esInventario: 'Es Inventario?',
    comanda: 'Es comanda',
    esIngrediente: 'Es Ingrediente?',
    tieneEnvase: 'Tiene Envase?',
    empresaRut: 'Empresa',
    unidadId: 'Tipo Producto',
    subfamilia: 'Subfamilia'
  },
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {}
};

const brand = {
  title: {},
  lbl: {
    nombre: 'Marca del Producto'
  },
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {}
};

const tax = {
  title: {},
  lbl: {},
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {}
};

const toastOptions = {
  position: 'top-right',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

module.exports = {
  toastOptions,
  universal,
  shop,
  address,
  family,
  product,
  subfamily,
  brand,
  tax
};