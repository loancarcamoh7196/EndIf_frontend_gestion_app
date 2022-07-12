import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
import { role, universal } from '../../utils/textModAdmin';
import endPoints from '@services/api';

import Layout from '@layouts/Main';
import Form from '@components/RolesForm';

// Redux
// import { getUsuarioAction } from '@redux/rolessDuck'
const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Roles', url: '/admin/roles' },
	{ nombre:'Editar', url: '' }
];
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
  const params = useParams();
	const { id } = params; // Extraes ID de URL
	const { data: roles, error } = useSWR( id ? (endPoints.roles.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!roles) return <p className="column is-medium is-active">Cargando...</p>;

  let rolForm = {
		id: roles.id,
		nombre: roles.nombre,
		accesoGestion: roles.accesoGestion,
		accesoPv: roles.accesoPv,
		accesoContabilidad: roles.accesoContabilidad,
		accesoInventario: roles.accesoInventario,
		accesoInventarioMovil: roles.accesoInventarioMovil
  };

  return (
    <Layout title={role.title.edit} links={link} haveLink={true}>
			<Form rolForm={rolForm} formNewRol={false} />
		</Layout>
  )
}

export default Edit;
