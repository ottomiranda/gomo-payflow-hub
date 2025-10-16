import React, { useState } from 'react';
import { ArrowLeft, Wifi, WifiOff, AlertTriangle, CheckCircle, Globe, Menu, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RoamingToggle } from '@/components/roaming/RoamingToggle';
import { RoamingUsageMeter } from '@/components/roaming/RoamingUsageMeter';
import { RoamingPassList } from '@/components/roaming/RoamingPassList';
import { useNavigation } from '@/contexts/NavigationContext';
import { BottomNavbar } from '@/components/layout/BottomNavbar';
import { NavigationDrawer } from '@/components/layout/NavigationDrawer';

export interface RoamingPass {
  id: string;
  name: string;
  data: string;
  calls: string;
  validity: string;
  price: number;
  currency: string;
  regions: string[];
  features: string[];
  recommended?: boolean;
}

export interface RoamingUsage {
  dataUsed: number;
  dataTotal: number;
  costCurrent: number;
  costEstimated: number;
  currency: string;
  activePass?: string;
  savings?: number;
}

export function RoamingManagementScreen() {
  const { setDrawerOpen } = useNavigation();
  const [isRoamingEnabled, setIsRoamingEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const roamingUsage: RoamingUsage = {
    dataUsed: 2.5,
    dataTotal: 10,
    costCurrent: 15.50,
    costEstimated: 45.00,
    currency: 'CHF',
    activePass: 'Europe Travel Pass',
    savings: 29.50
  };

  const roamingPasses: RoamingPass[] = [
    {
      id: '1',
      name: 'Europe Travel Pass',
      data: '5GB',
      calls: 'Unlimited',
      validity: '7 days',
      price: 25,
      currency: 'CHF',
      regions: ['EU', 'UK', 'Switzerland'],
      features: ['High-speed data', 'Free calls', 'SMS included'],
      recommended: true
    },
    {
      id: '2',
      name: 'Global Roaming',
      data: '3GB',
      calls: '100 min',
      validity: '30 days',
      price: 45,
      currency: 'CHF',
      regions: ['Worldwide'],
      features: ['Global coverage', 'Data rollover', '24/7 support']
    },
    {
      id: '3',
      name: 'Weekend Getaway',
      data: '2GB',
      calls: '50 min',
      validity: '3 days',
      price: 15,
      currency: 'CHF',
      regions: ['EU'],
      features: ['Quick activation', 'Perfect for short trips']
    }
  ];

  const handleRoamingToggle = async (enabled: boolean) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRoamingEnabled(enabled);
    setIsLoading(false);
  };

  const handlePurchasePass = async (passId: string) => {
    // Simulate purchase process
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`Purchased pass: ${passId}`);
  };

  return (
    <div className="min-h-screen bg-gomo-dark pb-20">
      {/* Header */}
      <header className="gradient-purple text-white py-8 px-6">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-white" />
              <h1 className="text-xl font-bold">Roaming Management</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Bell className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Roaming Control */}
        <RoamingToggle
          isEnabled={isRoamingEnabled}
          isLoading={isLoading}
          onToggle={handleRoamingToggle}
        />

        {/* Usage Meter */}
        {isRoamingEnabled && (
          <RoamingUsageMeter usage={roamingUsage} />
        )}

        {/* Roaming Passes */}
        <RoamingPassList
          passes={roamingPasses}
          onPurchase={handlePurchasePass}
          isRoamingEnabled={isRoamingEnabled}
        />
      </main>

      {/* Navigation Components */}
      <NavigationDrawer />
      <BottomNavbar />
    </div>
  );
}

export default RoamingManagementScreen;