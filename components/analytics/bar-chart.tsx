"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "next-themes";

interface BarChartProps {
  data: { name: string; value: number }[];
  title: string;
  description?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  className?: string;
}

export function BarChart({
  data,
  title,
  description,
  xAxisLabel,
  yAxisLabel,
  className,
}: BarChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const formattedData = data.map(item => ({
    name: item.name,
    value: item.value
  }));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 
              />
              <XAxis 
                dataKey="name" 
                label={{ 
                  value: xAxisLabel, 
                  position: "insideBottom", 
                  offset: -15,
                  style: { fill: isDark ? "#e1e1e1" : "#333" } 
                }}
                tick={{ fill: isDark ? "#e1e1e1" : "#333" }} 
              />
              <YAxis 
                label={{ 
                  value: yAxisLabel, 
                  angle: -90, 
                  position: "insideLeft",
                  style: { fill: isDark ? "#e1e1e1" : "#333" } 
                }}
                tick={{ fill: isDark ? "#e1e1e1" : "#333" }} 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1f2937" : "#fff",
                  border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                  color: isDark ? "#e1e1e1" : "#333",
                }}
              />
              <Legend />
              <Bar 
                dataKey="value" 
                name="Miqdor" 
                fill="hsl(var(--chart-1))" 
                radius={[4, 4, 0, 0]} 
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}