import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Globe, Clock, Phone, Wifi, Star, CheckCircle } from 'lucide-react';

interface RoamingPass {
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
  isPopular?: boolean;
}

interface RoamingPassListProps {
  passes: RoamingPass[];
  onPurchase: (passId: string) => Promise<void>;
  isRoamingEnabled: boolean;
}

export const RoamingPassList: React.FC<RoamingPassListProps> = ({
  passes,
  onPurchase,
  isRoamingEnabled,
}) => {
  const [selectedPass, setSelectedPass] = useState<RoamingPass | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async (pass: RoamingPass) => {
    setIsPurchasing(true);
    try {
      await onPurchase(pass.id);
      setSelectedPass(null);
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!isRoamingEnabled) {
    return (
      <Card className="bg-white/10 border-white/20 shadow-elevated text-white">
        <CardContent className="p-6 text-center">
          <div className="text-white/70">
            <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium text-white mb-2">Roaming Disabled</p>
            <p className="text-sm">Enable roaming to view and purchase data packages</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Available Roaming Packages</h3>
        <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
          {passes.length} packages available
        </Badge>
      </div>

      <div className="grid gap-4">
        {passes.map((pass) => (
          <Card 
            key={pass.id} 
            className={`relative bg-white/10 border-white/20 shadow-elevated text-white transition-all hover:shadow-lg ${
              pass.recommended ? 'ring-2 ring-primary/50' : ''
            }`}
          >
            {pass.recommended && (
              <div className="absolute -top-2 left-4">
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="h-3 w-3 mr-1" />
                  Recommended
                </Badge>
              </div>
            )}
            
            {pass.isPopular && (
              <div className="absolute -top-2 right-4">
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  🔥 Popular
                </Badge>
              </div>
            )}

            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{pass.name}</CardTitle>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-400">CHF {pass.price}</div>
                  <div className="text-xs text-white/60">one-time</div>
                </div>
              </div>
              <CardDescription className="text-white/70">
                Perfect for {pass.validity} trips with generous data allowance
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Package Details */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-sm font-medium text-white">{pass.data}</div>
                    <div className="text-xs text-white/60">Data</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-sm font-medium text-white">{pass.calls}</div>
                    <div className="text-xs text-white/60">Calls</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-sm font-medium text-white">{pass.validity}</div>
                    <div className="text-xs text-white/60">Valid</div>
                  </div>
                </div>
              </div>

              {/* Regions */}
              <div>
                <div className="text-sm font-medium text-white mb-2">Coverage</div>
                <div className="flex flex-wrap gap-1">
                  {pass.regions.slice(0, 3).map((region) => (
                    <Badge key={region} variant="outline" className="text-xs border-white/20 text-white/70">
                      {region}
                    </Badge>
                  ))}
                  {pass.regions.length > 3 && (
                    <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                      +{pass.regions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Features */}
              <div>
                <div className="text-sm font-medium text-white mb-2">Features</div>
                <div className="space-y-1">
                  {pass.features.slice(0, 2).map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-white/70">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Purchase Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full" 
                    variant="accent"
                    onClick={() => setSelectedPass(pass)}
                  >
                    Purchase Package
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gomo-dark border-white/20 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-white">Confirm Purchase</DialogTitle>
                    <DialogDescription className="text-white/70">
                      You're about to purchase the {selectedPass?.name} package
                    </DialogDescription>
                  </DialogHeader>
                  
                  {selectedPass && (
                    <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-white">{selectedPass.name}</span>
                          <span className="font-bold text-yellow-400">CHF {selectedPass.price}</span>
                        </div>
                        <div className="text-sm text-white/70 space-y-1">
                          <div>• {selectedPass.data} of data</div>
                          <div>• {selectedPass.calls} calls</div>
                          <div>• Valid for {selectedPass.validity}</div>
                          <div>• Coverage: {selectedPass.regions.join(', ')}</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-white/60">
                        This package will be activated immediately and charged to your account.
                      </div>
                    </div>
                  )}

                  <DialogFooter className="gap-4">
                    <Button 
                      variant="outline" 
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                      onClick={() => setSelectedPass(null)}
                      disabled={isPurchasing}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="accent"
                      onClick={() => selectedPass && handlePurchase(selectedPass)}
                      disabled={isPurchasing}
                    >
                      {isPurchasing ? 'Processing...' : `Confirm Purchase`}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};