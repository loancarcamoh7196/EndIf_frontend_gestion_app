/**
 ** Texto duro del modulo Universal 
 *? Invocar import { universal } from '../utils/text/general';
 */
const universal = {
  title: {
    endif: 'EndIf',
    gestion: 'Gestión',
    inicieSession: 'Inicie Sesión',
    dashboard: 'Dashboard',
    admin: 'Administración',
    mantenedor: 'Gestión',
    empresa: 'Empresas',
    usuario: ' Usuarios',
    roles: 'Roles',
    producto: 'Productos',
    tienda: 'Sucursales',
    familia: '(Sub) Familias',

  },
  lbl: {
    usuario: 'Usuario',
    contraseña: 'Contraseña',
    recuerdame: 'Recuerdame',
    home: 'Home',
    dashboard: 'Dashboard',
    admin: 'Administración',
    brandCompany: 'EndIf'
  },
  btn: {
    ingresar: 'Ingresar',
    volver: 'Volver',
    cerrar: 'Cerrar Sesión',
    new: 'Nueva',
  },
  txt: {
    forget: 'Olvide mi contraseña',
    altEmpresa: 'Endif Logo',
    informe: 'Informe',
    reminderCompany: 'Recuerda seleccionar Empresa'
  },
  plhld: {
    search: 'Buscar ...',
  },
  slct: {
    empresa: 'Seleccione Empresa',
  },
  lnk: {},
};

const auth = {
  title: {},
  lbl: {},
  btn: {},
  txt: {
    success: 'Inicio de Sesión Exitoso',
    loginError: 'No ha se ha podido iniciar sesión',
    refreshError: 'No ha podido actualizar la sesión',
    closeSession: 'Se ha cerrado sesión',

  },
  plhd: {},
  slct: {},
  lnk:{}
};

const toastOptions= {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,

};

module.exports = {
  universal,
  auth,
  toastOptions
}
