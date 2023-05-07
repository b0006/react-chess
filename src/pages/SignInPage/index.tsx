import React from 'react';
import { Container } from '../../components/Layout/Container';
import { SignInForm } from '../../components/Profile/SignInForm/SignInForm';

export const SignInPage: React.FC = () => {
  return (
    <Container>
      <SignInForm />
    </Container>
  );
};
