import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { OfflineChessGamePage } from '../pages/OfflineChessGame';
import { StartPage } from '../pages/Start';
import { TestPage } from '../pages/Test';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<StartPage />} />
      <Route path='offline-chess-game' element={<OfflineChessGamePage />} />
      <Route path='test' element={<TestPage />} />
      <Route path='*' element={<div>Page not found</div>} />
    </Route>,
  ),
);
