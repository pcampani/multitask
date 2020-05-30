import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Row, ErrorContainer } from './RegistrationForm.style';
import styled from 'styled-components';

//style formik input field with styled components
const Input = styled(Field)`
  border: 1px solid #444;
  border-radius: 5px;
  padding: 20px;
`;

const RegistrationField = ({
  fieldLabel,
  type,
  name,
}) => {

  return (
  <Row>
    
    <Input type={type} name={name} placeholder={fieldLabel} />
    <ErrorContainer>
      <ErrorMessage name={name} />
    </ErrorContainer>
  </Row>
  )};

export default RegistrationField;
