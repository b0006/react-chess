import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import styles from './Layout.module.scss';

const Layout: FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.layout__main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { Layout };
