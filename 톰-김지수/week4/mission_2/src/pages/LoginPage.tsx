// src/pages/LoginPage.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import type { LoginValues, LoginErrors } from "../hooks/useForm";
import { useForm } from "../hooks/useForm";
import "./LoginPage.css";

function validate(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};

  // 이메일 형식 검사
  if (!values.email) {
    errors.email = "이메일을 입력해주세요.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      errors.email = "유효하지 않은 이메일 형식입니다.";
    }
  }

  // 비밀번호 길이 검사
  if (!values.password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (values.password.length < 6) {
    errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
  }

  return errors;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // 🔑 AuthContext에서 로그인 함수 가져오기

  const { values, errors, isValid, handleChange, handleSubmit } = useForm({
    initialValues: { email: "", password: "" },
    validate,
    onSubmit: (v: LoginValues) => {
      // 실제로는 여기서 API 호출 + 토큰 저장할 자리
      console.log("로그인 시도", v);

      // 🔐 로그인 상태 true로 변경
      login();

      // 🧭 로그인 후 이동할 페이지
      //  - 홈으로 보내고 싶으면 "/"
      //  - 방금 말한 프리미엄 페이지 테스트하려면 "/premium/webtoon/1"
      navigate("/");
    },
  });

  return (
    <div className="login-page">
      <main className="login-main">
        <div className="login-card">
          <button className="google-button">구글 로그인</button>

          <div className="divider">
            <span className="line" />
            <span className="or">OR</span>
            <span className="line" />
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="field">
              <input
                name="email"
                type="email"
                placeholder="이메일을 입력해주세요!"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="error-text">{errors.email}</p>
              )}
            </div>

            <div className="field">
              <input
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요!"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={!isValid}
            >
              로그인
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
