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
              <ItemCreationForm  userId={ userId } refetchQueries={refetchQueries}/>
              <ItemsStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
                { items && items.map(item => (
                  <Item
                    key={v4()}
                    parentId={ userId }
                    item={ item }
                    selected={ item.id === selectedItemId }
                    refetchQueries={refetchQueries}
                    onSelect={this.handleSelect}
                  />
                )) }
              </ItemsStyleWrapper>
                {/* np__added_start unit: list, comp: Items, loc: renderEnding */}
                {/* np__added_end unit: list, comp: Items, loc: renderEnding */}
            </>
          );
        }}
      </Unit>
    );
  }
}

export default Items;
