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
import Card from '@common/Card';
import DetalleForm from '@components/venta/detalle/Form';
//* Redux ~ Duck necesarios
import { getUsuariosAction } from '@redux/usuariosDuck';
import { addVentaAction, updateVentaAction } from '@redux/ventasEncabezadoDuck';
import { getCajasAction } from '@redux/cajasDuck';
import { getFormasPagoAction } from '@redux/formasPagoDuck';
import { getDocumentosTipoAction } from '@redux/documentoTipoDuck';


export default function FormVenta({ formNewVenta = true, ventaForm }) {
	const params = useParams(); //* Acceso a params de la URL
	const dispatch = useDispatch(); //* Disparador
	const navigate = useNavigate(); //* Navegador de Pagina
  
  let usuarios = useSelector((store) => store.usuarios.list);
  let cajas = useSelector((store) => store.cajas.list);
  let documentosTipo = useSelector((store) => store.documentoTipo.list);
  // const encabezado = useSelector();
  // const formaPago = useSelector(store => store.formasPago.list)

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
    encabezado: {
      id: ventaForm.encabezado.id,
      fecha: ventaForm.encabezado.fecha,
      nroDocumento: ventaForm.encabezado.nroDocumento,
      neto: ventaForm.encabezado.neto,
      iva: ventaForm.encabezado.iva,
      exento: ventaForm.encabezado.exento,  
      total: ventaForm.encabezado.total,
      usuarioId: ventaForm.encabezado.usuarioId,
      cajaId: ventaForm.encabezado.cajaId,
      documentoTipoId: ventaForm.encabezado.documentoTipoId
    },
    detalle: {
      id: ventaForm.detalle.id,
      cantidad: ventaForm.
    },
    pago: {}
	});
	
	/**
	 * * Manejador de Actualizar Usuario
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => { 
		// console.log('Entro en Editar')
		const { id } = params; // Extraer ID de URL
		try {

			const options = { id, body: form };
			// dispatch(update(options));
			navigate('/ventas');
		} catch (error) {
			console.log(error);
			// setMessage('Falló la edición');
		}
		// console.log('Soy update');
	};

	/** 
	 * * Manejador para Agregar Usuario
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {	
      // dispatch(addUsuarioAction({body: form}));
      navigate('/ventas');
		} catch (error) {
			// setMessage('Falló la edición');
      console.log(error);
		}
		// console.log('Soy Agregar');
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
    dispatch(getFormasPagoAction());
    dispatch(getDocumentosTipoAction());
    // console.log(form.activo)
  }, []);


	return (
    <Fragment>
      <form onSubmit={handleSubmit} >
        <Card style='card-default'  haveTitle={true} title={sales.title.encabezado} >
          <div className='row'>
            <div className='col-sm-6'>
              {!formNewVenta && ( // Opcion modificar contraseña, para editar
                <div className='form-group'>
                  <label htmlFor='id'> { sales.lbl.id } </label>
                  <input
                    type='number'
                    className='form-control form-control-border'
                    name='id'
                    placeholder='001'
                  />
                </div>
              )}
              <div className='form-group'>
                <label htmlFor='nroDocumento'>{sales.lbl.nro}</label>
                <input
                  type='text'
                  className={`form-control form-control-border ${ !validation.nroDocumento && 'is-invalid' }`}
                  name='nroDocumento'
                  placeholder={sales.plhld.nroDocumento}
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
            <div className='col-sm-6'></div>
            <div className='col-sm-6'></div>
            <div className='col-sm-3'>
              <div className='form-group'>
                <label htmlFor='neto'>{sales.lbl.neto}</label>
                <input
                  type='number'
                  className={`form-control form-control-border ${!validation.neto && 'is-invalid' }`}
                  name='neto'
                  placeholder={sales.plhld.neto}
                  onChange={handleChange}
                  value={form.neto}
                  required
                  onBlur={ e => { validacion({ nombre: 'neto', valor: e.target.value }) }}
                />
                {!validation.neto && (<span className='text-danger'>{sales.txt.valNeto}</span>)}
              </div>
            </div>
            <div className='col-sm-3'>
              <div className='form-group'>
                <label htmlFor='iva'>{sales.lbl.iva}</label>
                <input
                  type='number'
                  className={`form-control form-control-border ${!validation.iva && 'is-invalid'}`}
                  name='iva'
                  placeholder={sales.plhld.iva}
                  onChange={handleChange}
                  value={form.iva}
                  required
                  onBlur={e => { validacion({ nombre: 'iva', valor: e.target.value }) }}
                />
                {!validation.iva && (
                  <span className='text-danger'>{sales.txt.valIva}</span>
                )}
              </div>
            </div>
            <div className='col-sm-3'>
              <div className='form-group'>
                <label htmlFor='exento'>{sales.lbl.exento}</label>
                <input
                  type='number'
                  className={`form-control form-control-border ${ !validation.exento && 'is-invalid' }`}
                  name='exento'
                  placeholder={sales.plhld.exento}
                  onChange={handleChange}
                  value={form.exento}
                  required
                  onBlur={e => { validacion({ nombre: 'exento', valor: e.target.value }) }}
                />
                {!validation.exento && ( <span className='text-danger'>{sales.txt.valExento}</span>
                )}
              </div>
            </div>
            <div className='col-sm-3'>
              <div className='form-group'>
                <label htmlFor='total'>{sales.lbl.total}</label>
                <input
                  type='number'
                  className={`form-control form-control-border ${ !validation.total && 'is-invalid'}`}
                  name='total'
                  placeholder={sales.plhld.total}
                  onChange={handleChange}
                  value={form.total}
                  required
                  onBlur={e => { validacion({ nombre: 'total', valor: e.target.value })
                  }}
                />
                {!validation.total && (<span className='text-danger'>{sales.txt.valTotal}</span>)}
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
          </div>
        </Card>

        <Card style='card-default' haveTitle={true} title={sales.title.detalle} >
          {/* <DetalleForm   /> */}

          <div className='row'>
            <div className='form-group'>
              <label htmlFor='detalleVentaId'>{detailSale.lbl.id}</label>
              <input
                type='number'
                name='detalleVentaId'
                className={`form-control form-control-border ${ !validation.detalleVentaId && 'is-invalid' }`}
                value={form.detalleVentaId}
                placeholder='2'
                onChange={handleChange}
                onBlur={e => { validacion( { nombre: 'cantidad', valor: e.target.value }) }}
                required
                min={0}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='cantidad'>{detailSale.lbl.cantidad}</label>
              <input
                type='number'
                name='cantidad'
                className={`form-control form-control-border ${ !validation.cantidad && 'is-invalid' }`}
                value={form.cantidad}
                placeholder='1'
                onChange={handleChange}
                onBlur={e => { validacion( { nombre: 'cantidad', valor: e.target.value }) }}
                required
                min={0}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='prodNeto'>{detailSale.lbl.neto}</label>
              <input
                type='number'
                name='prodNeto'
                className={`form-control form-control-border ${ !validation.prodNeto && 'is-invalid' }`}
                value={form.prodNeto}
                placeholder='2'
                onChange={handleChange}
                onBlur={e => { validacion( { nombre: 'prodNeto', valor: e.target.value }) }}
                required
                min={0}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='iva'>{detailSale.lbl.iva}</label>
              <input
                type='number'
                name='iva'
                className={`form-control form-control-border ${ !validation.iva && 'is-invalid' }`}
                value={form.iva}
                placeholder='0'
                onChange={handleChange}
                onBlur={e => { validacion( { nombre: 'iva', valor: e.target.value }) }}
                required
                min={0}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='prodTotal'>{detailSale.lbl.total}</label>
              <input
                type='number'
                name='prodTotal'
                className={`form-control form-control-border ${ !validation.prodTotal && 'is-invalid' }`}
                value={form.prodTotal}
                placeholder='2'
                onChange={handleChange}
                onBlur={e => { validacion( { nombre: 'prodTotal', valor: e.target.value }) }}
                required
                min={0}
              />  
            </div>
            <div className='form-group'>
              <label htmlFor='prodTotalDcto'>{detailSale.lbl.totalDcto}</label>
              <input
                type='number'
                name='prodTotalDcto'
                className={`form-control form-control-border ${ !validation.prodTotalDcto && 'is-invalid' }`}
                value={form.prodTotalDcto}
                placeholder='2'
                onChange={handleChange}
                onBlur={e => { validacion( { nombre: 'prodTotalDcto', valor: e.target.value }) }}
                required
                min={0}
              />
            </div>
            <div className='form-group'>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='prodEsExento' 
									id='prodEsExento' 
									onChange={handleChange} 
									defaultChecked={form.prodEsExento}
                />
                <label htmlFor='prodEsExento'>{detailSale.lbl.esExento}</label>
              </div>
              
              
            </div>
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
        </Card>

        <Card style='card-default' haveTitle={true} title={sales.title.ventaPago} >
          <div className='row'>

          </div>
        </Card>
        <div className='col-12 mt-5'>
          <input
            type='submit'
            className='btn btn-outline-success btn-block'
            value={formNewVenta ? sales.btn.new : sales.btn.edit }
          />
          <Link
            to='/ventas'
            className='btn btn-outline-danger btn-block'
          >
            {universal.btn.volver}
          </Link>
        </div>
      </form>
    </Fragment>
  );
}
