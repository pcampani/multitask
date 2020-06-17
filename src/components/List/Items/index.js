import React, { Component, createRef } from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { v4 } from 'uuid';
import NavBar from '../../NavBar'
import { flattenData } from '../../../flattenData';

import ItemCreationForm from '../ItemCreationForm';
import Item from '../Item';

import { SOURCE_LIST_ID } from '../../../config';
import { LIST_RELATIONSHIPS, SOURCE_LIST_QUERY } from '../../source-props/list';

// np__added_start unit: list, comp: Items, loc: styling

// add styling here
const ItemsStyleWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`;

//background wrapper for the task lists
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 80vw;
  height: 100vh;
  z-index: -1;
  background-color: #f3f8fb;
  padding: 120px 2rem 2rem 2rem;
  transform: translateX(-50%);
  
`;

const TaskWrapper = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0,0,0,.5);
  padding: 2rem 2px;

  h3 {
    text-align: left;
    color: #6aa5fe;
    font-weight: lighter;
    padding: 10px 0 0 15px;
  }

`;

const ItemWrapper = styled.div`
  display: grid;
  
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
      <>
        <NavBar />
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
              <ItemWrapper >
              <ItemsStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
                { !items.length ?  <div style={{
                    width: "100%",
                    display: "flex", 
                    justifyContent: "flex-start", 
                    alignItems:"flex-start", 
                    height:"100px",
                    padding: "1rem",
                    color: "#434343"
                  }}>
                    No active tasks</div> :
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
              </ItemWrapper>
              </TaskWrapper>
              <ItemCreationForm  userId={ userId } refetchQueries={refetchQueries}/>
                {/* np__added_start unit: list, comp: Items, loc: renderEnding */}
                {/* np__added_end unit: list, comp: Items, loc: renderEnding */}
            </>
          );
        }}
      </Unit>
     </Wrapper>
      </>
    );
  }
}

export default Items;
