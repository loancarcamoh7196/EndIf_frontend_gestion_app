/**
 * * Formulario de Tienda
 * ? Para agregar y editar
 */
import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import Switch from 'react-switch';
import { universal, shop } from '../../utils/texts/modGestion';

//* Componentes propios
import Card from '@common/Card';

//* Redux ~ Duck necesarios
import { addTiendaAction, updateTiendaAction } from '@redux/tiendasDuck';
import { getEmpresasAction } from '@redux/empresasDuck';
import { getRegionesAction } from '@redux/regionesDuck';
import { getComunasAction } from '@redux/comunasDuck';


export default function FormTienda({ formNewTienda = true, tiendaForm }) {
	const params = useParams(); // Acceso a params de la URL
	const dispatch = useDispatch(); //Disparador
	const navigate = useNavigate(); // Navegador de Pagina

	// Manejo de Checkbox
	const [changeDireccion, setChangeDireccion] = useState(false);

  const empresas = useSelector((store)=> store.empresas.list); //? Valores para Select de Empresas
  const regiones = useSelector((store)=> store.regiones.list); //? Valores para Select de Regiones
	let comunas = useSelector((store)=> store.comunas.list); //? Valores para Select Comunas

  //* Ejecución de metodo al renderizar pagina
  useEffect(() => {
    dispatch(getEmpresasAction())
    dispatch(getRegionesAction());
		if (!formNewTienda) {
			regiones.filter( i=> (i.comunas.map(e => e.id === form.comunaId  &&  dispatch(getComunasAction({regionId: i.id, comunas: i.comunas})))));
		}
  }, []);

  //* Control Validaciones
  const [validation, setValidation] = useState({
		nombre: true,
    calle: true,
    ciudad: true
	});

  //* Método para validar campos 
	const validacion = (campo) => {
		const _names =
      /^(?!.* $)[0-9a-zA-Z-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð \s]+$/gm;
    const _calle = /^[#.0-9a-zA-Z-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\s,-]+$/gm;

		if (campo.nombre === 'nombre') {
			(campo.valor.length >=3 && campo.valor.length <=30 && _names.test(campo.valor)) ? setValidation({...validation, nombre: true}) : setValidation({...validation, nombre: false});
		}else if (campo.nombre === 'calle'){
      (campo.valor.length >=4 && campo.valor.length <=30 && _calle.test(campo.valor)) ? setValidation({...validation, calle: true}) : setValidation({...validation, calle: false});
    } else if (campo.nombre === 'ciudad'){
      (campo.valor.length >=4 && campo.valor.length <=30 && _names.test(campo.valor)) ? setValidation({...validation, ciudad: true}) : setValidation({...validation, ciudad: false});
    } else  return false;
	}

	//* Almacenamiento de Datos formulario
	const [form, setForm] = useState( {
    id: tiendaForm.id,
		nombre: tiendaForm.nombre,
		empresaRut: tiendaForm.empresaRut,
		direccionId: tiendaForm.direccionId,
    calle: tiendaForm.calle,
    ciudad: tiendaForm.ciudad,
    comunaId: tiendaForm.comunaId
	});
	
	/**
	 * * Manejador de Actualizar Tienda
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => { 
    delete form.id;
		const { id } = params; // Extraer ID de URL
		try {
      delete form.id;
      const { nombre, empresaRut, direccionId, regionId, comunaId, calle, ciudad } = form;
      let dir = { comunaId, calle, ciudad };
      let tnd = { nombre, empresaRut };
      const options = { id, tienda: tnd , direccion: dir };
			dispatch(updateTiendaAction(options));
			navigate('/tiendas');
		} catch (error) {
			console.log(error);
		}
	};

	/** 
	 * * Manejador para Agregar Tienda
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {	
      delete form.id;
      const {nombre, empresaRut, direccionId, regionId, comunaId, calle, ciudad } = form;
      let dir = { comunaId, calle, ciudad };
      let tnd = { nombre, empresaRut };
      const options = { tienda: tnd , direccion: dir };
      dispatch(addTiendaAction(options));
      navigate('/tiendas');
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
		formNewTienda ? postData(form) : putData(form);
	};

	return (
  <Fragment>
    <form onSubmit={handleSubmit} >
      {/* Seccion de Tienda */}
      <Card style='card-default' haveTitle={false} title=''> 
        <div className='row'>
          <div className='col-sm-6'>
            { (!formNewTienda) && 
              <div className='form-group'>
                <label htmlFor='id'>{shop.lbl.id}</label>
                <input 
                  type='number'
                  className='form-control form-control-border'
                  name='id'
                  value={form.id}
                  disabled
                />
              </div>  
            }
            <div className='form-group'>
              <label htmlFor='nombre'>{shop.lbl.nombre}</label>
              <input 
                type='text'
                className={`form-control form-control-border ${!validation.nombre && 'is-invalid'}`} 
                id='nombre'
                name='nombre'
                placeholder={shop.plhld.nombre}
                onChange={handleChange}
                value={form.nombre}
                describedby='nombreError'
                maxLength={30} 
                required
                onBlur={(e) => { validacion({nombre: 'nombre', valor: e.target.value}) }}
              />
              {!validation.nombre && <span className='text-danger'>{shop.txt.valNombre}</span>}
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='form-group'>
              <label>{shop.lbl.empresa}</label>
              <select
                name='empresaRut' 
                className='form-control select2'
                onChange={handleChange}
                required
              >
                <option disabled='disabled' selected={formNewTienda && 'selected'} value=''>{shop.slct.empresa} </option>
                {(empresas.length > 0) && empresas.map((i) => <option value={i.rut} selected={i.rut === form.empresaRut && 'selected'}>[{i.rut}] - {i.razonSocial}</option>)}
              </select>  
            </div>  
          </div> 
          <div className='col-sm-12'>
            <div className='form-group'>
            {!formNewTienda && 
              <div className='form-group'>
                <div className='icheck-pumpkin'>
                  <input 
                    type='checkbox'
                    id='changeDireccion'
                    name='changeDireccion' 
                    defaultChecked={changeDireccion}
                    onClick={() => setChangeDireccion(!changeDireccion)} 
                  />
                  <label htmlFor='changeDireccion'>{shop.lbl.changeDireccion}</label>
                </div>
              </div>
            }
            </div>
          </div> 
        </div>
      </Card>

      {/* Seccion de Direccion */}
      {(changeDireccion || formNewTienda) && 
      <Card style='card-default' haveTitle={true} title={shop.title.secDireccion}> 
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label>{shop.lbl.region}</label>
              <select
                name='regionId' 
                className='form-control select2'
                onChange={handleChange}
                onClick={(e) => {
                  // console.log(regiones);
                  const target = e.target; // Dropdown completo
                  const value = target.value; // Valor seleccionado
                  // console.log(value)
                  let reg = regiones.filter( i=> i.id == value);
                  // console.log(reg)
                  let region = reg[0];
                  // console.log(region)
                  let com = region.comunas;
                  let options = { regionId: parseInt(value), comunas: com };
                  dispatch(getComunasAction(options));
                }}
              >
                <option disabled selected={formNewTienda && 'selected'} value=''>{shop.slct.region}</option>
                { (regiones.length > 0) && regiones.map((i) => <option value={i.id} selected={(i.comunas.map(e => e.id === form.comunaId)) && 'selected'}>{i.nombre}</option>) }
              </select>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group' >
            <label htmlFor='comunaId'>{shop.lbl.comuna}</label>
              <select id='comunaId' name='comunaId' className='form-control select2' onChange={handleChange} >
                <option disabled selected={ formNewTienda && 'selected'} value='' >{shop.slct.comuna}</option>
                {(comunas.length > 0 )&& comunas.map((i)=> <option value={i.id} selected={(!formNewTienda && i.id == form.comunaId) && 'selected'} >{i.nombre}</option>)}
              </select>
            </div>
          </div>	

          <div className='col-6'>
            <div className='form-group'>
              <label htmlFor='calle'>{shop.lbl.calle}</label>
              <input
                type='text'
                className={`form-control form-control-border ${!validation.calle && 'is-invalid'}`}
                name='calle'
                placeholder={shop.plhld.calle}
                onChange={handleChange} 
                value={form.calle}
                required
                maxLength={30}
                onBlur={(e) => { validacion({nombre: 'calle', valor: e.target.value}) }}
              />
              {!validation.calle && <span className='text-danger'>{shop.txt.valCalle}</span>}
            </div>
          </div>

          <div className='col-6'>
            <div className='form-group'>
              <label htmlFor='ciudad'>{shop.lbl.ciudad}</label>
              <input
                type='text'
                className={`form-control form-control-border ${!validation.ciudad && 'is-invalid'}`} 
                name='ciudad'
                placeholder={shop.plhld.ciudad}
                onChange={handleChange}
                value={form.ciudad}
                maxLength={30}
                onBlur={(e) => { validacion({nombre: 'ciudad', valor: e.target.value}) }}
              />
              {!validation.ciudad && <span className='text-danger'>{shop.txt.valCiudad}</span>}
            </div>
          </div>
        </div>
      </Card>
      }
      <div className='col-12 mt-5'>
        <input type='submit' className='btn btn-outline-success btn-block' value={formNewTienda ? shop.btn.agregar : shop.btn.editar} />
        <Link to='/tiendas' className='btn btn-outline-danger btn-block' >{universal.btn.volver}</Link>
      </div>
    </form>
  </Fragment>
	);
}
