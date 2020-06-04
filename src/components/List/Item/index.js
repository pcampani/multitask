import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';

import {
  UPDATE_ITEM_FOR_LIST_ACTION_ID,
  DELETE_ITEM_FOR_LIST_ACTION_ID,
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';

// add styling here
const ItemStyleWrapper = styled.div(({
  selected,
  isDeleting,
}) => `
  display: flex;
  width: 100%;
  background-color: ${isDeleting ? '#e33371' : '#fff'};
  cursor: ${selected ? 'auto' : 'pointer'};
  padding: 15px 15px;
  font-size: 20px;

  div.item {
    flex: 4;
  }

  div {
    display: flex;
    justify-content: space-between;
  }
`);

const Input = styled.input`
  display: inline-block;
  width: 30px;
`;

const TaskWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;

  input[type='checkbox'] {
    height: 50px;
    border: 1px solid #cdcdcd;
    margin: 5px 0 0 40px;
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

  if (!selected) {
    return (
      <TaskWrapper>
        <Input type="checkbox" value={itemValue} />
        <ItemStyleWrapper onClick={() => onSelect(item.id)}>
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
      <ItemStyleWrapper>
        <EditInstanceForm
          id={ item.id }
          label="Item Value:"
          value={ itemValue }
          onChange={handleItemValueChange}
          onSave={handleItemValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </ItemStyleWrapper>
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
      <ItemStyleWrapper
        selected={selected}
        isDeleting={isDeleting}
      >
        { itemValue }
        <DeleteInstanceMenu
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </ItemStyleWrapper>
    );
  }

  return (
      <TaskWrapper>
         <Input type="checkbox" value={itemValue} />
        <ItemStyleWrapper selected={selected}>
        <div className="item">
          {  itemValue }
        </div>
        <div>
          <Button
            type="button"
            onClick={() => updateIsEditMode(true)}
          >
            &#9998;
          </Button>
          <Button
            type="button"
            onClick={() => updateIsDeleteMode(true)}
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