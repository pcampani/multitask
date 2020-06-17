import React from 'react';
import { Field } from 'formik';
import { Row } from './RegistrationForm.style';
import styled from 'styled-components';
import { TextField } from 'formik-material-ui';
import user from '../../assets/img/user.png';

//style formik input field with styled components
const Input = styled(Field)`
  border-radius: 5px;
  padding: 20px;
  width: 100%;
  background: url(${props => props.bg ? user : null});

`;


const RegistrationField = ({
  fieldLabel,
  type,
  name,
}) => {

  return (
  <Row>
    <Input type={type} name={name} label={fieldLabel} component={TextField} variant='outlined'/>
  </Row>
  )};

export default RegistrationField;
