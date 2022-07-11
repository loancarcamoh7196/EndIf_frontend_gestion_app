import React, { useEffect, useState } from 'react';
import { useParams  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import axios from 'axios';
import { user } from '../../utils/textModAdmin';
import endPoints from '@services/api';

import Layout from '@layouts/Main';
import Form from '@components/UsuarioForm';

// Redux
// import { getUsuarioAction } from '@redux/usuariosDuck'
const link = [
  { nombre: 'Administración', url: '/admin' },
  { nombre:'Usuarios', url: '/admin/usuarios' },
	{ nombre:'Editar', url: '' }
];
const fetcher = (url) =>  axios.get(url).then((res) => res.data);

const Edit = () => {
  const dispatch = useDispatch();
  const params = useParams();
	const { id } = params; // Extraes ID de URL
	// const [comuna, setComuna] = useState([]);
	const { data: usuario, error } = useSWR( id ? (endPoints.usuarios.get(id)) : null, fetcher );
	if (error) return <p className="container is-medium">Falló en la carga...</p>;
	if (!usuario) return <p className="column is-medium is-active">Cargando...</p>;


	// console.log('usuario', usuario);
  // let usuario = {body} = company;
	
  let usuarioForm = {
		username: usuario.username,
		pass: usuario.pass,
		pass2: usuario.pass2,
		nombres: usuario.nombres,
		apellidos: usuario.apellidos,
		email: usuario.email,
		activo: usuario.activo,
		porcentajeDcto: usuario.porcentajeDcto,
		empresaRut: usuario.empresaRut,
		rolesId: usuario.rolesId,
		activo: usuario.activo,
  };

  return (
    <Layout title={user.title.editar} links={link} haveLink={true}>
			<Form usuarioForm={usuarioForm} formNewUsuario={false} />
		</Layout>
  )
}

export default Edit;
