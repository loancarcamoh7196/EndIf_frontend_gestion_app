/**
 ** Texto duro del modulo Administración 
 *? Invocar import { [nombre_modulo] } from '../utils/textModAdmin';
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

const company = {
  lbl: { 
  },
  text: {}
};

const user = {
  title: {
    editar: 'Editar Usuario'
  },
  lbl: {
    empresa: 'Empresa',
    roles: 'Roles',
    username: 'Usuario',
    pass: 'Contraseña',
    pass2: 'Confirmar Contraseña',
    nombres: 'Nombres',
    apellidos: 'Apellidos',
    email: 'Email',
    porcentajeDcto: '% de DCTO',
    activo: 'Usuario activo?',
    changePass: '¿Desea cambiar contraseña?'
  },
  btn: {
    agregar: 'Agregar Usuario',
    editar: 'Editar Usuario',
  },
  txt: {},
  plhld: {
    username: 'user_name',
    pass: '*****',
    nombres: 'Juan Pablo',
    apellidos: 'Flores Gaete',
    email: 'Email',
    porcentajeDcto: '15',
  },
  slct: {
    empresa: 'Seleccione Empresa',
    roles: 'Seleccione Roles'
  }
};

const role = {
  title:{
    index: 'Roles',
    new: 'Agregar nuevo Rol',
    edit: 'Editar Rol'
  },
  lbl:{
    id: 'ID',
    nombre: 'Nombre',
    accesoGestion: 'Acceso a Gestión',
    accesoPv: 'Acceso a Puntos de Ventas',
    accesoContabilidad: 'Acceso a Contabilidad',
    accesoInventario: 'Acceso a Inventario',
    accesoInventarioMovil: 'Acceso a Inventario Movil'
  },
  btn: {
    agregar: 'Agregar Rol',
    editar: 'Editar Rol',
  },
  txt: {},
  plhld: {
    nombre: 'Encargado de Inventario'
  },
  slct: {},
  lnk: {}
};

module.exports = {
  universal,
  company,
  user,
  role
}; 
