import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

interface AuthTemplateProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AuthTemplate({
  title,
  description,
  children,
}: AuthTemplateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <div className="px-6 pb-6">{children}</div>
      </Card>
    </div>
  );
}
