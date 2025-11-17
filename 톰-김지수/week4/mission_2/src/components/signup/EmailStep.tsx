// src/components/signup/EmailStep.tsx
import React from "react";

interface EmailStepProps {
  email: string;
  emailError: string;
  setEmail: (v: string) => void;
  setEmailError: (v: string) => void;
  onNext: () => void;
}

const EmailStep: React.FC<EmailStepProps> = ({
  email,
  emailError,
  setEmail,
  setEmailError,
  onNext,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      setEmailError("이메일을 입력해주세요.");
    } else if (!emailRegex.test(value)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
    } else {
      setEmailError("");
    }
  };

  const isValid = email !== "" && emailError === "";

  return (
    <>
      <h2 className="signup-title">이메일로 회원가입</h2>

      <div className="field">
        <label className="label">이메일</label>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="이메일을 입력해주세요."
        />
        {emailError && <p className="error-text">{emailError}</p>}
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

export default EmailStep;
