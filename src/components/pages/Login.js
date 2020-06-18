import React from 'react';
import styled from 'styled-components';
import { NoStackConsumer } from '@nostack/no-stack';

import LoginForm from '../LoginForm';
import Items from '../List/Items';
import Header from '../Header';

const Wrapper = styled.div`
  width: 415px;
  margin: 0 auto;
`;

//add form wrapper for styling
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #4aa5d4;
  padding: 0 10px;
  height: calc(100vh - 110px);
`;

const FormWrapper = styled.div`
  background: #fff;
  width: 90%;
  border-radius: 5px;
  text-align: center;

  h2 {
    font-weight: 400;
  }

`;

const Login = () => (
  <Header>
    <Wrapper className="App">
      <NoStackConsumer>
        {({ loading, currentUser }) => {
          if (loading) return null;
          
          if (!currentUser) {
            return (
              
                <LoginWrapper>
                  <FormWrapper>
                    <h2>Log In</h2>
                    <LoginForm />
                  </FormWrapper>
                </LoginWrapper>
            );
          }

          return (
            <Items userId={ currentUser.id } />
          );
        }}
      </NoStackConsumer>
    </Wrapper>
  </Header>
);



export default Login;