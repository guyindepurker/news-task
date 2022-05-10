import React, { Suspense, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useAppContext } from './context/AppContext';

const Login = React.lazy(() => import('./pages/Login/Login'));
const News = React.lazy(() => import('./pages/News/News'));

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    if (location.pathname === '/login' && isLoggedIn) {
      navigate('/news', { replace: true });
    }
  }, [isLoggedIn, location.pathname]);

  return (
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
  );
};

App.displayName = 'App';

export default React.memo(App);
