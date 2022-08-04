/**
 * Form de Edición de SubFamilia
 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
import endPoints from '@services/api';

import Form from '@components/subfamilia/Form';

const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
	const id = useSelector(store => store.subfamilias.form);
  // const params = useParams();
	// const { id } = params; // Extraes ID de URL
	const { data: subfamilia, error } = useSWR( id ? (endPoints.subFamilias.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!subfamilia) return <p className="column is-medium is-active">Cargando...</p>;

  let subfamilyForm = {
		id: subfamilia.id,	
		nombre: subfamilia.nombre,
		familiaId: subfamilia.familiaId	
  };

  return (
		<Form subfamilyForm={subfamilyForm} formNewSubFamily={false} />
  )
}

export default Edit;
