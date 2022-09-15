/**
 ** Archivo Inicial del Proyecto
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import generateStore from '@redux/store';
import App from '@routes/App';
// import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);
// const root = hydrateRoot(container, <App tab='home' />);
//Crear store
const {persistor,store} = generateStore();

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

if (module.hot) module.hot.accept();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
