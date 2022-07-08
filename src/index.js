import React from 'react';
// import ReactDOM from 'react-dom/client';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import generateStore from '@redux/store';
import App from '@routes/App';
// import reportWebVitals from './reportWebVitals';
import { AuthProvider } from '@context/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);
// const root = hydrateRoot(container, <App tab='home' />);
//Crear store
const store = generateStore();

root.render(
  <Provider store={store}>
    <AuthProvider  >
      <App />
    </AuthProvider>
  </Provider>
);

if (module.hot) {
  module.hot.accept();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
