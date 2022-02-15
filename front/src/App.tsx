import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProviver from './context';

import Routes from './routes/Index';



const App: React.FC = () => (
  <Router>    
    <AppProviver>
      <Routes />
    </AppProviver>

    <GlobalStyle />
  </Router>
  
);

export default App;
