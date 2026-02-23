import { SignupForm } from '@/components/sections/SignupForm';
import { AuthTemplate } from '@/components/templates/AuthTemplate';

export const metadata = {
  title: '회원가입',
  description: '새 계정을 만드세요.',
};

export default function SignupPage() {
  return (
    <AuthTemplate
      title="회원가입"
      description="새 계정을 만들어 시작하세요."
    >
      <SignupForm />
    </AuthTemplate>
  );
}
