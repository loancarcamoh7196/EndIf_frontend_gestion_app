import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
import { shop, universal } from '../../utils/texts/modGestion';
import endPoints from '@services/api';

import Layout from '@layouts/Main';
import Form from '@components/tienda/Form';

const link = [
  { nombre: 'Home', url: '/dashboard' },
  { nombre:'Tienda', url: '/tiendas' },
	{ nombre:'Editar', url: '' }
];
	const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
  const params = useParams();
	const { id } = params; // Extraes ID de URL
	const { data: tienda, error } = useSWR( id ? (endPoints.tiendas.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!tienda) return <p className="column is-medium is-active">Cargando...</p>;

  let tiendaForm = {
		id: tienda.id,
		nombre: tienda.nombre,
		empresaRut: tienda.empresaRut,
		direccion: tienda.direccionId,
		calle: tienda.direccion.calle,
		ciudad: tienda.direccion.ciudad,
		comunaId: tienda.direccion.comunaId
  };

  return (
    <Layout title={shop.title.edit} links={link} haveLink={true}>
			<Form tiendaForm={tiendaForm} formNewTienda={false} />
		</Layout>
  )
}

export default Edit;
