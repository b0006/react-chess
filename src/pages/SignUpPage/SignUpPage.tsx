import { FC } from 'react';
import { Container } from '../../components/Layout/Container';
import { SignUpForm } from '../../components/Profile/SignUpForm';

export const SignUpPage: FC = () => {
  return (
    <Container>
      <SignUpForm />
    </Container>
  );
};
