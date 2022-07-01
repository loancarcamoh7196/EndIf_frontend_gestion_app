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
  title: {
    index: 'Empresa',
    new: 'Agregar nueva empresa',
    edit: 'Editar empresa',
    secEmpresa: 'Configuración',
    secModulo: 'Módulos',
  },
  lbl: { 
    gestion: 'Gestión',
    contabilidad: 'Contabilidad',
    inventario: 'Inventario',
    invMovil: 'Inventario Movil',
    onActiva: 'Empresa Activa',
    offActiva: 'Empresa Desactivada',
    region: 'Region',
    comuna: 'Comuna',
    ciudad: 'Ciudad',
    calle: 'Calle',
    rut: 'RUT Empresa',
    razonSocial: 'Razón Social',
    fono: 'Fono de Contacto',
    email: 'Email',
    giro: 'Giro de la empresa'
  },
  btn: {
    agregar: 'Agregar Empresa',
    editar: 'Editar Empresa',
  },
  txt: {},
  plhld: {
    rut: '12345678',
    razonSocial: 'Razón Social',
    giro: 'Giro',
    fono: '+56971717171',
    calle: 'Calle Ocho 585, of 207',
    ciudad: 'Santiago',
  },
  slct: {
    region: 'Seleccione Región',
    comuna: 'Seleccione Comuna',
  },
  lnk: {}
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
