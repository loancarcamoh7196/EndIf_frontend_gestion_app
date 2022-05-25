import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';

import Layout from '@layouts/Main';
import LoginLayout from '@layouts/Login';

import Home from '@pages/Home';
import Dashboard from '@pages/Dashboard';
import Login from '@pages/Login';

const App = () => {
  return (
    // <AppContext.Provider  value={useInitialState}>
    <Router>
      <Routes>
        
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
        
        
          <Route path='/login' element={<Login />}  />
      </Routes>
    </Router>
    // </AppContext.Provider>
  );
};

export default App;