// src/components/signup/ProfileStep.tsx
import React from "react";

interface ProfileStepProps {
  email: string;
  nickname: string;
  setNickname: (v: string) => void;
  onComplete: () => void;
}

const ProfileStep: React.FC<ProfileStepProps> = ({
  email,
  nickname,
  setNickname,
  onComplete,
}) => {
  const isValid = nickname.trim() !== "";

  return (
    <>
      <h2 className="signup-title">프로필 설정</h2>
      <p className="signup-sub">이메일: {email}</p>

      <div className="avatar-box">
        <div className="avatar-circle">🙂</div>
        <p className="avatar-text">
          프로필 이미지는 나중에 설정할 수 있어요.
        </p>
      </div>

      <div className="field">
        <label className="label">닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요."
        />
      </div>

      <button
        className="next-button"
        disabled={!isValid}
        onClick={onComplete}
      >
        회원가입 완료
      </button>
    </>
  );
};

export default ProfileStep;
