import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력해주세요."),
});

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, "비밀번호는 6자 이상이어야 합니다.")
      .max(64, "비밀번호가 너무 길어요."),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 2자 이상 입력해주세요.")
    .max(20, "닉네임은 20자 이하로 입력해주세요."),
});

// 스텝별로 사용할 스키마를 배열로 제공
export const stepSchemas = [emailSchema, passwordSchema, profileSchema];
