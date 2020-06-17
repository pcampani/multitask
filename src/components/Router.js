import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './pages/Login';
import RegistrationForm from './pages/Registration';
import Success from './pages/Success';

export default function Router() {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={RegistrationForm} />
      <Route path='/success' component={Success} />
    </Switch>
  )
}
