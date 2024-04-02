import {
  Link,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import './App.css';
import Base from './layouts/Base';
import Login from './login';
import AuthProvider from './utils/AuthProvider';

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Base>
          <h1>Hello World</h1>
          <Link to="about">About Us</Link>
        </Base>
      ),
    },
    {
      path: "/login",
      element: <Base>
        <Login/>
      </Base>
    },
  ]);

function App() {
  return <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>;
}

export default App;
