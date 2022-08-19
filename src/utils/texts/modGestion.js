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
    familiaId: 'Familia ID',
  },
  btn: {
    new: 'Agregar',
    edit: 'Editar',
    showSubFamily: 'Ver Sub Familias'
  },
  txt: {
    valNombre: '*Campo Obligatorio. '
  },
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
    seccionBasica: 'Información Básica',
    seccionRelacion: 'Relaciones del Producto'
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
    unidadId: 'Unidad del Producto',
    subfamilia: 'Subfamilia a la que pertenece'
  },
  btn: {
    agregar: 'Agregar',
    editar: 'Editar'
  },
  txt: {
    valNombre: '*Campo Obligatorio',
    valCodigo: '*Campo Obligatorio',
    errAdd: 'No ha sea podido agregar el producto, porfavor revise los datos e intentelo más tarde',
    
  },
  plhld: {
    nombre: 'Coca Cola',
    codigo: 'CC-250',
  },
  slct: {
    unidad: 'Seleccione Unidad',
    subfamilia: 'Seleccione Sub Familia',
  },
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

const barcode = {
  title: {},
  lbl: {
    id: 'ID',
    codigo: 'Codigo',
    producto: 'Producto',
    unidad: 'Unidad'
  },
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {},
};

const cashRegister = {
  title: {
    index: 'Cajas',
    new: 'Nueva Caja',
    edit: 'Editar Caja'
  },
  lbl: {
    id: 'ID',
    nombre: 'Nombre',
    numero: 'Número',
    puerto: 'Puerto',
    serv: 'Servidor',
    serv2: 'Servidor 2',
    cnx: 'Conexión',
    esFabrica: 'Es fábrica',
    activa: 'Esta activa?',
    sincroniza: 'Sincroniza?',
    tienda: 'Tienda',
  },
  btn: {
    agregar: 'Agregar',
    editar: 'Editar'
  },
  txt: {},
  plhld: {
    nombre: 'Providencia ',
    numero: '2',
    puerto: '3030',
    serv: '168.15.25.76',
    serv2: '172.1168.1.1',
    cnx: 'http',
  },
  slct: {
    tienda: 'Seleccione Tienda',
  },
  lnk: {},
};

const price = {
  title: {},
  lbl: {},
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {},
};

const priceList = {
  title: {
    index: 'Lista de Precios',
    new: 'Agregar nueva Lista de Precios',
    edit: 'Editar Lista de Precios'
  },
  lbl: {
    id: 'ID',
    lista: 'Lista',
    empresaRut: 'Empresa RUT'
  },
  btn: {
    new: 'Agregar',
    edit: 'Editar'
  },
  txt: {},
  plhld: {
    lista: 'Lista Precios'
  },
  slct: {
    empresa: 'Seleccione Empresa'
  },
  lnk: {},
};

const quadrature = {
  title: {},
  lbl: {},
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {},
};

const documentType = {
  title: {},
  lbl: {},
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {},
};

const paymentMethod = {
  title: {},
  lbl: {
    id: 'ID',
    nombre: 'Nombre',
    descripcion: 'Descripción',
  },
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {},
};

const sales = {
  title: {
    index: 'Ventas',
    new: '[Simular] Ingresar nueva Venta',
    edit: 'Editar Venta',
    encabezado: 'Encabezado de Venta',
    detalle: 'Detalle Venta',
    pago: 'Tipo Pago'
  },
  lbl: {
    id: 'ID',
    fecha: 'Fecha Venta',
    nro: 'Nro de Documento',
    neto: 'Valor Neto',
    iva: 'Valor IVA',
    exento: 'Exento de IVA',
    total: 'Total',
    usuario: 'Usuario',
    caja: 'Caja',
    tipoDoc: 'Tipo de Documento'
  },
  btn: {
    new: 'Agregar',
    edit: 'Editar',
    generar: 'Generar',
  },
  txt: {},
  plhld: {},
  slct: {
    usuario: 'Seleccione Usuario',
    caja: 'Selecciones Caja',
    documentoTipo: 'Seleccione Tipo de Documento'
  },
  lnk: {},
};

const detailSale = {
  title: {},
  lbl: {
    id: 'ID',
    cantidad: 'Cantidad',
    neto: 'Neto',
    iva: 'IVA',
    total: 'Total',
    totalDcto: 'Total DCTO',
    esExento: 'Es exento?',
    ventaEncabezado: 'Encabezado ',
    producto: 'Producto'
  },
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {}
};

const paymentSale = {
  title: {},
  lbl: {
    id: 'ID',
    monto: 'Monto de Pago',
    formaPago: 'Forma de Pago',
  },
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {}
};

const productSale = {
  title: {},
  lbl: {},
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {},
};

const retailPrice = {
  title: {},
  lbl: {},
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {},
};

const log = {
  title: {},
  lbl: {},
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {},
};

const shift = {
  title: {},
  lbl: {},
  btn: {},
  txt: {},
  plhld: {},
  slct: {},
  lnk: {},
};


const toastOptions = {
  position: 'top-right',
	autoClose: 3500,
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
  tax,
  cashRegister,
  priceList,
  price,
  sales,
  detailSale,
  paymentSale,
  productSale,
  paymentMethod
};