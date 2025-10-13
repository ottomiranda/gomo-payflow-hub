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
    <div className="min-h-screen bg-gomo-dark">
      {/* Header */}
      <header className="gradient-magenta-purple text-white py-8 px-6">
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
          <div className="bg-[hsl(45,100%,51%)] rounded-2xl shadow-xl p-5 flex items-start gap-4">
            <div className="bg-black/10 rounded-full p-3">
              <Bell className="h-6 w-6 text-black" />
            </div>
            <div className="flex-1">
              <p className="font-extrabold text-black mb-1">Bill Due Soon</p>
              <p className="text-sm text-black/80 font-medium">Your bill of CHF {userData.currentBalance} is due on {userData.dueDate}</p>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-md mx-auto px-6 pb-8 space-y-6">
        {/* Data Usage Card */}
        <div className="gradient-magenta rounded-2xl p-6 text-white">
          <h2 className="text-xl font-extrabold mb-6">Data Usage</h2>
          <div className="flex flex-col items-center py-6">
            <div className="relative inline-flex items-center justify-center">
              <svg width={150} height={150} className="transform -rotate-90">
                <circle
                  cx={75}
                  cy={75}
                  r={67}
                  stroke="white"
                  strokeWidth={12}
                  fill="none"
                  className="opacity-30"
                />
                <circle
                  cx={75}
                  cy={75}
                  r={67}
                  stroke="white"
                  strokeWidth={12}
                  fill="none"
                  strokeDasharray={421}
                  strokeDashoffset={421 - (dataPercentage / 100) * 421}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{Math.round(dataPercentage)}%</span>
              </div>
            </div>
            <p className="mt-6 text-lg font-bold text-white">{userData.dataUsed} GB of {userData.dataTotal} GB used</p>
            <p className="text-sm text-white/80 mt-1 font-medium">Unlimited calls & SMS in Switzerland</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-extrabold mb-4 text-white px-1">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/billing" className="block">
              <button className="w-full bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center gap-3 hover:gradient-magenta-purple hover:border-transparent transition-all group">
                <div className="bg-primary/20 group-hover:bg-white/20 rounded-full p-3 transition-colors">
                  <CreditCard className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-bold text-white">Pay Bill</span>
              </button>
            </Link>
            <button className="w-full bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center gap-3 hover:gradient-magenta-purple hover:border-transparent transition-all group">
              <div className="bg-primary/20 group-hover:bg-white/20 rounded-full p-3 transition-colors">
                <Globe className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm font-bold text-white">Roaming</span>
            </button>
            <Link to="/billing/invoice" className="block">
              <button className="w-full bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center gap-3 hover:gradient-magenta-purple hover:border-transparent transition-all group">
                <div className="bg-primary/20 group-hover:bg-white/20 rounded-full p-3 transition-colors">
                  <FileText className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-bold text-white">Invoice</span>
              </button>
            </Link>
            <button className="w-full bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center gap-3 hover:gradient-magenta-purple hover:border-transparent transition-all group">
              <div className="bg-primary/20 group-hover:bg-white/20 rounded-full p-3 transition-colors">
                <MessageCircle className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm font-bold text-white">Support</span>
            </button>
          </div>
        </div>

        {/* Billing Summary */}
        <div className="gradient-deep-purple rounded-2xl p-6 text-white">
          <h2 className="text-xl font-extrabold mb-6">Current Bill</h2>
          <div className="space-y-5">
            <div>
              <p className="text-5xl font-bold text-white mb-2">CHF {userData.currentBalance}</p>
              <p className="text-base text-white/80 mb-3 font-medium">Due on {userData.dueDate}</p>
              <div className="inline-block px-5 py-2 bg-[hsl(45,100%,51%)] text-black rounded-full text-sm font-extrabold">
                Due Soon
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/billing" className="flex-1">
                <button className="w-full bg-[hsl(45,100%,51%)] hover:bg-[hsl(45,100%,46%)] text-black font-bold py-3 px-6 rounded-lg transition-colors">
                  Pay Now
                </button>
              </Link>
              <Link to="/billing/invoice">
                <button className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 rounded-lg transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Plan Info Card */}
        <div className="gradient-gomo-blue rounded-2xl p-6 text-white">
          <h2 className="text-xl font-extrabold mb-6">Your Plan</h2>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-bold text-xl mb-1 text-white">{userData.planName}</p>
                <p className="text-sm text-white/80 font-medium">Unlimited data in Europe</p>
              </div>
              <p className="text-3xl font-extrabold text-[hsl(45,100%,51%)]">CHF {userData.planPrice}</p>
            </div>
            <p className="text-sm text-white/80 font-medium">Next renewal: {userData.renewalDate}</p>
            <button className="w-full border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 rounded-lg transition-colors">
              Modify Plan
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}