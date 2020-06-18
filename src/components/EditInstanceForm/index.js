import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,.3);
  z-index: 1000;
`;

const Form = styled.div`
  display: flex;
  border-radius: 5px;
  height: 60px;
  justify-content: center;
  position: relative;
 
  div {
    position: relative;
    position: absolute;
   top: calc(100vh - 80px);
   left: 50%;
   transform: translateX(-50%);
  }
  
  input {
   width: 320px;
   padding: 1rem;
   border-radius: 10px;
   box-shadow: 5px 5px 10px #888888;
   border: none;
   font-size: 1rem;
   background: #fff;
   
  }

  input:focus {
    border: none;
    outline: none;
  }

  button {
    position: absolute;
    top: .28rem;
    right: 1rem;
  }
`;

const Button = styled.button`
  width: 50px;
  height: 40px;
  background: #4AA5D4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  color: #fff;
  font-size: 2rem;
  border: none;
  cursor: pointer;

  &:focus {
    border: none;
    outline: none;
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
    <Wrapper>
      <Form>
        <div>
          <input
            autoFocus
            id={id}
            type="text"
            onChange={onChange}
            value={ value }
            disabled={disabled}
          />
          <Button variant="contained" color="primary"  onClick={onSave}>+</Button>
        </div>
        </Form> :
    </Wrapper>
  );
}

export default EditInstanceForm;

{/* <Form>
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
    </Form> */}