import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { OfflineChessGamePage } from '../pages/OfflineChessGame';
import { OfflineLobbyPage } from '../pages/OfflineLobby';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import { StartPage } from '../pages/Start';
import { TestPage } from '../pages/Test';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<StartPage />} />
      <Route path='offline-chess-game' element={<OfflineChessGamePage />} />
      <Route path='test' element={<TestPage />} />
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='/offline-lobby' element={<OfflineLobbyPage />} />
      <Route path='*' element={<div>Page not found</div>} />
    </Route>,
  ),
);
