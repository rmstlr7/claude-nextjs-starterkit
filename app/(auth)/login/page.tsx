import { LoginForm } from '@/components/sections/LoginForm';
import { AuthTemplate } from '@/components/templates/AuthTemplate';

export const metadata = {
  title: '로그인',
  description: '계정에 로그인하세요.',
};

export default function LoginPage() {
  return (
    <AuthTemplate
      title="로그인"
      description="계정에 로그인하여 시작하세요."
    >
      <LoginForm />
    </AuthTemplate>
  );
}
