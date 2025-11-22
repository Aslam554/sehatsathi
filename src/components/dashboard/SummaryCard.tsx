import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SummaryCardProps {
  title: string;
  icon: LucideIcon;
  value: string | number;
  description: string;
  status?: 'ok' | 'low' | 'critical';
  actionLabel?: string;
  actionLink?: string;
}

const SummaryCard = ({
  title,
  icon: Icon,
  value,
  description,
  status,
  actionLabel,
  actionLink,
}: SummaryCardProps) => {
  const getStatusColor = () => {
    if (!status) return 'text-foreground';
    switch (status) {
      case 'ok':
        return 'text-success';
      case 'low':
        return 'text-warning';
      case 'critical':
        return 'text-destructive';
      default:
        return 'text-foreground';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="bg-accent p-2 rounded-lg">
          <Icon className="h-4 w-4 text-accent-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${getStatusColor()}`}>{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {actionLabel && actionLink && (
          <Button asChild variant="outline" size="sm" className="mt-4 w-full">
            <Link to={actionLink}>{actionLabel}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
