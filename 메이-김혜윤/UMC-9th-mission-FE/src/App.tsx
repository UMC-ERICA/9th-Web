import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './page/LoginPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <NotFoundPage/>,
    children:[
      {path: 'login', element:<LoginPage/>}
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}