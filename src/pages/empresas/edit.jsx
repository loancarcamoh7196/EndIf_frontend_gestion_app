import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
import { company } from '../../utils/textModAdmin'
import endPoints from '@services/api';

import Layout from '@layouts/Main';
import Form from '@components/EmpresaForm';

// Redux
// import { getEmpresaAction } from '@redux/empresasDuck'

const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Empresas', url: '/admin/empresas' },
	{ nombre:'Editar', url: '' }
];
const fetcher = (url) => axios.get(url).then((res) => res.data);

const Edit = () => {
  // const dispatch = useDispatch();
  const params = useParams();
	const { rut } = params; // Extraes ID de URL
	// const [comuna, setComuna] = useState([]);
  
	const { data: empresa, error } = useSWR( rut ? (endPoints.empresas.get(rut)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!empresa) return <p className="column is-medium is-active">Cargando...</p>;

	let { direccion } = empresa;
	// console.log('company', empresa);
  // let empresa = {body} = company;

  let empresaForm = {
    rut: empresa.rut,
		razonSocial: empresa.razonSocial,
		giro: empresa.giro,
		fono: empresa.fono,
		email: empresa.email,
		logo: empresa.logo,
		activa: empresa.activa,
		moduloGestion: empresa.moduloGestion,
		moduloContabilidad: empresa.moduloGestion,
		moduloInventario: empresa.moduloInventario,
		moduloInventarioMovil: empresa.moduloInventarioMovil,
		direccionId: empresa.direccionId,
    regionId: 0,
		calle: direccion.calle,
		ciudad: direccion.ciudad,
		comunaId: direccion.comunaId
  };

  return (
    <Layout title={company.title.edit} links={link} haveLink={true}>
			<Form empresaForm={empresaForm} formNewEmpresa={false} />
		</Layout>
  )
}

export default Edit;
