import React from 'react';
import styled from 'styled-components';

import { LogoutButton } from '@nostack/no-stack';
import logo from '../../assets/img/logo.png';

// change styling here
const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100px;
  position: fixed;
  background-color: #fff;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  padding: 10px;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  z-index: 1000;

`;

const Nav = styled.nav`
  width: 80vw;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
`;

const NavBar = () => (
  <Wrapper>
    <Nav>
      <img src={logo} alt="multitask logo"/>
      <div>
      <LogoutButton className='logout' />
      </div>
    </Nav>
  </Wrapper>
);

export default NavBar;

