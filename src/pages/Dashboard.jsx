/**
 * * Página de Dashboard
 * ? ruta: /dashboard
 */
import React, { useState, useEffect, Fragment } from 'react';
//* Texto
import { universal } from '../utils/texts/general'
//* Custom Components
import Layout from '@layouts/Main';
import Card from '@common/Card';

const Dashboard = () => {
  const link = [{ nombre: 'Dashboard', url: '/dashboard'}];

  return (
    <Layout breadKey='dashboard' title='Dashboard' links={link}>
      <Card>
        {universal.txt.reminderCompany}
      </Card>
    </Layout>
  );
}

export default Dashboard;
