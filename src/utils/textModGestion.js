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
    index: 'Sucursales/Bodegas'
  },
  lbl: {
    id: 'ID',
    nombre: 'Nombre',
    empresa: 'Empresa',
    direccion: 'Direccion',

  },
  btn: {
    agregar: 'Agregar',
    editar: 'Editar',
  },
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