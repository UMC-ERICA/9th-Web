import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepSchemas } from "../schemas/signupSchemas";
import type { SignupFormValues } from "../utils/user";
import { useLocalStorage } from "../hooks/useLocalStorage";

const INITIAL: SignupFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  nickname: "",
};

const LABEL = ["이메일 입력", "비밀번호 설정", "닉네임 설정"];

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [_, setLocal] = useLocalStorage<SignupFormValues>("signup-draft", INITIAL);

  // 비밀번호 가시성 토글
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  // 스텝별 스키마 변경 (react-hook-form이 동적으로 resolver를 받아도 동작함)
  const resolver = useMemo(() => zodResolver(stepSchemas[step]), [step]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<SignupFormValues>({
    defaultValues: INITIAL,
    resolver,
    mode: "onChange", // 입력과 동시에 유효성 갱신 → 버튼 활성/비활성 제어
  });

  const onNext = () => {
    // 현재 스텝의 값만 검증되고 있으므로, isValid가 true면 다음으로
    if (step < 2) setStep((s) => (s + 1) as 0 | 1 | 2);
  };

  const onPrev = () => {
    if (step > 0) setStep((s) => (s - 1) as 0 | 1 | 2);
    else navigate(-1);
  };

  const onSubmit = (all: SignupFormValues) => {
    // 마지막 스텝에서만 호출됨 (아래 form에서 분기)
    // 여기서는 서버로 전송하는 대신 localStorage에 저장하고 홈으로 이동
    setLocal(all);
    alert("회원가입이 완료되었습니다!");
    navigate("/");
  };

  // 공통 버튼 컴포넌트 스타일
  const btn = "w-full py-2 rounded-md font-semibold transition disabled:cursor-not-allowed";
  const btnPrimary = "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400";
  const inputBase =
    "border w-[320px] p-[10px] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#807bff]";
  const errorText = "text-red-500 text-sm mt-1";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="relative w-full max-w-md bg-white shadow-md rounded-xl p-6">
        {/* 상단 네비게이션 */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onPrev}
            className="text-2xl text-gray-600 hover:text-black"
            aria-label="뒤로가기"
          >
            ←
          </button>
          <div className="text-sm text-gray-500">{step + 1} / 3</div>
        </div>

        <h1 className="text-xl font-bold mb-2">{LABEL[step]}</h1>

        {/* 상단 요약(2,3단계에서 이전 입력 보여주기) */}
        {step >= 1 && (
          <div className="mb-3 text-sm text-gray-600">
            <span className="font-medium">이메일</span>: {getValues("email") || "-"}
          </div>
        )}

        <form
          onSubmit={
            step === 2
              ? handleSubmit(onSubmit) // 마지막 단계는 제출
              : (e) => {
                  e.preventDefault();
                  // 중간 단계는 "다음" 동작만
                  if (isValid) onNext();
                }
          }
          className="flex flex-col gap-3"
        >
          {/* STEP 1: 이메일 */}
          {step === 0 && (
            <>
              <input
                type="email"
                placeholder="이메일"
                className={`${inputBase} ${errors.email ? "border-red-500" : "border-[#ccc]"}`}
                {...register("email")}
              />
              {errors.email && <p className={errorText}>{errors.email.message}</p>}

              <button type="submit" disabled={!isValid} className={`${btn} ${btnPrimary} mt-2`}>
                다음
              </button>
            </>
          )}

          {/* STEP 2: 비밀번호/재확인 + 토글 */}
          {step === 1 && (
            <>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="비밀번호 (6자 이상)"
                  className={`${inputBase} ${
                    errors.password ? "border-red-500" : "border-[#ccc]"
                  } pr-10`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                >
                  {showPw ? "숨기기" : "보기"}
                </button>
              </div>
              {errors.password && <p className={errorText}>{errors.password.message}</p>}

              <div className="relative">
                <input
                  type={showPw2 ? "text" : "password"}
                  placeholder="비밀번호 재확인"
                  className={`${inputBase} ${
                    errors.confirmPassword ? "border-red-500" : "border-[#ccc]"
                  } pr-10`}
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw2((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                >
                  {showPw2 ? "숨기기" : "보기"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className={errorText}>{errors.confirmPassword.message}</p>
              )}

              <div className="mt-1 flex gap-2">
                <button type="button" onClick={onPrev} className={`${btn} bg-gray-200`}>
                  이전
                </button>
                <button type="submit" disabled={!isValid} className={`${btn} ${btnPrimary}`}>
                  다음
                </button>
              </div>
            </>
          )}

          {/* STEP 3: 닉네임 + (선택) 프로필 이미지 UI */}
          {step === 2 && (
            <>
              {/* (선택) 프로필 자리 UI – 실제 업로드 기능 없이 시각 요소만 */}
              <div className="w-full flex justify-center mb-1">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  IMG
                </div>
              </div>

              <input
                type="text"
                placeholder="닉네임 (2~20자)"
                className={`${inputBase} ${
                  errors.nickname ? "border-red-500" : "border-[#ccc]"
                }`}
                {...register("nickname")}
              />
              {errors.nickname && <p className={errorText}>{errors.nickname.message}</p>}

              <div className="mt-1 flex gap-2">
                <button type="button" onClick={onPrev} className={`${btn} bg-gray-200`}>
                  이전
                </button>
                <button type="submit" disabled={!isValid} className={`${btn} ${btnPrimary}`}>
                  회원가입 완료
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
