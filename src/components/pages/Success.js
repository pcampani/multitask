import React from 'react';
import styled from 'styled-components';
import { NoStackConsumer } from '@nostack/no-stack';

import LoginForm from '../LoginForm';
import Items from '../List/Items';
import Header from '../Header';

const Wrapper = styled.div`
  width: 415px;
  margin: 0 auto;
`;

const Success = () => (
  <Header>
    <Wrapper>
      <h1>Success</h1>
    </Wrapper>
  </Header>
);

export default Success;