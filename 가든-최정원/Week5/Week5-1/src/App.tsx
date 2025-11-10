import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import HomePage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import MyPage from "./pages/MyPage";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";

// routes
import ProtectedRoute from "./routes/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <Loginpage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/google", element: <GoogleLoginRedirectPage /> },
  {
    path: "/mypage",
    element: (
      <ProtectedRoute>
        <MyPage />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
