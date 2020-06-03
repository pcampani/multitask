import React from 'react';
import styled from 'styled-components';

import { LogoutButton } from '@nostack/no-stack';
import logo from '../../assets/img/logo.png';

// change styling here
const Wrapper = styled.div`
  box-sizing: border-box;
  width: 360px;
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

  span {
    position: absolute;
    width: 100%;
    height: .1px;
    box-shadow: 0 2px 10px rgba(0,0,0,.5);
    top: 98px;
    left: 0;
  }
`;

const NavBar = () => (
    <Wrapper>
      <img src={logo} alt="multitask logo"/>
      <div>
      <LogoutButton className='logout' />
      </div>
      <span>&nbsp;</span>
    </Wrapper>
   
  
);

export default NavBar;

