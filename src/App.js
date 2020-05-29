import React from 'react';
import styled from 'styled-components';
import './App.css';
import { NoStackConsumer } from '@nostack/no-stack';

import { PLATFORM_ID, TYPE_USER_ID } from './config';

import NavBar from './components/NavBar';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Items from './components/List/Items';

const Wrapper = styled.div`
  width: 360px;
  margin: 100px auto 0 auto;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #4791db;
  padding: 100px 10px;
  box-shadow: 0 0 5px rgba(0,0,0,.5);
`;

const FormWrapper = styled.div`
  margin-top: 30px;
  background: #fff;
  width: 90%;
  border-radius: 5px;
`;

const App = () => (
  <>
    <NavBar />
    <Wrapper className="App">
      <NoStackConsumer>
        {({ loading, currentUser }) => {
          if (loading) return null;

          if (!currentUser) {
            return (
              
                <LoginWrapper>
                  <FormWrapper>
                  <AuthTabs
                    menuTitles={[
                      'Login',
                      'Register',
                    ]}
                  >
                    <LoginForm />
                    <RegistrationForm
                      platformId={PLATFORM_ID}
                      userClassId={ TYPE_USER_ID }
                    />
                  </AuthTabs>
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
  </>
);

export default App;
