import React from 'react';
import styled from 'styled-components';

import logo from '../assets/img/logo-big.png';


const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  
`;

const Wrapper = styled.div`
  position: absolute;

  
  div.header {
    top: 0;
    left: 0;
    display: grid;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100px;
    box-shadow: 0 2px 5px rgba(0,0,0,.3);
  }

  div.children {
    margin-top: 2rem;
  }
`;

export default function Header(props) {
  
  return (
    <Container>
      <Wrapper>
        <div className="header">
          <img src={logo} alt="header logo"/>
        </div>
        <div className='children'>
        {props.children}
        </div>
      </Wrapper>
    </Container>
  )
}