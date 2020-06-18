import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';
import { Link } from 'react-router-dom';

import {
  UPDATE_ITEM_FOR_LIST_ACTION_ID,
  DELETE_ITEM_FOR_LIST_ACTION_ID,
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';

const ItemStyleWrapper = styled.div(({
  selected,
  isDeleting,
}) => `
  display: flex;
  width: 100%;
  align-items: center;
  background-color: ${isDeleting ? '#c8d3d9' : '#fff'};
  cursor: ${selected ? 'auto' : 'pointer'};
  font-size: 20px;

  div.item {
    flex: 4;
  }
  div {
    display: flex;
    justify-content: space-between;
  }

  
`);

const Highlight = styled.div`
  box-sizing: border-box;
  width: 100%;
  background: #c8d3d9;
  display: flex;
  align-items: center;
  position: relative;
  padding: .8rem 0;

  input {
    width: 50px;
    height: 24px;
    border-radius: 5px;
  }

  p.deleteTitle {
    margin: 0;
    color: #000;
    font-size: 20px;
  }

  
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

const TaskWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1rem;

    div.item {
      padding: 10px;
    }
  
    &:hover {
    background: #c8d3d9;
  }

  &:hover div.item {
    background: #c8d3d9;
  }

  &:hover div {
    background: #c8d3d9;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding-right: 5px;
  color: #2196f3;
  transition: color 0.5s ease;
  &:hover {
    color: ${props => props.hoverColor || '#1976d2'};
  }

  &:disabled {
    color: #b0babf;
    text-decoration: none !important;
  }
`;

function Item({
  item,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
}) {
  const [itemValue, updateItemValue] = useState(item.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);
  let [completed, setCompleted] = useState(false);
  let toggle = React.useRef(null);

  const handleChange = (event) => {
    const task = toggle.current;
    setCompleted(completed = !completed)
    if(completed === true) {
      task.style.textDecoration = "line-through";
      task.style.color = "#b0babf";
    }
    else {
      task.style.textDecoration = "none";
      task.style.color = "#000";
    }
  }

  if (!selected) {
    return (
      <TaskWrapper>
         <Input type="checkbox"  value={itemValue} onChange={handleChange}/>
        <ItemStyleWrapper className="item" ref={toggle} onClick={() => onSelect(item.id)}>
          { itemValue }
        </ItemStyleWrapper>
      </TaskWrapper>
    );
  }

  function handleItemValueChange(e) {
    updateItemValue(e.target.value);
  }

  async function handleItemValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          value: itemValue,
          instanceId: item.id,
        }),
      },
      refetchQueries,
    });

    updateIsEditMode(false);
    updateIsSaving(false);
  }

  function handleCancelEdit() {
    updateIsEditMode(false);
  }

  if (isEditMode) {
    return (
        <EditInstanceForm
          id={ item.id }
          value={ itemValue }
          onChange={handleItemValueChange}
          onSave={handleItemValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
    );
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_ITEM_FOR_LIST_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: item.id,
          }),
        },
        refetchQueries
      });
    } catch (e) {
      updateIsDeleting(false);
    }
  }

  function handleCancelDelete() {
    updateIsDeleteMode(false);
  }

  if (isDeleteMode) {
    return (
      <Highlight
        selected={selected}
        isDeleting={isDeleting}
      >
        <Input type="checkbox" disabled/>
        <p className='deleteTitle'>{ itemValue }</p>
        <DeleteInstanceMenu className='deleteIcon'
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </Highlight>
    );
  }

  return (
      <TaskWrapper>
        <Input type="checkbox"  value={itemValue} onChange={handleChange}/>
        <ItemStyleWrapper selected={selected}>
          <div className="item">
            {  itemValue }
          </div>
          <div>
            <Button
              type="button"
              onClick={() => updateIsEditMode(true)}
              disabled={completed}
            >
              &#9998;
            </Button>
            <Button
              type="button"
              onClick={() => updateIsDeleteMode(true)}
              disabled={completed}
            >
              &#128465;
            </Button>
          </div>
        </ItemStyleWrapper>
      </TaskWrapper>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)(Item);