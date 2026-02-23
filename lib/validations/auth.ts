import { z } from 'zod';

// 로그인 스키마
export const loginSchema = z.object({
  email: z
    .string('이메일은 필수입니다.')
    .min(1, '이메일은 필수입니다.')
    .email('유효한 이메일 주소를 입력하세요.'),
  password: z
    .string('비밀번호는 필수입니다.')
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// 회원가입 스키마
export const signupSchema = z
  .object({
    name: z
      .string('이름은 필수입니다.')
      .min(2, '이름은 최소 2자 이상이어야 합니다.')
      .max(50, '이름은 50자 이하여야 합니다.'),
    email: z
      .string('이메일은 필수입니다.')
      .email('유효한 이메일 주소를 입력하세요.'),
    password: z
      .string('비밀번호는 필수입니다.')
      .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        '비밀번호는 영문과 숫자를 모두 포함해야 합니다.'
      ),
    confirmPassword: z.string('비밀번호 확인은 필수입니다.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignupInput = z.infer<typeof signupSchema>;
