import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { 
  Phone, 
  MessageSquare, 
  CreditCard, 
  HelpCircle,
  Plane,
  FileText,
  Settings,
  Bell
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gomo-purple text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">GoMo</h1>
            <p className="text-sm opacity-90">Hi, {userData.name}!</p>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-4 pb-20">
        {/* Alert Banner */}
        {userData.hasAlert && (
          <Card className="bg-warning border-warning shadow-card">
            <CardContent className="p-4 flex items-start gap-3">
              <Bell className="h-5 w-5 text-warning-foreground flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-warning-foreground">Bill Due Soon</p>
                <p className="text-sm text-warning-foreground/90">Your bill of CHF {userData.currentBalance} is due on {userData.dueDate}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Data Usage Card */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Data Usage</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex-1">
              <ProgressRing progress={dataPercentage} />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <p className="text-3xl font-bold">{userData.dataUsed} GB</p>
                <p className="text-sm text-muted-foreground">of {userData.dataTotal} GB used</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Unlimited calls & SMS in Switzerland
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-1">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-3">
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-4 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-base"
              asChild
            >
              <Link to="/billing">
                <CreditCard className="h-6 w-6" />
                <span className="text-xs">Pay Bill</span>
              </Link>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-4 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-base"
            >
              <Plane className="h-6 w-6" />
              <span className="text-xs">Roaming</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-4 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-base"
              asChild
            >
              <Link to="/billing/invoice">
                <FileText className="h-6 w-6" />
                <span className="text-xs">Invoice</span>
              </Link>
            </Button>
            
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 p-4 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-base"
            >
              <HelpCircle className="h-6 w-6" />
              <span className="text-xs">Support</span>
            </Button>
          </div>
        </div>

        {/* Billing Summary Card */}
        <Card className="shadow-card border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Bill</span>
              <span className="text-warning text-sm font-normal">Due {userData.dueDate}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-4xl font-bold text-primary">CHF {userData.currentBalance}</p>
              <p className="text-sm text-muted-foreground mt-1">Amount due</p>
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
              asChild
            >
              <Link to="/billing">Pay Now</Link>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full"
              asChild
            >
              <Link to="/billing/invoice">View Invoice Details</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Plan Info Card */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Your Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-lg">{userData.planName}</p>
                <p className="text-sm text-muted-foreground">Unlimited data in Europe</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">CHF {userData.planPrice}</p>
                <p className="text-xs text-muted-foreground">/month</p>
              </div>
            </div>
            
            <div className="pt-3 border-t space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>Unlimited calls & SMS in CH</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span>20 GB high-speed roaming in EU</span>
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-xs text-muted-foreground">
                Next renewal: {userData.renewalDate}
              </p>
            </div>
            
            <Button variant="outline" className="w-full">
              Modify Plan
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
