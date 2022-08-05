/**
 ** Texto duro del modulo Administración 
 *? Invocar import { [nombre_modulo] } from '../utils/texts/modAdmin';
 */

const company = {
  title: {
    index: 'Empresa',
    new: 'Agregar nueva empresa',
    edit: 'Editar empresa',
    secEmpresa: 'Configuración',
    secModulo: 'Módulos',
    secDireccion: 'Dirección',
  },
  lbl: { 
    gestion: 'Gestión',
    contabilidad: 'Contabilidad',
    inventario: 'Inventario',
    invMovil: 'Inventario Movil',
    activa: 'Activa',
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
    giro: 'Giro de la empresa',
    changeDireccion: 'Deseas cambiar dirección?'
  },
  btn: {
    agregar: 'Agregar Empresa',
    editar: 'Editar Empresa',
  },
  txt: {
    valRut: '*Campo obligatorio. Formato permitido de RUT: 79456456-k.',
    valRazonSocial: '*Campo obligatorio, con al menos 3 caracteres.',
    valGiro: '*Campo obligatorio, con al menos 3 caracteres.',
    valFono: '*Campo obligatorio. Ejemplo +56999333888 o 27371918 ',
    valEmail: '*Campo obligatorio. Ejemplo: alguien@algunlugar.es ',
    valRegion: '*Campo obligatorio',
    valComuna: '*Campo obligatorio',
    valCalle: '*Campo obligatorio',
    valCiudad: '*Campo obligatorio'
  },
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
  txt: {
    valUsername: '*Campo Requerido. Recuerda que esta permitidos solo caracteres especiales: _ .',
    valUsername2: 'Este username no se encuentra disponible, favor de ingresar otro',
    valPass: '*Campo Requerido',
    valPass2: '*Campo Requerido',
    valNombres: '*Campo Requerido, sin caracteres especiales.',
    valApellidos: '*Campo Requerido, sin caracteres especiales.',
    valEmail: '*Campo Requerido. Ejemplo: prueba@endif.cl',
    valPorcentajeDcto: '*Campo Requerido. Recuerda que el porcentaje no puede ser mayor a 100',
    valEmpresaRut: '*Campo Requerido',
    valRoles: '*Campo Requerido',
    valActivo: '*Campo Requerido',
  },
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
  txt: {
    valNombre: '*Campo obligatorio, sin caracteres especiales.',
  },
  plhld: {
    nombre: 'Encargado de Inventario'
  },
  slct: {},
  lnk: {}
};

const unit = {
  title: {
    index: 'Unidades',
    new: 'Nueva Unidad',
    edit: 'Editar Unidad'
  },
  lbl: {
    nombre: 'Unidad',
    plural: 'Plural'
  },
  btn: {
    agregar: 'Agregar',
    editar: 'Editar'
  },
  txt: {
    valNombre: '*Campo obligatorio. El campo nombre debe contener de 2 a 3 caracteres.',
    valPlural: '*Campo obligatorio. El campo plural debe contener minimo 3 caracteres'
  },
  plhld: {
    nombre: 'UNI',
    plural: 'Unidades'
  },
  slct: {
    txt : 'Seleccione Unidad'
  },
  lnk: {},
};

module.exports = {
  company,
  user,
  role,
  unit
};
