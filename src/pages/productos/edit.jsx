/**
 * * Página: /productos
 */
import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
import { product, universal } from '@utils/textModGestion';
import endPoints from '@services/api';

import Layout from '@layouts/Main';
import Form from '@components/roles/Form';

const link = [
  { nombre: 'Home', url: '/dashboard' },
  { nombre:'Productos', url: '/productos' },
	{ nombre:'Editar', url: '' }
];
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
  const params = useParams();
	const { id } = params; // Extraes ID de URL
	const { data: roles, error } = useSWR( id ? (endPoints.productos.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!roles) return <p className="column is-medium is-active">Cargando...</p>;

  let productForm = {
		id: roles.id,	
		nombre: roles.nombre,
		accesoGestion: roles.accesoGestion,
		accesoPv: roles.accesoPv,
		accesoContabilidad: roles.accesoContabilidad,
		accesoInventario: roles.accesoInventario,
		accesoInventarioMovil: roles.accesoInventarioMovil
  };

  return (
    <Layout title={product.title.edit} links={link} haveLink={true}>
			<Form product={productForm} formNewProduct={false} />
		</Layout>
  )
}

export default Edit;
