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
import { universal, toastOptions } from '@utils/texts/general';
//* Componentes propios
import Card from '@common/Card';
import Canvas from '@common/OffCanvas';
import DetalleForm from '@components/venta/detalle/Form';
import SearchProducto from '@components/producto/Search';


//* Redux ~ Duck necesarios
import { getUsuariosAction } from '@redux/usuariosDuck';
import { addVentaAction, updateVentaAction } from '@redux/ventasEncabezadoDuck';
import { getCajasAction } from '@redux/cajasDuck';
import { getFormasPagoAction } from '@redux/formasPagoDuck';
import { getDocumentosTipoAction } from '@redux/documentoTipoDuck';
import { getProductosAction } from '@redux/productosDuck';

export default function FormVenta({ formNewVenta = true, ventaForm }) {
	const params = useParams(); //* Acceso a params de la URL
	const dispatch = useDispatch(); //* Disparador
	const navigate = useNavigate(); //* Navegador de Pagina
  
  let usuarios = useSelector((store) => store.usuarios.list);
  let cajas = useSelector((store) => store.cajas.list);
  let documentosTipo = useSelector((store) => store.documentoTipo.list);
  let productos = useSelector((store)=> store.productos.list);
  let formaPago = useSelector((store) => store.formasPago.list)

  const [validation, setValidation] = useState({
		fecha: false,
    nroDocumento: false,
    neto: false,
    iva: false,
    exento: false,
    total: false,
    usuarioId: false,
    cajaId: false,
    documentoTipoId: false
	});

	const validacion = (campo) => {
		const _rut = /^(\d{1,2}(\d{3}){2}-[\dkK])$/;
		const _fono = /^(\+?56)?(\s?)[98765432]\d{8}$/mg;
		const _email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const _salesname = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/mg;
    const _names = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/gm;
    const _pass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/gm;

		// console.log(campo);
    // console.log(validation);

		if (campo.nombre === 'salesname') {
			(campo.valor.length > 0 && campo.valor.length <=30 && _salesname.test(campo.valor)) ? setValidation({...validation, salesname: true}) : setValidation({...validation, salesname: false});
		}else if (campo.nombre === 'nombres' ){
			(campo.valor.length >= 3 && campo.valor.length <=30 && _names.test(campo.valor)) ? setValidation({...validation, nombres: true}) : setValidation({...validation, nombres: false});
		}else if ((campo.nombre === 'pass' && _pass.test(campo.valor)) || (campo.nombre === 'pass2' && _pass.test(campo.valor))) {
			(campo.valor.length >= 5 && campo.valor.length <=50 ) ? setValidation({...validation, pass: true, pass2: true}) : setValidation({...validation, pass: false, pass2: false});
		}else if (campo.nombre === 'apellidos'){
			(campo.valor.length <=20 && _names.test(campo.valor)) ? setValidation({...validation, apellidos: true}) : setValidation({...validation, apellidos: false});
		}else if (campo.nombre === 'email'){
			(campo.valor.length <=50 && _email.test(campo.valor)) ? setValidation({...validation, email: true}) : setValidation({...validation, email: false});
		}else if (campo.nombre === 'porcentajeDcto' && campo.valor <=100 ){  
			(campo.valor.length <=3) ? setValidation({...validation, porcentajeDcto: true}) : setValidation({...validation, porcentajeDcto: false});
		}else  return false;
	}

	//? Almacenamiento de Datos formulario
  const [form, setForm] = useState({
    id: ventaForm.id,
    fecha: ventaForm.fecha,
    nroDocumento: ventaForm.nroDocumento,
    neto: ventaForm.neto,
    iva: ventaForm.iva,
    exento: ventaForm.exento,  
    total: ventaForm.total,
    usuarioId: ventaForm.usuarioId,
    cajaId: ventaForm.cajaId,
    documentoTipoId: ventaForm.documentoTipoId
  });


	/**
	 * * Manejador de Actualizar VentaEncabezado
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => { 
		const { id } = params; // Extraer ID de URL
		try {
			const options = { id, body: form };
			// dispatch(update(options));
			// navigate('/ventas');
		} catch (error) {
			console.log(error);
		}
	};

	/** 
	 * * Manejador para Agregar VentaEncabezado
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {	
      // dispatch(addUsuarioAction({body: form}));
      // navigate('/ventas');
		} catch (error) {
      console.log(error);
		}
	};

  const handleChange = (e) => {
    const target = e.target;
    const value = (target.type === 'checkbox' ? target.checked : target.value);
    const name = target.name;
    setForm({  ...form, [name]: value });
		// console.log(form);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		formNewVenta ? postData(form) : putData(form);
	};

    //? Ejecucion de metodo al renderizar pagina
  useEffect(() => { 
    dispatch(getUsuariosAction()); //* Recupera al cargar datos de usuarios
    dispatch(getCajasAction()); //* Recupera al cargar datos de cajas
    // console.log(form.activo)
  }, []);


	return (
  <Fragment>
    <form onSubmit={handleSubmit}>
      <Card style='card-default'  haveTitle={true} title={sales.title.encabezado} >
        <div className='row'>
          <div className='col-sm-6'>
            {!formNewVenta && (
              <div className='form-group'>
                <label htmlFor='id'> { sales.lbl.id } </label>
                <input
                  type='number'
                  className='form-control form-control-border'
                  name='id'
                  placeholder='001'
                  value={form.id}
                />
              </div>
            )}
            <div className='form-group'>
              <label htmlFor='nroDocumento'>{sales.lbl.nro}</label>
              <input
                type='text'
                className={`form-control form-control-border ${ !validation.nroDocumento && 'is-invalid' }`}
                name='nroDocumento'
                // placeholder={sales.plhld.nroDocumento}
                onChange={handleChange}
                value={form.nroDocumento}
                required
                onBlur={e => { validacion( { nombre: 'nroDocumento', valor: e.target.value }) }}
              />
              {!validation.nroDocumento && (<span className='text-danger'>{sales.txt.valNroDoc}</span>)}
            </div>  
          </div>
          <div className='col-sm-6'>
            <div className='form-group'>
              <label htmlFor='fecha'> {sales.lbl.fecha} </label>
              <input
                type='datetime-local'
                className={`form-control form-control-border ${ !validation.fecha &&  'is-invalid'}` }
                name='fecha'
                placeholder={sales.plhld.fecha}
                onChange={handleChange}
                value={form.fecha}
                maxLength={30}
                required
                onBlur={ e => { validacion({ nombre: 'fecha', valor: e.target.value }) }}
              />
              {!validation.fecha && (<span className='text-danger'>{sales.txt.valFecha}</span> )}
            </div>
          </div>
          <div className='col-sm-3'>
            <div className='form-group'>
              <label htmlFor='neto'>{sales.lbl.neto}</label>
              <input
                type='number'
                className={`form-control form-control-border`}
                name='neto'
                placeholder={sales.plhld.neto}
                onChange={handleChange}
                value={form.neto}
                disabled
              />
            </div>
          </div>
          <div className='col-sm-3'>
            <div className='form-group'>
              <label htmlFor='iva'>{sales.lbl.iva}</label>
              <input
                type='number'
                className='form-control form-control-border'
                name='iva'
                placeholder={sales.plhld.iva}
                onChange={handleChange}
                value={form.iva}
                disabled
              />
            </div>
          </div>
          <div className='col-sm-3'>
            <div className='form-group'>
              <label htmlFor='exento'>{sales.lbl.exento}</label>
              <input
                type='number'
                className='form-control form-control-border'
                name='exento'
                placeholder={sales.plhld.exento}
                onChange={handleChange}
                value={form.exento}
                disabled
              />
            </div>
          </div>
          <div className='col-sm-3'>
            <div className='form-group'>
              <label htmlFor='total'>{sales.lbl.total}</label>
              <input
                type='number'
                className='form-control form-control-border'
                name='total'
                placeholder={sales.plhld.total}
                onChange={handleChange}
                value={form.total}
                disabled
              />
            </div>
          </div>
          
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='usuarioId'>{sales.lbl.usuario}</label>
              <select
              name='usuarioId' 
              className='form-control select2 custom'
              onChange={handleChange}
              required
            >
              <option disabled='disabled' selected={formNewVenta && 'selected'} value='0'>
                {sales.slct.usuario} 
              </option>
              {(usuarios.length > 0) && usuarios.map(i => <option value={i.id} selected={i.id === form.usuarioId && 'selected'}>{i.username}</option>)}
            </select>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='cajaId'>{sales.lbl.caja}</label>
              <select
              id='cajaId'
              name='cajaId'
              className='form-control select2'
              onChange={handleChange} 
              required
            >
              <option disabled selected={formNewVenta && 'selected'}>{sales.slct.caja}</option>
              {(cajas.length > 0 ) && cajas.map((i)=> <option value={i.cajaId} selected={i.id === form.cajaId && 'selected'} >{i.cajaNombre}</option>)}
            </select> 
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='documentoTipoId'>{sales.lbl.tipoDoc}</label>
              <select
              id='documentoTipoId'
              name='documentoTipoId'
              className='form-control select2'
              onChange={handleChange} 
              required
            >
              <option disabled selected={formNewVenta && 'selected'}>{sales.slct.documentoTipo}</option>
              {(documentosTipo.length > 0 )&& documentosTipo.map((i)=> <option value={i.id} selected={i.id === form.documentoTipoId && 'selected'} >{i.descripcion}</option>)}
            </select> 
            </div>
          </div>

          <div className='d-grid gap-2 d-md-block '>
            <input  
              type='submit'
              className='btn btn-info btn-sm'
              value={sales.btn.detailAdd}
            />
          </div>  
        </div>
      </Card>

    </form>
    <Canvas 
        key='ProductList'
        title='Agregar a la Compra'
    >
      <SearchProducto  />
    </Canvas>
  </Fragment>    
  );
}
