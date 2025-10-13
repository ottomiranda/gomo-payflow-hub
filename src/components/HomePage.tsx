import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { 
  CreditCard, 
  FileText,
  Settings,
  Bell,
  Globe,
  MessageCircle
} from "lucide-react";

export function HomePage() {
  // Mock data
  const userData = {
    name: "Alex",
    dataUsed: 12.5,
    dataTotal: 20,
    currentBalance: 25.90,
    dueDate: "15 Nov 2025",
    planName: "GoMo Europe",
    planPrice: 19.95,
    renewalDate: "1 Dec 2025",
    hasAlert: true
  };

  const dataPercentage = (userData.dataUsed / userData.dataTotal) * 100;

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-purple text-white p-6 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Welcome back</p>
            <h1 className="text-2xl font-bold">{greeting}, {userData.name}</h1>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Settings className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Alert Banner */}
      {userData.hasAlert && (
        <div className="max-w-md mx-auto p-6">
          <Card className="border-accent bg-accent shadow-elevated">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="bg-accent-foreground/10 rounded-full p-2">
                <Bell className="h-5 w-5 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-accent-foreground mb-1">Bill Due Soon</p>
                <p className="text-sm text-accent-foreground/80">Your bill of CHF {userData.currentBalance} is due on {userData.dueDate}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <main className="max-w-md mx-auto px-6 pb-8 space-y-6">
        {/* Data Usage Card */}
        <Card className="shadow-elevated hover:shadow-hover transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Data Usage</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-6">
            <ProgressRing progress={dataPercentage} size={150} strokeWidth={12} />
            <p className="mt-6 text-base font-semibold text-foreground">{userData.dataUsed} GB of {userData.dataTotal} GB used</p>
            <p className="text-sm text-muted-foreground mt-1">Unlimited calls & SMS in Switzerland</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/billing" className="block">
                <Button variant="outline" className="w-full h-auto flex-col gap-3 py-6 hover:border-primary hover:bg-primary/5 transition-all">
                  <div className="bg-primary/10 rounded-full p-3">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-semibold">Pay Bill</span>
                </Button>
              </Link>
              <Button variant="outline" className="w-full h-auto flex-col gap-3 py-6 hover:border-primary hover:bg-primary/5 transition-all">
                <div className="bg-primary/10 rounded-full p-3">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-semibold">Roaming</span>
              </Button>
              <Link to="/billing/invoice" className="block">
                <Button variant="outline" className="w-full h-auto flex-col gap-3 py-6 hover:border-primary hover:bg-primary/5 transition-all">
                  <div className="bg-primary/10 rounded-full p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-semibold">Invoice</span>
                </Button>
              </Link>
              <Button variant="outline" className="w-full h-auto flex-col gap-3 py-6 hover:border-primary hover:bg-primary/5 transition-all">
                <div className="bg-primary/10 rounded-full p-3">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-semibold">Support</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing Summary */}
        <Card className="border-2 border-primary shadow-elevated hover:shadow-hover transition-all">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Current Bill</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="text-5xl font-bold text-primary mb-2">CHF {userData.currentBalance}</p>
              <p className="text-base text-muted-foreground mb-3">Due on {userData.dueDate}</p>
              <div className="inline-block px-4 py-1.5 bg-warning text-accent-foreground rounded-full text-sm font-bold">
                Due Soon
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/billing" className="flex-1">
                <Button className="w-full" variant="accent" size="lg">Pay Now</Button>
              </Link>
              <Link to="/billing/invoice">
                <Button variant="outline" size="lg">View Details</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Plan Info Card */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Your Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-bold text-lg mb-1">{userData.planName}</p>
                <p className="text-sm text-muted-foreground">Unlimited data in Europe</p>
              </div>
              <p className="text-2xl font-bold text-accent">CHF {userData.planPrice}</p>
            </div>
            <p className="text-sm text-muted-foreground">Next renewal: {userData.renewalDate}</p>
            <Button variant="outline" className="w-full" size="lg">Modify Plan</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}