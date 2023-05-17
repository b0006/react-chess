import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationProvider } from '../../common';
import { profileStore } from '../../../store';
import { Header } from '../Header';
import { Footer } from '../Footer';
import styles from './Layout.module.scss';
import { useCheckWsConnection } from './useCheckWsConnection.hook';

export const Layout: FC = () => {
  const { wsDisconnect } = profileStore;
  useCheckWsConnection({ wsDisconnect });

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
