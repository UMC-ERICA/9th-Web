import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import LpsListPage from "../pages/LpsListPage";
import LpDetailPage from "../pages/LpDetailPage";
import ProtectedRouteWithRedirect from "../components/common/ProtectedRouteWithRedirect";

// 기존 ZIP 파일 로그인/회원가입
import Loginpage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <LpsListPage /> },

      {
        path: "/lp/:lpid",
        element: (
          <ProtectedRouteWithRedirect>
            <LpDetailPage />
          </ProtectedRouteWithRedirect>
        ),
      },
    ],
  },

  { path: "/login", element: <Loginpage /> },
  { path: "/signup", element: <SignupPage /> },
]);
