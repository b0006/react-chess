import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { StartPage } from '../pages/Start';
import { TestPage } from '../pages/Test';

export const Router: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<StartPage />} />
        <Route path='test' element={<TestPage />} />
        <Route path='*' element={<div>Page not found</div>} />
      </Route>
    </Routes>
  );
};
