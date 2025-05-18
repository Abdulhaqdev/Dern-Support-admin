import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  change?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon,
  change,
  className,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {change && (
          <div className="flex items-center space-x-1">
            <span
              className={cn(
                "text-xs",
                change.positive ? "text-green-500" : "text-red-500"
              )}
            >
              {change.positive ? "+" : "-"}{change.value}%
            </span>
            <span className="text-xs text-muted-foreground">
{"              O'tgan davrga nisbatan"}            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}