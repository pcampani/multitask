import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';


import Router from './components/Router';

const App = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

export default App;
