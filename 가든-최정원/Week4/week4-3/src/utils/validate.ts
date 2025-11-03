export type UserSigninInformation = {
  email: string;
  password: string;
};

export function validateUser(valuesL: UserSigninInformation) {
  const errors = {
    email: "",
    password: "",
  };

  // 이메일 형식 검사
  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      valuesL.email // ✅ 올바른 참조
    )
  ) {
    errors.email = "올바른 이메일 형식이 아닙니다!";
  }

  // 비밀번호 길이 검사
  if (!(valuesL.password.length >= 8 && valuesL.password.length < 20)) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요";
  }

  return errors;
}
