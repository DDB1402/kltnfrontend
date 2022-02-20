import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

const axiosApi = axios.create({
  baseURL: "https://backendwebchat.herokuapp.com",
  // baseURL: "http://localhost:3001",
  // withCredentials: true,
  responseType: 'json',
  timeout: 100000,
});

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogin } = useAuth();
  const isRelogin = useSelector((state) => state.auth.isRelogin);
  axiosApi.get("/test")
  .then((data) => {
    console.log(data);
  })

  axiosApi.get("/test")
  .then((data) => {
    console.log(data);
  })
  return (
    <Route
      {...rest}
      render={() =>
        isLogin || isRelogin ? <Component /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
