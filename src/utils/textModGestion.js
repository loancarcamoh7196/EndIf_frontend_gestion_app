/**
 ** Texto duro del modulo Administración 
 *? Invocar import { [nombre_modulo] } from '../utils/textGestion';
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
    valNombre: '*Campo requerido,  recuerde que no puede ingresar caracteres especiales',
    valCalle: '*Campo requerido,  r caracteres especiales permitidos # , ° .',
    valCiudad: '*Campo requerido, sin caracteres especiales.'
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
  lbl: {},
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {}
};

const family ={
  title: {},
  lbl: {},
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {}
};

const product = {
  title: {},
  lbl: {},
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {}
};

const subfamily = {
  title: {},
  lbl: {},
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {}
};

const brand = {
  title: {},
  lbl: {},
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
  shop
};