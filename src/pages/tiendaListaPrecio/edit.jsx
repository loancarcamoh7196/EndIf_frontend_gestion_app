/**
 * * Componente Editar - Lista Prueba
 * ? url Pagina : /productos/:id/lista_precio
 */
import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
import { role, universal } from '@utils/texts/modGestion';
import endPoints from '@services/api';
//* Componentes
import Layout from '@layouts/Main';
import Form from '@components/listaPrecio/Form';
import Loader from '@common/Loader';
//* Redux
// import { getUsuarioAction } from '@redux/listaDuck'
const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Roles', url: '/admin/lista' },
	{ nombre:'Editar', url: '' }
];
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
  const params = useParams();
	const { id } = params; //? Extraes ID de URL
	const { data: lista, error } = useSWR( id ? (endPoints.lista.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!lista) return ( <Loader />);

  let listaForm = {
		id: lista.id,
		lista: lista.lista,
		empresaRut: lista.empresaRut,
  };

  return ( <Form listaForm={listaForm} formNewRol={false} /> );
}

export default Edit;
