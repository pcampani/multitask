import React from 'react';
import styled from 'styled-components';
import { NoStackConsumer } from '@nostack/no-stack';

import RegistrationForm from '../RegistrationForm';
import Items from '../List/Items';
import Header from '../Header';

const Wrapper = styled.div`
  width: 415px;
  margin: 0 auto;
  height: 100%;
`;

//add form wrapper for styling
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #4aa5d4;
  padding: 100px 10px;
  height: 100%;
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

const Login = (props) => (
  <Header>
    <Wrapper className="App">
      <NoStackConsumer>
        {({ loading, currentUser }) => {
          if (loading) return null;

          if (!currentUser) {
            return (
              
                <LoginWrapper>
                  <FormWrapper>
                    <h2>Sign Up</h2>
                    <RegistrationForm props={props}/>
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