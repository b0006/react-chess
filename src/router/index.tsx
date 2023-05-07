import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { StartPage } from '../pages/Start';

const Router: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<StartPage />} />
    </Routes>
  );
};

export { Router };
