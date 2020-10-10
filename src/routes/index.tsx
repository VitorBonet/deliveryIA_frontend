import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Import} />
    <Route path="/Dashboard" component={Dashboard} />
  </Switch>
);

export default Routes;
