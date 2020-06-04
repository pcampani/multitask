import React, { Component, createRef } from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { v4 } from 'uuid';

import { flattenData } from '../../../flattenData';

import ItemCreationForm from '../ItemCreationForm';
import Item from '../Item';

import { SOURCE_LIST_ID } from '../../../config';
import { LIST_RELATIONSHIPS, SOURCE_LIST_QUERY } from '../../source-props/list';

// np__added_start unit: list, comp: Items, loc: styling

// add styling here
const ItemsStyleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

//background wrapper for the task lists
const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #f3f8fb;

  
`;

const TaskWrapper = styled.div`
  margin: 40px auto 40px auto;
  width: 320px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0,0,0,.5);

  h3 {
    text-align: left;
    color: #6aa5fe;
    font-weight: lighter;
    padding: 10px 0 0 15px;
  }
  

`;
// np__added_end unit: list, comp: Items, loc: styling

class Items extends Component {
// np__added_start unit: list, comp: Items, loc: beginning
// np__added_end unit: list, comp: Items, loc: beginning
  state = {
    selectedItemId: null,
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
    }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = e => {
    const node = this.wrapperRef.current;

    if (
      node &&
      node !== e.target &&
      !node.contains(e.target)
    ) {
      this.setState({ selectedItemId: null });
    }
  }

  handleSelect = id => this.setState({ selectedItemId: id });

  render() {
    const { userId } = this.props;
    const { selectedItemId } = this.state;

    const parameters = {
      currentUser: userId,
    };

    return (
     <Wrapper>
        <Unit 
        id={ SOURCE_LIST_ID }
        typeRelationships={ LIST_RELATIONSHIPS }
        query={ SOURCE_LIST_QUERY }
        parameters={parameters}
      >
        {({loading, error, data, refetchQueries}) => {
          if (loading) return 'Loading...';

          if (error) {
            console.error(error);
            return `Error: ${error.graphQLErrors}`
          };

          const items = data.unitData.map(el => flattenData(el));

          return (
            <>
              <TaskWrapper>
                {items.length !== 0 ? <h3>Active tasks</h3> : null}
              <ItemsStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
                { !items.length ?  <Item item={{value:"No active tasks"}} /> :
                    items.map(item => (
                        <Item
                          key={v4()}
                          parentId={ userId }
                          item={ item }
                          selected={ item.id === selectedItemId }
                          refetchQueries={refetchQueries}
                          onSelect={this.handleSelect}
                        />
                    )) 
                }
              </ItemsStyleWrapper>
              </TaskWrapper>
              <ItemCreationForm  userId={ userId } refetchQueries={refetchQueries}/>
                {/* np__added_start unit: list, comp: Items, loc: renderEnding */}
                {/* np__added_end unit: list, comp: Items, loc: renderEnding */}
            </>
          );
        }}
      </Unit>
     </Wrapper>
    );
  }
}

export default Items;
