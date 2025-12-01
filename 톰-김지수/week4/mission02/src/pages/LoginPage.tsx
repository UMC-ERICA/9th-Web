import type { FormEvent} from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // 에러 메시지는 “입력이 있고 + 유효하지 않을 때”만 보여주도록
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isPasswordValid = password.length >= 6

  const showEmailError = email.length > 0 && !isEmailValid
  const showPasswordError = password.length > 0 && !isPasswordValid

  const isFormValid = isEmailValid && isPasswordValid

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    // TODO: 실제 로그인 처리 로직
    console.log("로그인 시도!", { email, password })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        {/* 상단 바 + 뒤로가기 버튼 */}
        <div className="mb-6 flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 text-lg"
          >
            {"<"}
          </button>
          <h1 className="text-lg font-semibold">로그인</h1>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이메일 */}
          <div>
            <label className="mb-1 block text-sm font-medium">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            {showEmailError && (
              <p className="mt-1 text-xs text-red-500">
                유효하지 않은 이메일 형식입니다.
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="mb-1 block text-sm font-medium">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
            />
            {showPasswordError && (
              <p className="mt-1 text-xs text-red-500">
                비밀번호는 최소 6자 이상이어야 합니다.
              </p>
            )}
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`mt-4 w-full rounded-md py-2 text-sm font-semibold
            ${
              isFormValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
            }`}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  )
}
