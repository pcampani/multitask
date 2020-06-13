import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { withNoStack } from '@nostack/no-stack';
import { makeStyles } from '@material-ui/core/styles';
import ForgotPasswordButton from '../ForgotPasswordButton';
import user from '../../assets/img/user.png';
import lock from '../../assets/img/lock.png';

//material ui classes
const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(3),
  }
}))

//wrapper for form
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  form {
    width: 100%;

    div.MuiFormControl-root {
      width: 90%;
    }

    input#nostack-username {
      width: 100%;
    }

    .user-input {
    position: relative;

    img {
      position: absolute;
      top: 20%;
      left: 2rem;
    }

    label#nostack-username-label {
      padding-left: 2rem;
    }


    label.MuiInputLabel-outlined.MuiInputLabel-shrink {
    transform: translate(-7px, -6px) scale(0.75);
    }
  }

  .password {
    position: relative;

    img {
      position: absolute;
      top: 20%;
      left: 2rem;
    }

    label#nostack-password-label {
      padding-left: 2rem;
    }

    label.MuiInputLabel-outlined.MuiInputLabel-shrink {
    transform: translate(-7px, -6px) scale(0.75);
    }
  }

  
  }
  
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
    width: 100%;
    height: 50px;
    border: 1px solid #888;
    border-radius: 5px;
    padding: 10px;
  }

`;

const Button = styled.button`
  width: 320px;
  height: 50px;
  padding: 5px 0;
  background-color: #4aa5d4;
  border-radius: 50px;
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
        <div className='user-input'>
        <img src={user} alt="user logo" />
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
        </div>
        
        <div className='password'>
          <img src={lock} alt="lock"/>
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
        </div>
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
