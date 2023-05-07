import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationProvider } from '../../common';
import { Header } from '../Header';
import { Footer } from '../Footer';
import styles from './Layout.module.scss';

const Layout: FC = () => {
  return (
    <NotificationProvider>
      <div className={styles.layout}>
        <Header />
        <main className={styles.layout__main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </NotificationProvider>
  );
};

export { Layout };
