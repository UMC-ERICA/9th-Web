import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <Loginpage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
