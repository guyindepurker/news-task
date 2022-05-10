import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import { useAppContext } from '../../context/AppContext';

import { httpService } from '../../service/httpService';
import classes from './Login.module.scss';
import { LocalStorageService } from '../../service/localStorageService';
import { history } from '../../utils/history';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
  const { setUser } = useAppContext();
  const navigate = useNavigate()

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setError(true);
      return;
    }
    setLoading(true);
    try {
      const { data } = await httpService.post('/login', {
        userName: userName,
        password: password
      })

      const user = data.data.user;

      LocalStorageService.save('token', data.data.token)
      setUser(user);
      setLoading(false)
      navigate('/news', { replace: true });
      console.log('navigate  called');
    } catch (err) {
      console.log('error', err);
      setLoading(false)
      setError(true)
    }

  }


  return (
    <div className={classes['container']}>
      <h1 className={classes['title']}>Please login</h1>
      <form onSubmit={onSubmit} className={classes['loginForm']}>
        <span className="p-float-label">
          <InputText id="name" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <label htmlFor="name">Username</label>
        </span>
        <span className="p-float-label">
          <Password id="pass" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor="pass">Password</label>
        </span>
        <Button label="Login" loading={loading}></Button>
      </form>
    </div>
  );
};

Login.displayName = 'Login';
Login.defaultProps = {};

export default React.memo(Login);
