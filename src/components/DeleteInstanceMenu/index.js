import React from 'react';
import styled from 'styled-components';
import trash from '../../assets/img/trash.png';

const Button = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  padding-left: 1rem;
  color: #fff;
  transition: color 0.5s ease;
  &:hover {
    color: tomato;
  }

  
`;

const Container = styled.div`
  color: tomato;
  margin-left: 2em;
`;

function DeleteInstanceMenu({
  onDelete,
  onCancel,
  disabled,
}) {
  return (
    <Container>
      <Button
        type="button"
        hoverColor="#00FF00"
        onClick={onDelete}
        disabled={disabled}
      >
        <img src={trash} alt="delete"/>
      </Button>
      {/* <Button
        type="button"
        hoverColor="#FF0000"
        onClick={onCancel}
        disabled={disabled}
      >
        &#10005;
      </Button> */}
    </Container>
  )
}

export default DeleteInstanceMenu;
