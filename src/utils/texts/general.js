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
    marca: 'Marcas',
    unidad: 'Unidades',
    caja: 'Cajas',
    barra: 'Código de Barras',
    cuadratura: 'Cuadraturas',
    formaPago: 'Formas de Pago',
    precio: 'Precios',
    lista: 'Lista de Precios',
    oferta: 'Ofertas',
    promo: 'Promociones',
    turnos: 'Turnos',
    venta: 'Ventas',
    ventaSim: 'Simular Ventas',
    ventaLista: 'Listado Ventas'
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
    company: 'Seleccione Empresa que desea modificar'
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
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const exportTable = {
  copiar: {
    extend: 'copy',
    className: 'btn btn-secundary',
    text: '<i class="fa-solid fa-copy"></i>',
    titleAttr: 'Copiar Tabla',
  },
  csv: {
    extend: 'csvHtml5',
    className: 'btn btn-info',
    text: '<i class="fa-solid fa-file-csv"></i>',
    titleAttr: 'Exportar a CSV',
  },
  excel: {
    extend: 'excelHtml5',
    className: 'btn btn-success',
    text: '<i class="fas fa-file-excel"></i> ',
    title: '',
    filename: 'Cuadratura',
    footer: true,
    titleAttr: 'Exportar a Excel',
  },
  pdf: {
    extend: 'pdfHtml5',
    orientation: 'landscape',
    pageSize:
      'legal',
    alignment:
      'center',
    className:
      'btn btn-danger',
    text: '<i class="fas fa-file-pdf"></i> ',
    title:
      '',
    filename:
      'Cuadratura',
    footer: true,
    titleAttr:
      'Exportar a PDF',
  },
  print: {
    extend:
      'print',
    className:
      'btn btn-info',
    text: '<i class="fa-solid fa-print"></i>',
    titleAttr:
      'Imprimir',
  },
};

module.exports = {
  universal,
  auth,
  exportTable,
  toastOptions
}
