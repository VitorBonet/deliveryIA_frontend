import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';

import Routes from './routes';
import AppProvider from './hooks';

import GlobalStyle from './styles/global';

moment.locale('pt-BR');

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  </>
);

export default App;
