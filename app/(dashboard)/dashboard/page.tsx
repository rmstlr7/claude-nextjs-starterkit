import { PageHeader } from '@/components/common/PageHeader';
import { StatsCards } from '@/components/sections/StatsCards';
import { Activity, LineChart, TrendingUp } from 'lucide-react';

export const metadata = {
  title: '대시보드',
  description: '핵심 통계 및 활동을 한눈에 확인하세요.',
};

export default function DashboardPage() {
  // 더미 데이터
  const activities = [
    { id: 1, user: '홍길동', action: '새 사용자 가입', timestamp: '2분 전' },
    { id: 2, user: '김영희', action: '프로필 수정', timestamp: '5분 전' },
    { id: 3, user: '이순신', action: '주문 완료', timestamp: '15분 전' },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="대시보드"
        description="핵심 통계 및 활동을 한눈에 확인하세요."
      />

      {/* 통계 카드 */}
      <StatsCards />

      {/* 차트 섹션 */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <LineChart className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">판매 추이</h3>
          </div>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            차트 영역 (recharts 연동)
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">전환율</h3>
          </div>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            차트 영역 (recharts 연동)
          </div>
        </div>
      </div>

      {/* 최근 활동 */}
      <div className="rounded-lg border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">최근 활동</h3>
        </div>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between border-b pb-3 last:border-b-0"
            >
              <div>
                <p className="text-sm font-medium">{activity.user}</p>
                <p className="text-xs text-muted-foreground">{activity.action}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {activity.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
