import React, { useState, createContext } from 'react';


export const themes = {
  login: 'dark-mode login-page',
  main: 'layout-fixed sidebar-mini-xs control-sidebar-slide-open layout-navbar-fixed sidebar-closed  sidebar-collapse',
};

export const AppContext = createContext({
  empresaRut: '',
  theme: themes.main
});

export function AppProvider(props) {
  const { children } = props;
  
  const [theme, setTheme]= useState('');


  return (
    <AppContext.Provider 
      value={{
        theme,
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
