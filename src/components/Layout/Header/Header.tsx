import { FC } from 'react';
import { Button } from '../../common';
import { Container } from '../Container';
import styles from './Header.module.scss';
import { RightContent } from './RightContent';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <div className={styles.left}>
          <Button href='/' icon='home' theme='flat' />
        </div>
        <div className={styles.center}>ULTRA chess</div>
        <div className={styles.right}>
          <RightContent />
        </div>
      </Container>
    </header>
  );
};

export { Header };
