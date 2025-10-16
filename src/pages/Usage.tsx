import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Smartphone, MessageSquare, Phone, Globe } from "lucide-react";
import { BottomNavbar } from "@/components/layout/BottomNavbar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";

// Custom Progress component with yellow bar and white transparent background
const CustomProgress = ({ value }: { value: number }) => (
  <div className="relative h-4 w-full overflow-hidden rounded-full bg-white/50">
    <div 
      className="h-full bg-yellow-400 transition-all duration-300 ease-out rounded-full"
      style={{ width: `${value}%` }}
    />
  </div>
);

const Usage = () => {
  const usageData = [
    {
      name: "Alex Santos",
      mobileData: { used: 5.5, total: 10, unit: "GB" },
      text: { used: 56, total: 3500, unit: "SMS" },
      minutes: { used: 122, total: 4000, unit: "Min" }
    },
    {
      name: "Maria Santos",
      mobileData: { used: 8.2, total: 10, unit: "GB" },
      text: { used: 134, total: 3500, unit: "SMS" },
      minutes: { used: 456, total: 4000, unit: "Min" }
    },
    {
      name: "João Santos",
      mobileData: { used: 2.1, total: 10, unit: "GB" },
      text: { used: 12, total: 3500, unit: "SMS" },
      minutes: { used: 78, total: 4000, unit: "Min" }
    }
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
          <h1 className="text-2xl font-bold">Usage Details</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24">
        <p className="text-white/80">
          View detailed usage information for all family members.
        </p>

        {usageData.map((member, index) => (
          <Card key={index} className="bg-white/10 border-white/20 shadow-elevated text-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                <div className="bg-white/20 rounded-full p-2">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                {member.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Mobile Data */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-white" />
                    <span className="font-semibold text-white">Mobile Data</span>
                  </div>
                  <span className="text-sm text-white/70">
                    {member.mobileData.used} / {member.mobileData.total} {member.mobileData.unit}
                  </span>
                </div>
                <CustomProgress value={(member.mobileData.used / member.mobileData.total) * 100} />
              </div>

              {/* Text Messages */}
              <div className="space-y-3 pt-2 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-white" />
                    <span className="font-semibold text-white">Text Messages</span>
                  </div>
                  <span className="text-sm text-white/70">
                    {member.text.used} / {member.text.total} {member.text.unit}
                  </span>
                </div>
                <CustomProgress value={(member.text.used / member.text.total) * 100} />
              </div>

              {/* Minutes */}
              <div className="space-y-3 pt-2 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-white" />
                    <span className="font-semibold text-white">Call Minutes</span>
                  </div>
                  <span className="text-sm text-white/70">
                    {member.minutes.used} / {member.minutes.total} {member.minutes.unit}
                  </span>
                </div>
                <CustomProgress value={(member.minutes.used / member.minutes.total) * 100} />
              </div>
            </CardContent>
          </Card>
        ))}
      </main>

      <BottomNavbar />
    </div>
  );
};

export default Usage;
