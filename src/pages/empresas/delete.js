import React,{ useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteEmpresaAction } from '@redux/empresasDuck';
import Layout from '@layouts/Main';

export default function DeleteCompany() {
	const params = useParams();
	const dispatch = useDispatch(); //Disparador
	const navigate = useNavigate(); // Navegador de Pagina

	useEffect(() => {
			delEmpresa()
		}, [1]);


	const delEmpresa= async() => {
		try {
			// console.log('Entro eliminar');
			const { rut } = params;
			dispatch(deleteEmpresaAction({ rut:rut }));

			// console.log('Despues de eliminar ...');
			navigate('/admin/empresas');
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Layout>
      <div className="section">
        <p className="subtitle is-4">
          Lo sentimos, hubo un error. <br />
          Porfavor intentalo de nuevo
        </p>

        <Link to="/empresas" className="btn btn-outline-info">
          Volver
        </Link>
      </div>
    </Layout>
	);
}