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
	 * * Manejador de Actualizar Detalle
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
	 * * Manejador para Agregar Detalle
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
    // dispatch(getUsuariosAction()); //* Recupera al cargar datos de usuarios
    // dispatch(getCajasAction()); //* Recupera al cargar datos de cajas
    // dispatch(getFormasPagoAction()); //* Recupera Formas de Pagos
    // dispatch(getDocumentosTipoAction()); //* Recupera Tipo de Documento
    // dispatch(getProductosAction); //* Recupera Productos
    // console.log(form.activo)
  }, []);


	return (
    <Fragment>
      <form onSubmit={handleSubmit} >
        {/* <DetalleForm   /> */}
        <Card style='card-default' haveTitle={true} title={sales.title.detalle} >
					<div className='mb-2'>
						<button
							className='btn btn-success float-right'
							data-bs-toggle='offcanvas'
							data-bs-target='#offcanvasRight'
							aria-controls='offcanvasRight'
						>
							{sales.btn.producto}
						</button>
					</div>

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
