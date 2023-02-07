import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ContextProvider from "./Context/PockemonContext";
import ErrorPage from './Pages/ErrorPage';
import PokemonDetails from './Pages/PockDetails';
import App from './App';
import TheHeader from './Components/Layout/Header';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorPage />
  },
  {
    path: "pokemon/:name",
    element: <PokemonDetails />,
    errorElement:<ErrorPage />
  },
]); 

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <TheHeader />
    <RouterProvider router={router} />
  </ContextProvider>,
)
