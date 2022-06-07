/**
 * Formulario agregar
 */
import React, { Fragment } from 'react';

import Form from '@components/FormEmpresa';
import { Outlet } from 'react-router-dom';

const titlePage = 'Agregar Empresa';

export default function NewEmpresa() {
  const empresaForm = {
    rut: '',
		razonSocial: '',
		giro: '',
		fono: '',
		email: '',
		logo: '',
		activa: true,
		moduloGestion: false,
		moduloContabilidad: false,
		moduloInventario: false,
		moduloInventarioMovil: false,
		direccionId: 0,
		// 'direccion': {
		// 	'id': '1',
		// 	'calle': 'Agustinas 681, of 1703',
		// 	'ciudad': 'Santiago',
		// 	'comunaId': 309
		// }
  };

  return (
    <Fragment>
      <Form empresaForm={empresaForm} />
    </Fragment>
    
  );
}


