'use client';

import { PageHeader } from '@/components/common/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';

export default function ShowcasePage() {
  const [selectedTab, setSelectedTab] = useState('buttons');

  return (
    <div className="space-y-8">
      <PageHeader
        title="shadcn 컴포넌트 전시"
        description="설치된 모든 shadcn 컴포넌트의 미리보기입니다."
      />

      <Tabs
        defaultValue="buttons"
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="buttons">버튼</TabsTrigger>
          <TabsTrigger value="badges">배지</TabsTrigger>
          <TabsTrigger value="inputs">입력</TabsTrigger>
          <TabsTrigger value="cards">카드</TabsTrigger>
          <TabsTrigger value="layout">레이아웃</TabsTrigger>
        </TabsList>

        {/* 버튼 */}
        <TabsContent value="buttons">
          <Card>
            <CardHeader>
              <CardTitle>버튼 변형</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>기본</Button>
                <Button variant="secondary">보조</Button>
                <Button variant="destructive">위험</Button>
                <Button variant="outline">아웃라인</Button>
                <Button variant="ghost">유령</Button>
                <Button disabled>비활성화</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">작음</Button>
                <Button size="lg">큼</Button>
                <Button size="icon">✓</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 배지 */}
        <TabsContent value="badges">
          <Card>
            <CardHeader>
              <CardTitle>배지 변형</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge>기본</Badge>
              <Badge variant="secondary">보조</Badge>
              <Badge variant="destructive">위험</Badge>
              <Badge variant="outline">아웃라인</Badge>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 입력 */}
        <TabsContent value="inputs">
          <Card>
            <CardHeader>
              <CardTitle>입력 필드</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="일반 입력"
              />
              <textarea
                className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="여러 줄 입력"
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* 카드 */}
        <TabsContent value="cards">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>기본 카드</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  카드는 컨텐츠를 그룹화하는 기본 단위입니다.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>또 다른 카드</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  여러 카드를 나열할 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 레이아웃 */}
        <TabsContent value="layout">
          <Card>
            <CardHeader>
              <CardTitle>상태 표시</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>완료됨</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="h-5 w-5 text-yellow-500" />
                <span>진행 중</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="h-5 w-5 text-red-500" />
                <span>오류</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
