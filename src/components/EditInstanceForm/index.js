import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  justify-content: center;
  position: relative;
  margin: 1rem 0;
`;

const InputWrapper = styled.div`
  position: relative;
  
`;

const Input = styled.input`
  display: inline-block;
  height: 50px;
  width: 27px;
  border: 1px solid #c8d3d9;
  margin: 5px 0 0 40px;
  padding: 10px;
  z-index: 10;
`;

const Form = styled.div`
  display: flex;
  border-radius: 5px;
  height: 60px;
  justify-content: center;
  
  input {
   width: 320px;
   padding: 1rem;
   border-radius: 10px;
   box-shadow: 5px 5px 10px #888888;
   border: none;
   font-size: 20px;
  }

  button.go {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 3rem;
  }
  button.stop {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
    background-color: tomato;
  }
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  background: #4AA5D4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  color: #fff;
  font-size: 1rem;
  border: none;
`;

const TaskButton = styled(Button)`
  width: 320px;
  font-size: 20px;
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
      <InputWrapper>
      <Form>
      
        <input
          id={id}
          type="text"
          onChange={onChange}
          value={ value }
          disabled={disabled}
        />
      <Button className='go' variant="contained" color="primary" disabled={disabled}  onClick={onSave}>
        &#10003;
      </Button>
      <Button className='stop' variant="contained" color="secondary" disabled={disabled}  onClick={onCancel}>
        &#10005;
      </Button>
    </Form> 
      </InputWrapper>
  </Wrapper>
  );
  
}

export default EditInstanceForm;

// return (
//   <Form>
//     <label htmlFor={id}>
//       {label}
//       <input
//         id={id}
//         type="text"
//         value={value}
//         onChange={onChange}
//         disabled={disabled}
//       />
//     </label>
//     <Button
//       type="button"
//       hoverColor="#00FF00"
//       onClick={onSave}
//       disabled={disabled}
//     >
//       &#10003;
//     </Button>
//     <Button
//       type="button"
//       hoverColor="#FF0000"
//       onClick={onCancel}
//       disabled={disabled}
//     >
//       &#10005;
//     </Button>
//   </Form>
// );