import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';

import Routes from './routes';

import GlobalStyle from './styles/global';

moment.locale('pt-BR');

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
  </>
);

export default App;
