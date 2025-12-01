import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForem";

const Loginpage = () => {
  const navigate = useNavigate();
  const { values, errors, handleChange, validate } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    if (validate()) {
      alert("로그인 성공!");
      navigate("/"); // 홈으로 이동
    }
  };

  const isValid = values.email && values.password && Object.keys(errors).length === 0;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-50">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-2xl text-gray-600 hover:text-black"
      >
        ←
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">로그인</h1>

      <div className="flex flex-col gap-3">
        {/* 이메일 입력 */}
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          type="email"
          placeholder="이메일"
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff] ${
            errors.email ? "border-red-500" : "border-[#ccc]"
          }`}
        />
        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

        {/* 비밀번호 입력 */}
        <input
          name="password"
          value={values.password}
          onChange={handleChange}
          type="password"
          placeholder="비밀번호"
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff] ${
            errors.password ? "border-red-500" : "border-[#ccc]"
          }`}
        />
        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

        {/* 로그인 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full p-2 rounded-md text-white font-semibold transition ${
            isValid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Loginpage;
