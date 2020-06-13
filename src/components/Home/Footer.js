import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  background-color: #081132;
  color: #fff;
  width: 415px;
  position: absolute;
  bottom: 0;
`;

export default function Footer() {
  return (
    <Container>
      Multitask App Copyright 2020
    </Container>
  )
}