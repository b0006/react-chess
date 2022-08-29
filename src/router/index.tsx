import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StartPage } from '../pages/Start';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
