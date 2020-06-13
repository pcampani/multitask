import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../Header';

import logo from '../../assets/img/logo-big.png';
import frame from '../../assets/img/frame.png';
import Footer from './Footer';

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

  div.hero {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      margin-top: 40px;
      
    }

    h2 {
      margin: 10px 0 0 0;
      font-weight: lighter;
      font-size: 20px;
    }

    a.button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 50px;
      color: #fff;
      background-color: #4aa5d4;
      width: 320px;
      height: 50px;
      border-radius: 50px;
      text-transform: uppercase;
      font-size: 18px;
      font-weight: lighter;
      text-decoration: none;
    }

    h4 {
      font-weight: lighter;
    }
  }

`;


export default function Welcome() {
  return (
    <Header>
      <Wrapper>
        <div className="hero">
          <img src={frame} alt="welcome image"/>
          <h2>Get Serious.</h2>
          <h2>Get Multitasking.</h2>
          <Link className='button' to='signup'>Try it</Link>
          <h4>Already have an account? <Link to='/login'>Log in</Link></h4>
        </div>
      </Wrapper>
      <Footer />
    </Header>
  )
}