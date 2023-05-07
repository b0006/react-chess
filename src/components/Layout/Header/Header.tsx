import { FC } from 'react';
import { Container } from '../Container';
import styles from './Header.module.scss';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>header</Container>
    </header>
  );
};

export { Header };
