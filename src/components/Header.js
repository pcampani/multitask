import React from 'react';
import styled from 'styled-components';
import { NoStackConsumer } from '@nostack/no-stack';
import { PLATFORM_ID, TYPE_USER_ID } from '../config';

import logo from '../assets/img/logo-big.png';
import NavBar from './NavBar';

const Container = styled.div`
  display: grid;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const Wrapper = styled.div`
  
  div.header {
    margin: 0 auto;
    height: 100px;
    padding: 12px 52px;
  }
`;

export default function Header(props) {
  let [user, setUser] = React.useState({});

  
  
  return (
    <Container>
      <Wrapper>
        <div className="header">
          <img src={logo} alt="header logo"/>
        </div>
        {props.children}
      </Wrapper>
    </Container>
  )
}