/**
 * Componente 
 */
import React from 'react'

export default function ColTable() {
  return (
    <td>
      <tr>
        <td>
          <input
            type='number'
            name='cantidad'
            className='form-control form-control-border'
            value={form.cantidad}
            placeholder='1'
            onChange={handleChange}
            required
            min={0}
          />
        </td>
        <td>
          <input
            type='number'
            name='prodNeto'
            className='form-control form-control-border'
            value={form.prodNeto}
            placeholder='2'
            onChange={handleChange}
            required
            min={0}
          />
        </td>
        <td>
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
        </td>
        <td>
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
        </td>
        <td>
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
        </td>
        <td>
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
        </td>
        <td>
          <select
            id='productosId'
            name='productosoId'
            className='form-control select2'
            onChange={handleChange} 
            required
          >
            <option disabled selected={formNewVenta && 'selected'}>{detailSale.slct.productos}</option>
            {(productos.length > 0 ) &&
              productos.map(i => <option value={i.id} selected={i.id === form.detalle.productoId && 'selected'} >{i.nombre}</option>)
            }
          </select>
        </td>
      </tr>
    </td>
  )
}
