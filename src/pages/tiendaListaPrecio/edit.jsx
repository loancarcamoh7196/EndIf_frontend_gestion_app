import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
import { role, universal } from '../../utils/texts/modAdmin';
import endPoints from '@services/api';

import Layout from '@layouts/Main';
import Form from '@components/lista/Form';

// Redux
// import { getUsuarioAction } from '@redux/listaDuck'
const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Roles', url: '/admin/lista' },
	{ nombre:'Editar', url: '' }
];
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
  const params = useParams();
	const { id } = params; // Extraes ID de URL
	const { data: lista, error } = useSWR( id ? (endPoints.lista.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!lista) return <p className="column is-medium is-active">Cargando...</p>;

  let listaForm = {
		id: lista.id,
		nombre: lista.nombre,
		accesoGestion: lista.accesoGestion,
		accesoPv: lista.accesoPv,
		accesoContabilidad: lista.accesoContabilidad,
		accesoInventario: lista.accesoInventario,
		accesoInventarioMovil: lista.accesoInventarioMovil
  };

  return (
    <Layout title={role.title.edit} links={link} haveLink={true}>
			<Form listaForm={listaForm} formNewRol={false} />
		</Layout>
  )
}

export default Edit;
