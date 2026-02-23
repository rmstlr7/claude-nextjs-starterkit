import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex h-64 flex-col items-center justify-center space-y-4">
      {Icon && (
        <Icon className="h-12 w-12 text-muted-foreground opacity-50" />
      )}
      <div className="text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
      {children}
    </div>
  );
}
