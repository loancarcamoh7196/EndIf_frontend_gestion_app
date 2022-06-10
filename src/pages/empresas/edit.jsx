import React, { useEffect } from 'react';
import { useParams  } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';

import Layout from '@layouts/Main';
import Form from '@components/FormEmpresa';

// Redux
import { getEmpresaAction } from '@redux/empresasDuck'

const txt = {
  titlePage: 'Editar '
};



const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Empresas', url: '/admin/empresas' },
	{ nombre:'Editar', url: '' }
];

const Edit = () => {
  const dispatch = useDispatch();
  const params = useParams();
	const { rut } = params; // Extraes ID de URL
  console.log(rut);
  useEffect(() => { dispatch(getEmpresaAction({rut: rut})) }, []);

  let empresa = useSelector((store) => store.empresas.res);

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
    <Layout title={txt.titlePage} links={link} haveLink={true}>
			<Form empresaForm={empresaForm}  newEmpresaForm={false} />
		</Layout>
  )
}

export default Edit;
