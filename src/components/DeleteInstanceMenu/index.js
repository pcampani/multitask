import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding-left: 1rem;
  color: #bbbbbb;
  transition: color 0.5s ease;
  &:hover {
    color: ${props => props.hoverColor || '#000000'};
  }
`;

const Container = styled.div`
  color: tomato;
  margin-left: 1em;
`;

function DeleteInstanceMenu({
  onDelete,
  onCancel,
  disabled,
}) {
  return (
    <Container>
      Delete?
      <Button
        type="button"
        hoverColor="#00FF00"
        onClick={onDelete}
        disabled={disabled}
      >
        &#10003;
      </Button>
      <Button
        type="button"
        hoverColor="#FF0000"
        onClick={onCancel}
        disabled={disabled}
      >
        &#10005;
      </Button>
    </Container>
  )
}

export default DeleteInstanceMenu;
