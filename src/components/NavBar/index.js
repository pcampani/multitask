import React from 'react';
import styled from 'styled-components';

import { LogoutButton } from '@nostack/no-stack';

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
  box-shadow: 0 0 5px rgba(0,0,0,.5);
  z-index: 1000;

  span {
    font-weight: bolder;
  }
`;


const NavBar = () => (
  <Wrapper>
    <div><span>multi</span>task</div>
    <div>
      <LogoutButton />
    </div>
  </Wrapper>
);

export default NavBar;

