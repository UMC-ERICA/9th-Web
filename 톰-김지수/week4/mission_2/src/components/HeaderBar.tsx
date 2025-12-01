// src/components/common/HeaderBar.tsx
import { Link } from "react-router-dom";
import "./HeaderBar.css";

export default function HeaderBar() {
  return (
    <header className="header-bar">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          돌려돌려LP판
        </Link>

        <div className="header-right">
          <Link to="/login" className="header-btn login-btn">
            로그인
          </Link>
          <Link to="/signup" className="header-btn signup-btn">
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
}
