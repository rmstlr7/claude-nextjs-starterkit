import { Button } from '@/components/ui/button';
import { APP_ROUTES } from '@/constants/routes';
import Link from 'next/link';

export const metadata = {
  title: '404 - 페이지를 찾을 수 없습니다',
  description: '요청한 페이지를 찾을 수 없습니다.',
};

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold">404</h1>
        <h2 className="mb-2 text-2xl font-semibold">페이지를 찾을 수 없습니다</h2>
        <p className="mb-8 text-muted-foreground">
          요청하신 페이지가 존재하지 않거나 삭제되었을 수 있습니다.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href={APP_ROUTES.DASHBOARD.HOME}>
            <Button>대시보드로 이동</Button>
          </Link>
          <Link href={APP_ROUTES.PUBLIC.HOME}>
            <Button variant="outline">홈으로</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
