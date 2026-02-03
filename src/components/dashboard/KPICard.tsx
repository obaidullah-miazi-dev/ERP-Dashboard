import { ReactNode } from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  period?: string;
  icon: LucideIcon;
  iconColor?: string;
  loading?: boolean;
}

export function KPICard({
  title,
  value,
  change,
  period,
  icon: Icon,
  iconColor = "text-primary",
  loading = false,
}: KPICardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  if (loading) {
    return (
      <div className="kpi-card">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="skeleton h-4 w-24" />
            <div className="skeleton h-8 w-32" />
            <div className="skeleton h-4 w-20" />
          </div>
          <div className="skeleton h-12 w-12 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="kpi-card group">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl md:text-3xl font-bold tracking-tight animate-number-tick">
            {typeof value === "number"
              ? value.toLocaleString("en-US", {
                  style:
                    title.toLowerCase().includes("revenue") ||
                    title.toLowerCase().includes("spent")
                      ? "currency"
                      : "decimal",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })
              : value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-2 mt-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
                  isPositive && "trend-up",
                  isNegative && "trend-down",
                  !isPositive &&
                    !isNegative &&
                    "text-muted-foreground bg-muted",
                )}
              >
                {isPositive && <TrendingUp className="w-3 h-3" />}
                {isNegative && <TrendingDown className="w-3 h-3" />}
                {isPositive && "+"}
                {change}%
              </span>
              {period && (
                <span className="text-xs text-muted-foreground">{period}</span>
              )}
            </div>
          )}
        </div>
        <div
          className={cn(
            "p-3 rounded-xl bg-gradient-to-br",
            "from-primary/10 to-accent/10",
          )}
        >
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
      </div>
    </div>
  );
}
