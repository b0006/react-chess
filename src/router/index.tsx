import { FC } from 'react';
import {
  Route,
  Outlet,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { observer } from 'mobx-react';
import { profileStore } from '../store';
import { Layout } from '../components/Layout/Layout';
import { OfflineChessGamePage } from '../pages/OfflineChessGame';
import { OfflineLobbyPage } from '../pages/OfflineLobby';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import { StartPage } from '../pages/Start';
import { TestPage } from '../pages/Test';
import { UrlData } from './types';

export const URL_DATA: UrlData = {
  init: {
    path: '/',
    children: {
      signIn: {
        path: '/sign-in',
        children: {},
      },
      signUp: {
        path: '/sign-up',
        children: {},
      },
      offlineLobby: {
        path: '/offline-lobby',
        children: {},
      },
      offlineChessGame: {
        path: '/offline-chess-game',
        children: {},
      },
      test: {
        path: '/test',
        withWsConnection: true,
        children: {},
      },
    },
  },
  notFound: {
    path: '*',
    children: {},
  },
};

const PrivateRoute: FC = observer(() => {
  const { userData, isInitLoading } = profileStore;

  if (isInitLoading) {
    // TODO: add loader
    return <div>loading...</div>;
  }

  return userData.isAuth ? <Outlet /> : <Navigate to='/sign-in' />;
});

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={URL_DATA.init.path} element={<Layout />}>
      <Route index element={<StartPage />} />
      <Route path={URL_DATA.init.children.test.path} element={<TestPage />} />
      <Route path={URL_DATA.init.children.signIn.path} element={<SignInPage />} />
      <Route path={URL_DATA.init.children.signUp.path} element={<SignUpPage />} />
      <Route element={<PrivateRoute />}>
        <Route path={URL_DATA.init.children.offlineLobby.path} element={<OfflineLobbyPage />} />
        <Route
          path={URL_DATA.init.children.offlineChessGame.path}
          element={<OfflineChessGamePage />}
        />
      </Route>
      <Route path={URL_DATA.notFound.path} element={<div>Page not found</div>} />
    </Route>,
  ),
);
