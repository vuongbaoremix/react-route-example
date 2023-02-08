import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes';
import { UserProvider } from 'contexts/user';

function App() {
  return <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
}

export default App;
