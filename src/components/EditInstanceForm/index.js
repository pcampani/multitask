import React from 'react';
import styled from 'styled-components';

const Form = styled.div`
 
  display: flex;
  padding: 12px 15px;

  input {
    font-size: 20px;
    padding-left: 50px;
    width: 180px;
  }
  
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding-right: 10px;
  color: #bbbbbb;
  transition: color 0.5s ease;
  &:hover {
    color: ${props => props.hoverColor || '#000000'};
  }
`;

function EditInstanceForm({
  id,
  label,
  value,
  onChange,
  onSave,
  onCancel,
  disabled,
}) {
  return (
    <Form>
      <label htmlFor={id}>
        {label}
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </label>
      <Button
        type="button"
        hoverColor="#00FF00"
        onClick={onSave}
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
    </Form>
  );
}

export default EditInstanceForm;
