import React from 'react';
import { Field } from 'formik';
import { Row } from './RegistrationForm.style';
import styled from 'styled-components';
import { TextField } from 'formik-material-ui';


//style formik input field with styled components
const Input = styled(Field)`
  width: 100%;


`;



const RegistrationField = ({
  bg,
  fieldLabel,
  type,
  name,
}) => {

  return (
  <Row>
    <img src={bg} />
    <Input type={type} name={name} placeholder={fieldLabel} component={TextField} variant='outlined'/>
  </Row>
  )};

export default RegistrationField;
