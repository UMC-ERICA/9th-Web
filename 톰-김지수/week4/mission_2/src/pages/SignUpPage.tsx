// src/pages/SignUpPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailStep from "../components/signup/EmailStep";
import PasswordStep from "../components/signup/PasswordStep";
import ProfileStep from "../components/signup/ProfileStep";
import "./SignUpPage.css";

type Step = "EMAIL" | "PASSWORD" | "PROFILE";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("EMAIL");

  // 1단계
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // 2단계
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 3단계
  const [nickname, setNickname] = useState("");

  const handleComplete = () => {
    console.log({ email, password, nickname });
    alert("회원가입 완료! 🎉");
    navigate("/"); // 홈으로 이동
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        {step === "EMAIL" && (
          <EmailStep
            email={email}
            setEmail={setEmail}
            emailError={emailError}
            setEmailError={setEmailError}
            onNext={() => setStep("PASSWORD")}
          />
        )}

        {step === "PASSWORD" && (
          <PasswordStep
            email={email}
            password={password}
            setPassword={setPassword}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            confirmError={confirmError}
            setConfirmError={setConfirmError}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onNext={() => setStep("PROFILE")}
          />
        )}

        {step === "PROFILE" && (
          <ProfileStep
            email={email}
            nickname={nickname}
            setNickname={setNickname}
            onComplete={handleComplete}
          />
        )}
      </div>
    </div>
  );
}
