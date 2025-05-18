import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getPriorityColor, getPriorityTranslation } from "@/lib/mock-data";
import type { TicketPriority } from "@/lib/mock-data";

interface PriorityBadgeProps {
  priority: TicketPriority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const colorClass = getPriorityColor(priority);
  const label = getPriorityTranslation(priority);

  return (
    <Badge 
      className={cn("font-medium", colorClass, className)}
    >
      {label}
    </Badge>
  );
}