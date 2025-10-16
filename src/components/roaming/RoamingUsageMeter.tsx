import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Shield } from 'lucide-react';

interface RoamingUsage {
  // Preferidos pelo componente
  dataUsed?: number;
  dataLimit?: number;
  costIncurred?: number;
  costLimit?: number;
  activePackage?: string;
  estimatedSavings?: number;
  // Alternativos vindos de outras telas
  dataTotal?: number;
  costCurrent?: number;
  costEstimated?: number;
  activePass?: string;
  savings?: number;
  currency?: string;
}

interface RoamingUsageMeterProps {
  usage: RoamingUsage;
}

export const RoamingUsageMeter: React.FC<RoamingUsageMeterProps> = ({ usage }) => {
  // Mapear e normalizar valores com defaults seguros
  const currency = usage.currency ?? 'CHF';
  const dataUsed = usage.dataUsed ?? usage.dataTotal ?? 0;
  const dataLimit = usage.dataLimit ?? usage.dataTotal ?? 0;
  const costIncurred = usage.costIncurred ?? usage.costCurrent ?? 0;
  const costLimit = usage.costLimit ?? usage.costEstimated ?? 0;
  const activePackage = usage.activePackage ?? usage.activePass;
  const estimatedSavings = usage.estimatedSavings ?? usage.savings ?? 0;

  // Se os valores parecerem em GB (ex.: 2.5, 10), converter para MB para o formatador atual
  const convertGBToMBIfLikely = (value: number): number => {
    // Heurística simples: valores típicos de GB são <= 100
    return value > 0 && value <= 100 ? value * 1024 : value;
  };

  const dataUsedMB = convertGBToMBIfLikely(dataUsed);
  const dataLimitMB = convertGBToMBIfLikely(dataLimit);

  const formatDataUsage = (mb: number): string => {
    if (!isFinite(mb) || mb < 0) return '0 MB';
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb.toFixed(0)} MB`;
  };

  const usagePercentage = dataLimitMB > 0 
    ? Math.min((dataUsedMB / dataLimitMB) * 100, 100) 
    : 0;

  const costPercentage = costLimit > 0 
    ? Math.min((costIncurred / costLimit) * 100, 100) 
    : 0;

  const getCostAlertLevel = (): 'low' | 'medium' | 'high' => {
    if (costPercentage >= 80) return 'high';
    if (costPercentage >= 60) return 'medium';
    return 'low';
  };

  const alertLevel = getCostAlertLevel();

  return (
    <Card className="mb-6 bg-white/10 border-white/20 shadow-elevated text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <BarChart3 className="h-5 w-5 text-primary" />
          Roaming Usage Monitor
        </CardTitle>
        <CardDescription className="text-white/70">
          Track your data usage and costs to avoid bill shock
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Data Usage */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white">Data Usage</span>
            <span className="text-sm text-white/70">
              {formatDataUsage(dataUsedMB)} / {formatDataUsage(dataLimitMB)}
            </span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div 
              className="h-full bg-yellow-400 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/60">
            <span>{usagePercentage.toFixed(1)}% used</span>
            <span>{formatDataUsage(Math.max(dataLimitMB - dataUsedMB, 0))} remaining</span>
          </div>
        </div>

        {/* Cost Tracking */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white">Cost Incurred</span>
            <span className="text-sm font-semibold text-white">
              {currency} {costIncurred.toFixed(2)} / {currency} {costLimit.toFixed(2)}
            </span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div 
              className="h-full bg-yellow-400 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${costPercentage}%` }}
            />
          </div>
        </div>

        {/* Active Package Info */}
        {activePackage && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-sm font-medium text-green-400">
                Active Package: <span className="font-semibold text-green-300">{activePackage}</span>
              </span>
            </div>
            {estimatedSavings > 0 && (
              <div className="flex justify-center">
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Saved {currency} {estimatedSavings.toFixed(2)}
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Cost Alert */}
        {alertLevel === 'high' && (
          <Alert className="border-red-400/30 bg-red-400/10">
            <AlertDescription className="text-red-300">
              🚨 High cost alert! You've used {costPercentage.toFixed(0)}% 
              of your cost limit. Consider purchasing a roaming package.
            </AlertDescription>
          </Alert>
        )}

        {alertLevel === 'medium' && (
          <Alert className="border-yellow-400/30 bg-yellow-400/10">
            <AlertDescription className="text-yellow-100">
              ⚠️ Moderate usage detected. You've spent {currency} {costIncurred.toFixed(2)} 
              on roaming. Monitor your usage to avoid unexpected charges.
            </AlertDescription>
          </Alert>
        )}

        {/* Usage Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="text-lg font-semibold text-white">
              {formatDataUsage(dataUsedMB)}
            </div>
            <div className="text-xs text-white/60">Used Today</div>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="text-lg font-semibold text-white">
              {currency} {costIncurred.toFixed(2)}
            </div>
            <div className="text-xs text-white/60">Total Cost</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};