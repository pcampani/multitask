import React from 'react';
import styled from 'styled-components';

import logo from '../assets/img/logo-big.png';


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