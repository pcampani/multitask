import React, {useState} from 'react'
import {Formik, Form} from 'formik'
import {useMutation} from '@apollo/react-hooks'
import * as Yup from 'yup'
import {REGISTER_USER} from '@nostack/no-stack'
import styled from 'styled-components';

import RegistrationField from './RegistrationField'
import {Wrapper, Row, ErrorContainer} from './RegistrationForm.style'
import user from '../../assets/img/user.png';
import lock from '../../assets/img/lock.png';
import mail from '../../assets/img/mail.png';

const initialValues = {
  name: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

const Button = styled.button`
  width: 90%;
  padding: 10px 0;
  background-color: #4791db;
  border-radius: 20px;
  color: #fff;
  transition: background .2s ease-in;
  letter-spacing: 2px;
  font-weight: lighter;
  cursor: pointer;

  &:hover {
    background-color: #366FA8;
  }
`;

const validationSchema = Yup.object().shape({
  name: Yup.string()
  .label('userame')
  .required('Please enter desired username.'),
  email: Yup.string()
  .label('email')
  .email('Enter a valid email.')
  .required('Please enter your email.'),
  password: Yup.string()
  .label('password')
  .matches(/(?=.*\d)/, 'Must have at least one numerical character')
  .matches(
    /(?=.*[#?!@$%^&*-.,:;'"><[\]{}()_|\\/~])/,
    'Must have at least one special character.',
  )
  .min(8, 'Must be at least 8 characters.')
  .required('Please enter your desired password.')
})

const RegistrationForm = ({
  userClassId,
  onSuccess,
  props
}) => {
  const [register] = useMutation(REGISTER_USER)
  const [registrationCompleted, setRegistrationCompleted] = useState(false)
  const [formError, setFormError] = useState('')
  console.log(props)

  const handleSubmit = async (
    values,
    {setSubmitting},
  ) => {
    setFormError('')

    if (values.password !== values.passwordConfirmation) {
      return
    }

    try {
      await register({
        variables: {
          userClassId,
          name: values.name,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
      })

      setRegistrationCompleted(true)

      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.log(error)
      console.log(error.graphQLErrors)

      setFormError('Something went wrong. Please try again.')
    }

    setSubmitting(false)
  }

  if (registrationCompleted) {
    return (
      <Wrapper>
        <p>Please check your email and confirm that you are really you.  Then you can log in!</p>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({isSubmitting, isValid, dirty, isValidating}) => (
          <Form>
            <RegistrationField fieldLabel="User Name" type="text" name="name" bg={user}/>
            <RegistrationField fieldLabel="Password" type="password" name="password" bg={lock} />
             <RegistrationField fieldLabel="Email" type="email" name="email" bg={mail}/>
            <Row>
              <Button
                type="submit"
                disabled={isSubmitting || !isValid || isValidating || !dirty}
              >
                SIGN UP
              </Button>
              {formError && <ErrorContainer>{formError}</ErrorContainer>}
            </Row>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default RegistrationForm
