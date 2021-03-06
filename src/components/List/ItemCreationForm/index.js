import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';


import { CREATE_ITEM_FOR_LIST_ACTION_ID
 } from '../../../config';


// change styling here

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  justify-content: center;
  position: relative;
  margin: 1rem 0;
  position: fixed;
  top: calc(100vh - 110px);
  left: 50%;
  transform: translateX(-50%);
`;

const InputWrapper = styled.div`
  position: relative;
  
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
   font-size: 1rem;

   &:focus {
     border: none;
     outline: none;
   }
  }

  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
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
`;

const TaskButton = styled(Button)`
  width: 320px;
  font-size: 20px;
  
`;



function ItemCreationForm({ userId, createItem, refetchQueries }) {
  const [ itemValue, updateItemValue ] = useState('');
  const [ loading, updateLoading ] = useState(false);
  let [isVisible, setVisibility] = useState(false);

  function toggleForm() {
    setVisibility(isVisible = !isVisible)
  }

  function handleChange(e) {
    updateItemValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!itemValue) {
      return;
    }

    updateLoading(true);

    const createItemResponse = await createItem({
      variables: {
        actionId: CREATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: userId,
          value: itemValue,
        }),
        unrestricted: false,
      },
      refetchQueries
    });

    const newItemData = JSON.parse(createItemResponse.data.Execute);
    updateItemValue('');
    updateLoading(false);
    toggleForm();
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <Wrapper>
      <InputWrapper>
        {isVisible ? <Form>
          <input
            autoFocus
            id="item-value"
            type="text"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={ itemValue }
            disabled={loading}
            placeholder="Add a task"
          />
          <Button variant="contained" color="primary" disabled={loading}  onClick={handleSubmit}>+</Button>
        </Form> :
      <TaskButton onClick={toggleForm}>Add a task +</TaskButton>}
    </InputWrapper>
  </Wrapper>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'createItem' }),
  
)(ItemCreationForm);
