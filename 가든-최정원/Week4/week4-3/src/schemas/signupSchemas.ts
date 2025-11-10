import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력해주세요."),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  name: z.string().optional(),
});

export const passwordSchema = z
  .object({
    email: z.string().optional(),
    password: z
      .string()
      .min(6, "비밀번호는 6자 이상이어야 합니다.")
      .max(64, "비밀번호가 너무 깁니다."),
    confirmPassword: z.string(),
    name: z.string().optional(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const nameSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  name: z
    .string()
    .min(2, "이름은 2자 이상 입력해주세요.")
    .max(20, "이름은 20자 이하로 입력해주세요."),
});

export const stepSchemas = [emailSchema, passwordSchema, nameSchema];
