import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
import { family, universal } from '../../utils/texts/modGestion';
import endPoints from '@services/api';

import Layout from '@layouts/Main';
import Form from '@components/familia/Form';

// Redux
// import { getUsuarioAction } from '@redux/rolesDuck'
const link = [
  { nombre: 'Dashboard', url: '/dashboard' },
  { nombre:'Familia', url: '/familias' },
	{ nombre:'Editar', url: '' }
];
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
  const params = useParams();
	const { id } = params; // Extraes ID de URL
	const { data: familia, error } = useSWR( id ? (endPoints.familias.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!familia) return <p className="column is-medium is-active">Cargando...</p>;

  let familyForm = {
		id: familia.id,
		nombre: familia.nombre,
		empresaRut: familia.empresaRut	
  };

  return (
    <Layout title={family.title.edit} links={link} haveLink={true}>
			<Form familyForm={familyForm} formNewFamily={false} />
		</Layout>
  )
}

export default Edit;
