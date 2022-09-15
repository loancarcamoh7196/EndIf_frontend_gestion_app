/**
 * * Componentes Search
 */
import React, { Fragment, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//* Texto
import { product } from '@utils/texts/modGestion';
//* Redux
import { searchProductoAction } from '@redux/productosDuck';
import { productoListAddAction } from '@redux/ventasDuck';
//* Componentes Propio
import Loader from '@common/Loader';

const Search = ( ) => {
  const dispatch = useDispatch();
  const searchProducto = useRef('');
  const productSearch = useSelector((store)=> store.productos.list);
  const loading = useSelector((store)=> store.productos.loading);

  const [isRadio, setIsRadio] = useState(5);

  const handleChange = (e) => {
    // string passed in
    // a string returned by default
    // console.log(e.currentTarget.value);
    // add + to the event to make the value a number
    setIsRadio(+e.currentTarget.value);
  };
  

	const handleSubmit = (e) => {
    e.preventDefault();
		const { value } = searchProducto.current;
    // console.log(value);
    if(isRadio == 1) {
      dispatch(searchProductoAction({ nombre: value }));
    }else dispatch(searchProductoAction({ codigoInterno: value }));
    
	};

  return (
    <Fragment>
      <div className=''>
        <form onSubmit={handleSubmit} >
          <div className='input-group'>
            <input
              type='search'
              className='form-control form-control-md'
              placeholder='Escriba nombre o codigo del producto' 
              ref={searchProducto}
            />
            <div className='input-group-append'>
              <button type='submit' className='btn btn-md btn-default'>
                <i className='fa fa-search' />
              </button>
            </div>
          </div>
          <div className='form-group'>
            <div className='form-check'>
              <input className='form-check-input'
                type='radio' 
                name='opcion'
                id='opcion'
                value='1'
                onChange={handleChange}
                checked={isRadio === 1}
              />
              <label className='form-check-label' for='nombre'>
                {product.lbl.nombre}
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='opcion'
                id='opcion'
                value='2'
                onChange={handleChange}
                checked={isRadio === 2}
              />
              <label className='form-check-label' for='codigo'>
                {product.lbl.codigo}
              </label>
            </div>
          </div>
        </form>
      </div>

    {
      loading ? 
        <Loader  /> 
      : (productSearch.length > 0) && 
          <table id='tab_prodSearch' className='table table-bordered table-hover table-sm'>
            <thead>
              <th>{product.lbl.codigo}</th>
              <th>{product.lbl.nombre}</th>
              <th>Acciones</th>
            </thead>
            <tbody>
              {(productSearch.length > 0) && 
                productSearch.map((i) =>(
                  <tr>
                    <td>{i.codigoInterno}</td>
                    <td>{i.nombre}</td>
                    <td>
                      <button
                        className='btn btn-success btn-sm m-1'
                        onClick={()=>{
                          dispatch(productoListAddAction({producto: i}))
                        }}
                      >
                        <i className='fas fa-plus' />
                      </button>
                    </td>
                  </tr>
                ))
              } 
            </tbody>
          </table>
    }
    </Fragment>
  );
}

export default Search