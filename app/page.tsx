import { redirect } from 'next/navigation';

export default function HomePage() {
  // 대시보드로 자동 리다이렉트
  redirect('/dashboard');
}
