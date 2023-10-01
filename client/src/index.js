import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Home, pageLoader } from "./pages/home";
import { Login } from "./pages/login";
import { Logout } from "./pages/logout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/home' loader={pageLoader} element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/logout' loader={pageLoader} element={<Logout />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


