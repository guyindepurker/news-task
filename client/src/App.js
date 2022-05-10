import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import { history } from './utils/history';

const Login = React.lazy(() => import('./pages/Login/Login'));
const News = React.lazy(() => import('./pages/News/News'));

const App = () => {
  const { isLoggedIn } = useAppContext();
  console.log({ isLoggedIn });
  return (
    <BrowserRouter basename='/'>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {!isLoggedIn && (
            <>
              <Route exec path='/login' element={<Login />} />
              <Route exec path='*' element={<Navigate to='/login' replace />} />
            </>
          )}
          {isLoggedIn && (
            <>
              <Route exec path='/news' element={<News />} />
            </>
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

App.displayName = 'App';

export default React.memo(App);
