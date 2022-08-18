/**
 * * Formulario de Producto
 * ? Para agregar y editar
 */
import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//* Textos
import { product, unity, subfamilia } from '@utils/texts/modGestion';
import { toastOptions, universal } from '@utils/texts/general'
//* Componentes propios
import Card from '@common/Card';
//* Redux ~ Duck necesarios
import { addProductoAction, updateProductoAction } from '@redux/productosDuck';
import { getUnidadesAction } from '@redux/unidadesDuck';
import { getFamiliaDetalleAction } from '@redux/familiaDetalleDuck';

export default function FormProduct({ formNewProducto = true, productoForm }) {
	const params = useParams(); //? Acceso a params de la URL
	const dispatch = useDispatch(); //? Disparador
	const navigate = useNavigate(); //? Navegador de Pagina

  const unidadesList = useSelector((store) => store.unidades.list); //? Valores para Select de Unidades
  const familiaDetalle = useSelector((store) => store.familiaDetalle.list); //? Valores para Select de Familia Detalle

  const [validation, setValidation] = useState({
		nombre: true,
    codigo: true
	});

	const validacion = (campo) => {
		const _names = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/gm;
		// console.log(campo)

		if (campo.nombre === 'nombre') {
			(campo.valor.length >=4 && campo.valor.length <=30 && _names.test(campo.valor)) ? setValidation({...validation, nombre: true}) : setValidation({...validation, nombre: false});
		} if (campo.nombre === 'codigo') {
			(campo.valor.length >=3 && campo.valor.length <=20 && _names.test(campo.valor)) ? setValidation({...validation, codigo: true}) : setValidation({...validation, codigo: false});
		}  else  return false;
	}

	//* Almacenamiento de Datos formulario
	const [form, setForm] = useState({
    id: productoForm.id,
		nombre: productoForm.nombre,
		codigoInterno: productoForm.codigoInterno,
		activo: productoForm.activo,
    exento: productoForm.exento,
		esInventario: productoForm.esInventario,  
		comanda: productoForm.comanda,
    esIngrediente: productoForm.esIngrediente,
    tieneEnvase: productoForm.tieneEnvase,
    empresaRut: productoForm.empresaRut,
    unidadId: productoForm.unidadId,
    subFamiliaId: productoForm.subFamiliaId,
	});
	
	/**
	 * * Manejador de Actualizar P
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => { 
    delete form.id;
		const { id } = params; // Extraer ID de URL
		try {
      const options = { id, body: form };
			dispatch(updateProductoAction(options));
			navigate('/productos');
		} catch (error) {
			console.log(error);
		}
	};

	/** 
	 * * Manejador para Agregar P
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {	
      delete form.id;
      dispatch(addProductoAction({body: form}));
      navigate('/productos');
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
		formNewProducto ? postData(form) : putData(form);
	};

  //? ejecucion de metodo al renderizar pagina
  useEffect(() => {
    dispatch(getFamiliaDetalleAction());
    dispatch(getUnidadesAction());
  }, []);

  console.log(familiaDetalle);

	return (
  <Fragment>
    <form id='formulario' onSubmit={handleSubmit} >
      <Card style='card-default' haveTitle={true} title={product.title.seccionBasica}> 
        <div className='row'>
          <div className='col-sm-7'>
            { (!formNewProducto) && 
              <div className='form-group'>
                <label htmlFor='id'>{product.lbl.id}</label>
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
              <label htmlFor='nombre'>{product.lbl.nombre}</label>
              <input 
                type='text'
                className={`form-control form-control-border ${!validation.nombre && 'is-invalid'}`} 
                name='nombre'
                placeholder={product.plhld.nombre}
                onChange={handleChange}
                value={form.nombre}
                describedby='nombreError'
                maxLength={30} 
                required
                onBlur={(e) => { validacion({nombre: 'nombre', valor: e.target.value}) }}
              />
              {!validation.nombre && <span className='text-danger'>{product.txt.valNombre}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='codigoInterno'>{product.lbl.codigo}</label>
              <input 
                type='text'
                className={`form-control form-control-border ${!validation.nombre && 'is-invalid'}`} 
                name='codigoInterno'
                placeholder={product.plhld.codigo}
                onChange={handleChange}
                defaultValue={form.codigoInterno}
                maxLength={30} 
                required
                onBlur={(e) => { validacion({ nombre: 'codigo', valor: e.target.value }) }}
              />
              {!validation.codigo && <span className='text-danger'>{product.txt.valCodigo}</span>}
            </div>
          </div>
          <div className='col-sm-5'>
            <div className='form-group'>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='activo' 
									id='activo' 
									onChange={handleChange} 
									defaultChecked={form.activo}
                />
                <label htmlFor='activo'>{product.lbl.activo}</label>
              </div>
            </div>
            <div className='form-group'>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='exento' 
									id='exento' 
									onChange={handleChange} 
									defaultChecked={form.exento}
                />
                <label htmlFor='exento'>{product.lbl.exento}</label>
              </div>
            </div>
            <div className='form-group'>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='esInventario' 
									id='esInventario' 
									onChange={handleChange} 
									defaultChecked={form.esInventario}
                />
                <label htmlFor='esInventario'>{product.lbl.esInventario}</label>
              </div>
            </div>
            <div className='form-group'>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='comanda' 
									id='comanda' 
									onChange={handleChange} 
									defaultChecked={form.comanda}
                />
                <label htmlFor='comanda'>{product.lbl.comanda}</label>
              </div>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='esIngrediente' 
									id='esIngrediente' 
									onChange={handleChange} 
									defaultChecked={form.esIngrediente}
                />
                <label htmlFor='esIngrediente'>{product.lbl.esIngrediente}</label>
              </div>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='tieneEnvase' 
									id='tieneEnvase' 
									onChange={handleChange} 
									defaultChecked={form.tieneEnvase}
                />
                <label htmlFor='tieneEnvase'>{product.lbl.tieneEnvase}</label>
              </div>
            </div>  
          </div> 
        </div>
      </Card>

      <Card style='card-default' haveTitle={true} title={product.title.seccionRelacion}>
        <div className='row'>
          <div className='col-6'>
            <div className='form-group'>
              <label htmlFor='unidadId'>{product.lbl.unidadId}</label>
              <select
                name='unidadId' 
                className='form-control select2 custom-select'
                onChange={handleChange}
              >
                <option
                  disabled
                  selected={ (!formNewProducto) && 'selected' }
                >
                  {product.slct.unidad}
                </option>
                { (unidadesList.length > 0) && 
                    unidadesList.map((i) => <option value={i.id} selected={(i.id === form.unidadId ) && 'selected'}> {i.nombre} - {i.plural} </option>) 
                }
              </select>
            </div>
          </div>

          <div className='col-6'>
            <div className='form-group'>
              <label htmlFor='subFamiliaId'>{product.lbl.subfamilia}</label>
              <select
                name='subFamiliaId' 
                className='form-control select2 custom-select'
                onChange={handleChange}
              >
                <option
                  disabled
                  selected={ (!formNewProducto) && 'selected' }
                >
                  {product.slct.subfamilia}
                </option>
                { (familiaDetalle.length > 0) &&
                  familiaDetalle.map((i) => <option value={parseInt(i.subfamiliaId)} selected={(i.subfamiliaId === form.subFamiliaId ) && 'selected'}>
                  {i.subfamiliaNombre} - Familia padre {i.familiaNombre} 
                  </option>) 
                }
              </select>
            </div>
          </div>
        </div>
      </Card>

      <div className='col-12 mt-5'>
        <input
          type='submit'
          className='btn btn-outline-success btn-block'
          value={formNewProducto ? product.btn.agregar : product.btn.editar}
        />
        <Link
          to='/productos'
          className='btn btn-outline-danger btn-block' 
        >
          {universal.btn.volver}
        </Link>
      </div>

    </form>
  </Fragment>
	);
}
