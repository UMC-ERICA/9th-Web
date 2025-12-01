// src/components/signup/PasswordStep.tsx
import React from "react";

interface PasswordStepProps {
  email: string;

  password: string;
  setPassword: (v: string) => void;
  passwordError: string;
  setPasswordError: (v: string) => void;

  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  confirmError: string;
  setConfirmError: (v: string) => void;

  showPassword: boolean;
  setShowPassword: (v: boolean) => void;

  onNext: () => void;
}

const PasswordStep: React.FC<PasswordStepProps> = ({
  email,
  password,
  setPassword,
  passwordError,
  setPasswordError,
  confirmPassword,
  setConfirmPassword,
  confirmError,
  setConfirmError,
  showPassword,
  setShowPassword,
  onNext,
}) => {
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPassword(value);

    if (!value) {
      setPasswordError("비밀번호를 입력해주세요.");
    } else if (value.length < 6) {
      setPasswordError("비밀번호는 6자 이상이어야 합니다.");
    } else {
      setPasswordError("");
    }

    if (confirmPassword && value !== confirmPassword) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmError("");
    }
  };

  const handleConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (!value) {
      setConfirmError("비밀번호를 다시 입력해주세요.");
    } else if (value !== password) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmError("");
    }
  };

  const isValid =
    password !== "" &&
    confirmPassword !== "" &&
    !passwordError &&
    !confirmError;

  return (
    <>
      <h2 className="signup-title">비밀번호 설정</h2>
      <p className="signup-sub">이메일: {email}</p>

      <div className="field">
        <label className="label">비밀번호</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해주세요."
          />
          <button
            type="button"
            className="eye-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {passwordError && <p className="error-text">{passwordError}</p>}
      </div>

      <div className="field">
        <label className="label">비밀번호 재확인</label>
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={handleConfirmChange}
          placeholder="비밀번호를 다시 입력해주세요."
        />
        {confirmError && <p className="error-text">{confirmError}</p>}
      </div>

      <button
        className="next-button"
        disabled={!isValid}
        onClick={onNext}
      >
        다음
      </button>
    </>
  );
};

export default PasswordStep;
