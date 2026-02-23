import { StatCard } from '@/components/common/StatCard';
import { BarChart3, TrendingUp, Users, Zap } from 'lucide-react';

interface StatsCardsProps {
  data?: {
    totalUsers: number;
    totalRevenue: number;
    totalOrders: number;
    totalConversions: number;
  };
}

const DEFAULT_STATS = {
  totalUsers: 1250,
  totalRevenue: 45231,
  totalOrders: 821,
  totalConversions: 12.5,
};

export function StatsCards({ data = DEFAULT_STATS }: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="전체 사용자"
        value={data.totalUsers.toLocaleString()}
        description="+20.1% 지난 달 대비"
        icon={Users}
        trend="up"
        trendValue={20.1}
      />
      <StatCard
        title="총 매출"
        value={`$${data.totalRevenue.toLocaleString()}`}
        description="+15% 지난 달 대비"
        icon={TrendingUp}
        trend="up"
        trendValue={15}
      />
      <StatCard
        title="주문 수"
        value={data.totalOrders.toLocaleString()}
        description="+5% 지난 달 대비"
        icon={BarChart3}
        trend="up"
        trendValue={5}
      />
      <StatCard
        title="전환율"
        value={`${data.totalConversions}%`}
        description="-2.5% 지난 달 대비"
        icon={Zap}
        trend="down"
        trendValue={2.5}
      />
    </div>
  );
}
