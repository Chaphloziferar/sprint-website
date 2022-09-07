import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './context/app/hooks'
import authApi from './apis/authApi';
import { Login } from './views/Login';
import { Home } from './views/Home';
import { signIn, logout } from './context/features/auth/authSlice'

const App: React.FC = () => {

  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.auth.status);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {

      const checkAuth = async (token: string) => {
        try {
          const {data} = await authApi.post("/auth/renewToken");
    
          localStorage.setItem("token", data.token);

          dispatch(signIn(data));
        } catch (error: any) {
            dispatch(logout());
            localStorage.removeItem("token");
        }
      }

      checkAuth(token);
    }
    else{
      dispatch(logout());
    }
  }, [dispatch])
  

  return (
    <React.Fragment>
      { (status === 'Not-Authenticated') && <Login />}
      { (status === 'Authenticated') && <Home />}
    </React.Fragment>
  )
}

export default App;