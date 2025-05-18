import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getStatusColor, getStatusTranslation } from "@/lib/mock-data";
import type { TicketStatus, AppointmentStatus, QuoteStatus } from "@/lib/mock-data";

interface StatusBadgeProps {
  status: TicketStatus | AppointmentStatus | QuoteStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colorClass = getStatusColor(status);
  const label = getStatusTranslation(status);

  return (
    <Badge 
      className={cn("font-medium", colorClass, className)}
    >
      {label}
    </Badge>
  );
}