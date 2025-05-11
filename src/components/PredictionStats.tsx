
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatItemProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
}

function StatItem({ label, value, change, icon }: StatItemProps) {
  return (
    <div className="flex items-start gap-4">
      {icon && (
        <div className="rounded-lg bg-betting-accent/10 p-2">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold">{value}</p>
          {change && (
            <p className={cn(
              "text-xs",
              change.isPositive ? "text-betting-win" : "text-betting-loss"
            )}>
              {change.isPositive ? '+' : ''}{change.value}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PredictionStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-betting-card border-betting-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
        </CardHeader>
        <CardContent>
          <StatItem
            label="Last 7 Days"
            value="78%"
            change={{ value: 2.5, isPositive: true }}
          />
        </CardContent>
      </Card>
      
      <Card className="bg-betting-card border-betting-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <StatItem
            label="All Time"
            value="1,248"
            change={{ value: 24, isPositive: true }}
          />
        </CardContent>
      </Card>
      
      <Card className="bg-betting-card border-betting-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Highest Confidence</CardTitle>
        </CardHeader>
        <CardContent>
          <StatItem
            label="Today's Games"
            value="92%"
            change={{ value: 4, isPositive: true }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
