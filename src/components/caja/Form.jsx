/**
 * * Formulario de Cajas
 * ? Para agregar y editar
 */
import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cashRegister } from '@utils/texts/modGestion';
import { universal, toastOptions } from '@utils/texts/general';
//* Componentes propios
import Card from '@common/Card';
//* Redux ~ Duck necesarios
import { addCajaAction, updateCajaAction} from '@redux/cajasDuck';
import { getTiendasAction } from '@redux/tiendasDuck';


export default function FormCaja({ formNewCaja = true, cajaForm }) {
	const params = useParams(); //? Acceso a params de la URL
	const dispatch = useDispatch(); //? Disparador
	const navigate = useNavigate(); //? Navegador de Pagina

  const tiendas = useSelector((store)=> store.tiendas.list); //? Valores para Select de Tiendas

  //? Ejecucion de metodo al renderizar pagina
  useEffect(() => { dispatch(getTiendasAction()) }, []);

  const [validation, setValidation] = useState({
		nombre: true,
    numero: true,
    puerto: true,
    serv: true,
    serv2: true,
    cnx: true,
    esFabrica: true,
    activa: true,
    sincroniza: true,
	});

	const validacion = (campo) => {
		const _names = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/gm;
		// console.log(campo)

		if (campo.nombre === 'nombre') {
			(campo.valor.length >=4 && campo.valor.length <=30 && _names.test(campo.valor)) ? setValidation({...validation, nombre: true}) : setValidation({...validation, nombre: false});
		} else  return false;
	}

	// Almacenamiento de Datos formulario
	const [form, setForm] = useState({
    id: cajaForm.id,
		nombre: cajaForm.nombre,
		numero: cajaForm.numero,
		puerto: cajaForm.puerto,
    serv: cajaForm.serv,
		serv2: cajaForm.serv2,  
		cnx: cajaForm.cnx,
    esFabrica: cajaForm.esFabrica,
    activa: cajaForm.activa,
    sincroniza: cajaForm.sincroniza,
    tiendaId: cajaForm.tiendaId
	});
	
	/**
	 * * Manejador de Actualizar Caja
	 * @param {element} form campos formulario
	 */
	const putData = async (form) => { 
		// console.log('Entro en Editar');
    delete form.id;
		const { id } = params; // Extraer ID de URL
		try {
			// console.log('Entro update');

			const options = { id, body: form };
			dispatch(updateCajaAction(options));
			navigate('/cajas');
		} catch (error) {
			console.log(error);
			// setMessage('Falló la edición');
		}
		// console.log('Soy update');
	};

	/** 
	 * * Manejador para Agregar Caja
	 * @param {element} form Formulario
	 */
	const postData = async (form) => {
    try {	
      delete form.id;
      dispatch(addCajaAction({body: form}));
      navigate('/cajas');
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
		formNewCaja ? postData(form) : putData(form);
	};

	return (
    <Fragment>
    <form id='formulario' onSubmit={handleSubmit} >
      <Card style='card-default' haveTitle={false} title='prueba'> 
        <div className='row'>
          <div className='col-sm-7'>
            { (!formNewCaja) && 
              <div className='form-group'>
                <label htmlFor='id'>{cashRegister.lbl.id}</label>
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
              <label htmlFor='nombre'>{cashRegister.lbl.nombre}</label>
              <input 
                type='text'
                className={`form-control form-control-border ${!validation.nombre && 'is-invalid'}`} 
                id='nombre'
                name='nombre'
                placeholder={cashRegister.plhld.nombre}
                onChange={handleChange}
                value={form.nombre}
                describedby='nombreError'
                maxLength={30} 
                required
                onBlur={(e) => { validacion({nombre: 'nombre', valor: e.target.value}) }}
              />
              {!validation.nombre && <span className='text-danger'>{cashRegister.txt.valNombre}</span>}
            </div>

            <div className='row'>
              <div className='col-6'>
                <div className='form-group'>
                  <label htmlFor='numero'>{cashRegister.lbl.numero}</label>
                  <input 
                    type='number'
                    className={`form-control form-control-border ${!validation.numero && 'is-invalid'}`} 
                    id='numero'
                    name='numero'
                    placeholder={cashRegister.plhld.numero}
                    onChange={handleChange}
                    value={form.numero}
                    describedby='numeroError'
                    step={1}
                    min={0}
                    required
                    onBlur={(e) => { validacion({nombre: 'numero', valor: e.target.value}) }}
                  />
                  {!validation.nombre && <span className='text-danger'>{cashRegister.txt.valNumero}</span>}
                </div>
              </div>

              <div className='col-6'>
                <div className='form-group'>
                  <label htmlFor='puerto'>{cashRegister.lbl.puerto}</label>
                  <input 
                    type='number'
                    className={`form-control form-control-border ${!validation.puerto && 'is-invalid'}`} 
                    id='puerto'
                    name='puerto'
                    placeholder={cashRegister.plhld.puerto}
                    onChange={handleChange}
                    value={form.puerto}
                    describedby='puertoError'
                    step={1}
                    min={0}
                    required
                    onBlur={(e) => { validacion({nombre: 'puerto', valor: e.target.value}) }}
                  />
                  {!validation.puerto && <span className='text-danger'>{cashRegister.txt.valPuerto}</span>}
                </div>
              </div>
            </div>
            
            <div className='row'>
              <div className='col-6'>
                <div className='form-group'>
                  <label htmlFor='serv'>{cashRegister.lbl.serv}</label>
                  <input 
                    type='text'
                    className={`form-control form-control-border ${!validation.serv && 'is-invalid'}`} 
                    id='serv'
                    name='serv'
                    placeholder={cashRegister.plhld.serv}
                    onChange={handleChange}
                    value={form.serv}
                    describedby='servError'
                    min={0}
                    required
                    onBlur={(e) => { validacion({nombre: 'serv', valor: e.target.value}) }}
                  />
                  {!validation.nombre && <span className='text-danger'>{cashRegister.txt.valServ}</span>}
                </div>
              </div>

              <div className='col-6'>
                <div className='form-group'>
                  <label htmlFor='serv2'>{cashRegister.lbl.serv2}</label>
                  <input 
                    type='text'
                    className={`form-control form-control-border ${!validation.serv2 && 'is-invalid'}`} 
                    id='serv2'
                    name='serv2'
                    placeholder={cashRegister.plhld.serv2}
                    onChange={handleChange}
                    value={form.serv2}
                    describedby='serv2Error'
                    maxLength={30} 
                    required
                    onBlur={(e) => { validacion({nombre: 'serv2', valor: e.target.value}) }}
                  />
                  {!validation.serv2 && <span className='text-danger'>{cashRegister.txt.valServ2}</span>}
                </div>
              </div>
            </div>
                        
            <div className='form-group'>
              <label htmlFor='cnx'>{cashRegister.lbl.cnx}</label>
              <input 
                type='text'
                className={`form-control form-control-border ${!validation.cnx && 'is-invalid'}`} 
                id='cnx'
                name='cnx'
                placeholder={cashRegister.plhld.cnx}
                onChange={handleChange}
                value={form.cnx}
                describedby='cnxError'
                maxLength={30} 
                required
                onBlur={(e) => { validacion({nombre: 'cnx', valor: e.target.value}) }}
              />
              {!validation.nombre && <span className='text-danger'>{cashRegister.txt.valCnx}</span>}
            </div>
          </div>
          <div className='col-sm-5'>
            <div className='form-group'>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='esFabrica' 
									id='esFabrica' 
									onChange={handleChange} 
									defaultChecked={form.esFabrica}
                />
                <label htmlFor='esFabrica'>{cashRegister.lbl.esFabrica}</label>
              </div>
            </div>
            <div className='form-group'>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='activa' 
									id='activa' 
									onChange={handleChange} 
									defaultChecked={form.activa}
                />
                <label htmlFor='activa'>{cashRegister.lbl.activa}</label>
              </div>
            </div>
            <div className='form-group'>
              <div className='icheck-pumpkin'>
                <input 
                  type='checkbox'
                  name='sincroniza' 
									id='sincroniza' 
									onChange={handleChange} 
									defaultChecked={form.sincroniza}
                />
                <label htmlFor='sincroniza'>{cashRegister.lbl.sincroniza}</label>
              </div>
            </div>
            <div className='form-group'>
              <label>{cashRegister.lbl.tienda}</label>
              <select
                id='tiendaId'
                name='tiendaId'
                className='form-control select2'
                onChange={handleChange} 
                required
              >
                <option disabled selected={formNewCaja && 'selected'}>{cashRegister.slct.tienda}</option>
                {(tiendas.length > 0 )&& tiendas.map((i)=> <option value={i.id} selected={i.id === form.tiendaId && 'selected'} >{i.nombre}</option>)}
              </select> 
            </div> 
          </div> 
          <div className='col-12 mt-5'>
            <input
              type='submit'
              className='btn btn-outline-success btn-block'
              value={formNewCaja ? cashRegister.btn.agregar : cashRegister.btn.editar}
            />
            <Link to='/cajas' className='btn btn-outline-danger btn-block' >{universal.btn.volver}</Link>
          </div>
        </div>
      </Card>
    </form>
    </Fragment>
	);
}
