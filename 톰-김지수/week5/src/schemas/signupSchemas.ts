import { z } from "zod";

const email = z.string().email("올바른 이메일 형식이 아닙니다.");
const password = z
  .string()
  .min(6, "비밀번호는 6자 이상이어야 합니다.")
  .max(50, "비밀번호가 너무 깁니다.");

export const stepSchemas = [
  z.object({ email }),
  z.object({
    password,
    confirmPassword: z.string(),
  }).refine((val) => val.password === val.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  }),
  z.object({
    name: z.string().min(2, "이름은 2자 이상").max(20, "이름은 20자 이하"),
  }),
] as const;
