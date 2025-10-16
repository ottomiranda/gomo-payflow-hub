import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Wifi, WifiOff } from 'lucide-react';

interface RoamingToggleProps {
  isEnabled: boolean;
  isLoading: boolean;
  onToggle: (enabled: boolean) => void;
}

export const RoamingToggle: React.FC<RoamingToggleProps> = ({
  isEnabled,
  isLoading,
  onToggle,
}) => {
  const handleToggle = async (checked: boolean) => {
    onToggle(checked);
  };

  return (
    <Card className="mb-6 bg-white/10 border-white/20 shadow-elevated text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          {isEnabled ? (
            <Wifi className="h-5 w-5 text-green-400" />
          ) : (
            <WifiOff className="h-5 w-5 text-white/60" />
          )}
          Roaming Control
        </CardTitle>
        <CardDescription className="text-white/70">
          Enable or disable international roaming to control costs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-white">
              Status: {isEnabled ? 'Active' : 'Inactive'}
            </p>
            <p className="text-xs text-white/70">
              {isEnabled 
                ? 'You can use data abroad' 
                : 'Data blocked abroad'
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
            <Switch
              checked={isEnabled}
              onCheckedChange={handleToggle}
              disabled={isLoading}
            />
          </div>
        </div>
        
        {isEnabled && (
          <Alert className="mt-4 border-yellow-400/30 bg-yellow-400/10">
            <AlertDescription className="text-yellow-100">
              ⚠️ Warning: Active roaming may generate additional costs. 
              Monitor your usage regularly.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default RoamingToggle;