import React from 'react';
import styled from 'styled-components';

import logo from '../assets/img/logo-big.png';


const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  
  div.header {
    top: 0;
    left: 0;
    display: grid;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100px;
    box-shadow: 0 1px 2px 2px rgba(0,0,0,.1);
  }

  div.children {
    margin-top: .2rem;
  }

  @media screen and (max-width: 380px) {

    div.children {
      width: 360px;
    }
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