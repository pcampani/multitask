import React, { useState } from 'react';
import styled from 'styled-components';

import { withNoStack } from '@nostack/no-stack';

import ForgotPasswordButton from '../ForgotPasswordButton';


const Wrapper = styled.div`
  width: 250px;
  padding: 1em 0;
  width: 100%;
`;

const Row = styled.div`
  margin: 0.5em;
  padding: 0.5em;
  text-align: center;
  position: relative;

  label {
    position: absolute;
    top: 30px;
    left: 60px;
    color: #bcbcbc;
    z-index: 10;
    transition: all .2s ease;
  }

  input {
    display: block;
    margin: 0.5em auto;
    width: 80%;
    height: 50px;
    border-radius: 5px;
  }

  input:focus ~ label {
    top: -10px;
    left: 35px;
    color: #000;
    font-size: .8rem;
  }
`;

const Button = styled.button`
  width: 90%;
  padding: 10px 0;
  background-color: #4791db;
  border-radius: 20px;
  color: #fff;
`;

const LoginForm = ({ loading, currentUser, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (loading || currentUser) {
    return null;
  }

  const handleSubmit = async e => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await login({
        username,
        password,
      });
    } catch (error) {
      setError(
        error.message ||
        (error.graphQLErrors &&
          error.graphQLErrors.length &&
          error.graphQLErrors[0]) ||
        error,
      );
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Row>
        <input
            id="nostack-username"
            type="text"
            name="username"
            disabled={isSubmitting}
            value={username}
            onChange={e => setUsername(e.target.value)}
            />
          <label htmlFor="nostack-username">
            User Name
          </label>
        </Row>
        <Row>
        <input
              id="nostack-password"
              type="password"
              name="password"
              disabled={isSubmitting}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          <label htmlFor="nostack-password">
            Password
          </label>
        </Row>
        <Row>
          <Button
            type="submit"
            disabled={isSubmitting || !username || !password}
          >
            Log In
          </Button>
        </Row>
        {error && <Row>{error}</Row>}
      </form>
      <Row>
        <ForgotPasswordButton />
      </Row>
    </Wrapper>
  );
}

export default withNoStack(LoginForm);
