/**
 * * Formulario de Venta
 * ? Para agregar y editar
 */
import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
//* Textos
import endPoints from '@services/api';
import { sales, paymentSale, detailSale,  } from '@utils/texts/modGestion';
import { universal, toastOptions } from '../../utils/texts/general';
//* Componentes propios
import EncabezadoForm from '@components/venta/encabezado/Form';
// import DetalleForm from '@components/venta/detalle/Form';
import PagoForm from '@components/venta/pago/Form';
import Card from '@common/Card';
import Canvas from '@common/OffCanvas';
import SearchProducto from '@components/producto/Search';

//* Redux ~ Duck necesarios
// import { getUsuariosAction } from '@redux/usuariosDuck';
// import { addVentaAction, updateVentaAction } from '@redux/ventasEncabezadoDuck';
// import { getCajasAction } from '@redux/cajasDuck';
// import { getFormasPagoAction } from '@redux/formasPagoDuck';
// import { getDocumentosTipoAction } from '@redux/documentoTipoDuck';
// import {  } from '@redux/ventasDuck';

export default function FormVenta({ formNewVenta = true, ventaForm }) {
	const params = useParams(); //* Acceso a params de la URL
	const dispatch = useDispatch(); //* Disparador
	const navigate = useNavigate(); //* Navegador de Pagina

  //* Info desde pages
  const { encabezado, detalle, pago  } = ventaForm;
  let productList = useSelector((store)=> store.ventas.prod);
  // let usuarios = useSelector((store) => store.usuarios.list);
  // let cajas = useSelector((store) => store.cajas.list);
  // let documentosTipo = useSelector((store) => store.documentoTipo.list);
  // let productos = useSelector((store)=> store.productos.list);
  // let formaPago = useSelector((store) => store.formasPago.list)


  //? Ejecucion de metodo al renderizar pagina
  // useEffect(() => { 
  //   dispatch(getUsuariosAction()); //* Recupera al cargar datos de usuarios
  //   dispatch(getCajasAction()); //* Recupera al cargar datos de cajas
  //   dispatch(getFormasPagoAction()); //* Recupera Formas de Pagos
  //   dispatch(getDocumentosTipoAction()); //* Recupera Tipo de Documento
  //   dispatch(getProductosAction); //* Recupera Productos
  //   // console.log(form.activo)
  // }, []);

	return (
  <Fragment>
    <EncabezadoForm ventaForm={encabezado} />
    
    <Card style='card-default' haveTitle={true} title={sales.title.detalle} >
      <button
        className='btn btn-success float-right mb-2'
        data-bs-toggle='offcanvas'
        data-bs-target='#offcanvasRight'
        aria-controls='offcanvasRight'
      >
        {sales.btn.producto}
      </button>

      {
        productList.length > 0 ? (
            <table id='tab_productos' className='table table-striped-columns table-hover table-sm'>
          <thead>
            <th>{detailSale.lbl.cantidad}</th>
            <th>{detailSale.lbl.neto}</th>
            <th>{detailSale.lbl.iva}</th>
            <th>{detailSale.lbl.total}</th>
            <th>{detailSale.lbl.totalDcto}</th>
            <th>{detailSale.lbl.esExento}</th>
            <th>{detailSale.lbl.producto}</th>
            <th>Acciones</th>
          </thead>
          <tbody>
            
          </tbody>
        </table>
        ) : <span> Agrega un producto </span>
      }
    </Card>

    <div>
      <Link 
        to='/ventas'
        className='btn btn-outline-danger btn-block'
      >
        {universal.btn.volver}
      </Link>
    </div>

    <Canvas 
      key='ProductList'
      title='Agregar a la Compra'
    >
      <SearchProducto  />
    </Canvas>
  </Fragment>
  );
}
