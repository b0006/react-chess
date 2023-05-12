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
    <Route path='/' element={<Layout />}>
      <Route index element={<StartPage />} />
      <Route path='/test' element={<TestPage />} />
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route element={<PrivateRoute />}>
        <Route path='offline-lobby' element={<OfflineLobbyPage />} />
        <Route path='offline-chess-game' element={<OfflineChessGamePage />} />
      </Route>
      <Route path='*' element={<div>Page not found</div>} />
    </Route>,
  ),
);
