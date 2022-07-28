/**
 * * Página de Dashboard
 * ? ruta: /dashboard
 */
import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
//* Texto
import { universal } from '../utils/texts/general'
//* Custom Components
import Layout from '@layouts/Main';
import apiURL from '@services/api';
import Card from '../common/Card';


const Dashboard = () => {
  const body = {
    "nombre": "Prueba",
    "codigoInterno": "17",
    "activo": true,
    "exento": false,
    "esInventario": false,
    "comanda": false,
    "esIngrediente": false,
    "tieneEnvase": false,
    "empresaRut": "11111111", 
    "unidadId": 1,
    "subFamilia": 1
  };

  const handleHundred = async (e) => {
    let i = 0;
    const api = apiURL.producto.add();
    alert(api);
    // alert(process.env.REACT_APP_PORT);
    do {
      i++;
      try {
        let res =  await axios.post(api, body);
        // console.log(res);
        
      } catch (error) {
        console.log(error);
      }
      
    }while (i< 100);

    alert('Ha finalizado inserción');
  };

  const handleThousand = async () => {
    let i = 0;
    const api = apiURL.producto.add();
    alert(api);
    do {
      try {
        let res =  await axios.post(api, body);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
      
    }while (i < 1000);

    alert('Ha finalizado inserción');
  };

  const handle100K = async () => {
    let i = 0;
    const api = apiURL.producto.add();
    alert(api);
    do {
      try {
        let res =  await axios.post(api, body);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
      
    }while (i < 100000);

    alert('Ha finalizado inserción');
  };

  const handleMillion = async () => {
    let i = 0;
    const api = apiURL.producto.add();
    alert(api);
    do {
      try {
        let res =  await axios.post(api, body);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    }while (i < 1000000);

    alert('Ha finalizado inserción');
  };

  const link = [{ nombre: 'Dashboard', url: '/dashboard'}];

  return (
    <Layout title='Dashboard' links={link}>
      <Card>
        {universal.txt.reminderCompany}
      </Card>

      <section className='block'>
        <div className='card'>
          <div className='card-body'>
            <button className='btn btn-primary'  onClick={handleHundred} > Probar 100 registros </button> <br />
            <button className='btn btn-primary'  onClick={handleThousand} > Probar 1K registros </button>
            <button className='btn btn-primary'  onClick={handle100K} > Probar 100K registros </button>
            <button className='btn btn-primary'  onClick={handleMillion} > Probar 1M registros </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Dashboard;
