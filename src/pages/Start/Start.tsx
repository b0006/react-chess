import { FC } from 'react';
import { Container } from '../../components/Layout/Container';
import { MainMenu } from './MainMenu';

const StartPage: FC = () => {
  return (
    <Container>
      <MainMenu />
    </Container>
  );
};

export { StartPage };
