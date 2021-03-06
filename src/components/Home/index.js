import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../Header';

import frame from '../../assets/img/frame.png';
import Footer from './Footer';

const Container = styled.div` 
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
`;

const Wrapper = styled.div`

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
      font-weight: 400;
      text-decoration: none;
      transition: background .2s ease-in;
      letter-spacing: 2px;
      cursor: pointer;

      &:hover {
        background-color: #366FA8;
      }
    }

    h4 {
      font-weight: lighter;
    }
  }

`;


export default function Welcome() {
  return (
    <Container>
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
    </Container>
  )
}