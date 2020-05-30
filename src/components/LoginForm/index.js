import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { withNoStack } from '@nostack/no-stack';
import { makeStyles } from '@material-ui/core/styles';
import ForgotPasswordButton from '../ForgotPasswordButton';

//material ui classes
const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(3)
  }
}))

const Wrapper = styled.div`
  width: 250px;
  padding: 1em 0;
  width: 100%;
  box-shadow: 0 0 5px rgba(0,0,0,.4);
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
    box-sizing: border-box;
    display: block;
    margin: 0.5em auto;
    width: 80%;
    height: 50px;
    border: 1px solid #888;
    border-radius: 5px;
    padding: 10px;
  }

`;

const Button = styled.button`
  width: 90%;
  padding: 5px 0;
  background-color: #4791db;
  border-radius: 20px;
  color: #fff;
  text-transform: uppercase;
  font-size: 18px;
`;

const LoginForm = ({ loading, currentUser, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const classes = useStyles();

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

  React.useEffect(() => {
    if (loading || currentUser) {
      return null;
    }
  },[])

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <TextField
            className={classes.input}
            id="nostack-username"
            variant="outlined"
            name="username"
            label="User Name"
            disabled={isSubmitting}
            value={username}
            onChange={e => setUsername(e.target.value)}
            />

        <TextField
          className={classes.input}
          id="nostack-password"
          variant="outlined"
          type="password"
          name="password"
          label="Password"
          disabled={isSubmitting}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
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
