import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Check, Zap, Users, Globe, Shield } from "lucide-react";
import { BottomNavbar } from "@/components/layout/BottomNavbar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";

const MyPlan = () => {
  const planFeatures = [
    { icon: Globe, title: "Unlimited Data", description: "In Switzerland" },
    { icon: Users, title: "3 Family Lines", description: "Manage all together" },
    { icon: Shield, title: "EU Roaming", description: "10GB included" },
    { icon: Zap, title: "5G Network", description: "Ultra-fast speed" },
  ];

  const addOns = [
    { name: "Extra Roaming Data", price: "CHF 5.00/GB", active: false },
    { name: "International Calls", price: "CHF 10.00/month", active: false },
    { name: "Premium SMS", price: "CHF 0.30/SMS", active: true },
  ];

  return (
    <div className="min-h-screen bg-gomo-dark">
      <NavigationDrawer />
      
      {/* Header */}
        <header className="gradient-purple text-white p-6 sticky top-0 z-10 shadow-md">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">My Plan</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24">
        {/* Current Plan */}
        <Card className="gradient-deep-purple text-white shadow-elevated border-0">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/80 text-sm mb-2">Current Plan</p>
                <h2 className="text-3xl font-bold mb-1">GoMo Family</h2>
                <p className="text-white/90">3 lines included</p>
              </div>
              <div className="text-right">
                <p className="text-6xl">
                  <span className="font-sans text-white">CHF </span>
                  <span className="font-rounded font-extrabold">25</span>
                </p>
                <p className="text-white/80 text-sm">/month</p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/20">
              <p className="text-sm text-white/80 mb-2">Next billing date</p>
              <p className="text-lg font-semibold">31 October 2025</p>
            </div>
          </CardContent>
        </Card>

        {/* Plan Features */}
        <Card className="bg-white/10 border-white/20 shadow-elevated text-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Plan Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {planFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-3">
                <div className="bg-white/20 rounded-full p-3">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{feature.title}</p>
                  <p className="text-sm text-white/70">{feature.description}</p>
                </div>
                <Check className="h-5 w-5 text-[hsl(45,100%,51%)]" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Add-ons */}
        <Card className="bg-white/10 border-white/20 shadow-elevated text-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Available Add-ons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {addOns.map((addon, index) => (
              <div 
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  addon.active 
                    ? 'border-[hsl(45,100%,51%)] bg-[hsl(45,100%,51%)]/10' 
                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                } transition-all cursor-pointer`}
              >
                <div>
                  <p className="font-semibold text-white">{addon.name}</p>
                  <p className="text-sm text-white/70">{addon.price}</p>
                </div>
                {addon.active ? (
                  <span className="text-sm font-semibold text-[hsl(45,100%,51%)]">Active</span>
                ) : (
                  <Button size="sm" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">Add</Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upgrade CTA */}
        <Card className="gradient-magenta text-white shadow-elevated border-0">
          <CardContent className="p-8 text-center space-y-4">
            <h3 className="text-2xl font-bold">Upgrade to Premium</h3>
            <p className="text-white/90">
              Get unlimited international roaming and priority support for just CHF 10 more per month
            </p>
            <Button variant="secondary" size="lg" className="w-full bg-white text-primary hover:bg-white/90">
              Learn More
            </Button>
          </CardContent>
        </Card>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default MyPlan;
