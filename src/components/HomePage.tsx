import { Link } from "react-router-dom";
import { LinkWithScroll } from "@/components/ui/link-with-scroll";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Progress } from "@/components/ui/progress";
import useEmblaCarousel from "embla-carousel-react";
import { 
  CreditCard, 
  FileText,
  Menu,
  Bell,
  Globe,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { BottomNavbar } from "@/components/layout/BottomNavbar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";
import { useNavigation } from "@/contexts/NavigationContext";

type UsageTab = 'mobileData' | 'text' | 'minutes';

interface FamilyMember {
  id: number;
  name: string;
  mobileData: { used: number; total: number; renewDate: string };
  text: { used: number; total: number; renewDate: string };
  minutes: { used: number; total: number; renewDate: string };
}

export function HomePage() {
  const { setDrawerOpen } = useNavigation();
  const [activeTab, setActiveTab] = useState<UsageTab>('mobileData');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  // Função para trocar de tab e resetar o carousel para o primeiro slide
  const handleTabChange = (tab: UsageTab) => {
    setActiveTab(tab);
    if (emblaApi) {
      emblaApi.scrollTo(0);
    }
  };
  
  // Mock data
  const userData = {
    name: "Alex",
    dataUsed: 12.5,
    dataTotal: 20,
    currentBalance: 25.90,
    dueDate: "31 October 2025",
    planName: "GoMo Family",
    planPrice: 25,
    renewalDate: "31 October 2025",
    hasAlert: true
  };

  const familyMembers: FamilyMember[] = [
    {
      id: 1,
      name: "Alex Santos",
      mobileData: { used: 5.5, total: 10, renewDate: "31 Oct 2025" },
      text: { used: 56, total: 3500, renewDate: "31 Oct 2025" },
      minutes: { used: 122, total: 4000, renewDate: "31 Oct 2025" }
    },
    {
      id: 2,
      name: "Maria Santos",
      mobileData: { used: 8.2, total: 10, renewDate: "31 Oct 2025" },
      text: { used: 134, total: 3500, renewDate: "31 Oct 2025" },
      minutes: { used: 456, total: 4000, renewDate: "31 Oct 2025" }
    },
    {
      id: 3,
      name: "João Santos",
      mobileData: { used: 2.1, total: 10, renewDate: "31 Oct 2025" },
      text: { used: 12, total: 3500, renewDate: "31 Oct 2025" },
      minutes: { used: 78, total: 4000, renewDate: "31 Oct 2025" }
    }
  ];

  const dataPercentage = (userData.dataUsed / userData.dataTotal) * 100;

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";

  const renderUsageContent = (member: FamilyMember) => {
    let data, unit, label, available;
    
    switch(activeTab) {
      case 'mobileData':
        data = member.mobileData;
        unit = 'GB';
        label = 'Mobile data';
        available = `${data.total}GB available`;
        break;
      case 'text':
        data = member.text;
        unit = 'SMS';
        label = 'Text';
        available = `${data.total.toLocaleString()} SMS available`;
        break;
      case 'minutes':
        data = member.minutes;
        unit = 'Min';
        label = 'Minutes';
        available = `${data.total.toLocaleString()} Min available`;
        break;
    }
    
    const percentage = (data.used / data.total) * 100;
    const usedDisplay = activeTab === 'mobileData' ? data.used : data.used.toLocaleString();
    const totalDisplay = activeTab === 'mobileData' ? data.total : data.total.toLocaleString();
    
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 space-y-4 min-w-[280px] shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
            {member.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-white">{member.name}</h4>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">{label}</h3>
          <p className="text-sm text-white/80 font-medium">Renews on {data.renewDate}</p>
          <p className="text-base font-semibold text-white">{available}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Progress value={percentage} className="flex-1 h-2 bg-white/20" />
            <span className="text-sm font-bold text-white ml-3">{Math.round(percentage)}%</span>
          </div>
          <p className="text-sm text-white/90 font-medium">
            Used: {usedDisplay} {unit} of {totalDisplay} {unit}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gomo-dark pb-20">
      {/* Header */}
        <header className="gradient-purple text-white py-8 px-6">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Welcome back</p>
            <h1 className="text-2xl font-bold">{greeting}, {userData.name}</h1>
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
        {/* Billing Summary */}
        <div className="gradient-deep-purple rounded-2xl p-6 text-white">
          <h2 className="text-xl font-extrabold mb-6">Current Bill</h2>
          <div className="space-y-5">
            <div>
              <p className="text-5xl mb-2">
                <span className="font-sans text-white">CHF </span>
                <span className="font-rounded font-extrabold text-white">{userData.currentBalance}</span>
              </p>
              <p className="text-base text-white/80 mb-3 font-medium">Due on {userData.dueDate}</p>
              
            </div>
            <div className="flex gap-3">
              <LinkWithScroll to="/billing" className="flex-1">
                <button className="w-full border border-white bg-accent hover:bg-accent/90 text-gomo-purple font-bold py-3 px-6 rounded-full transition-colors">
                  Pay Now
                </button>
              </LinkWithScroll>
              <LinkWithScroll to="/billing/invoice">
                <button className="border border-white text-white hover:bg-white/10 font-bold py-3 px-6 rounded-full transition-colors">
                  View Details
                </button>
              </LinkWithScroll>
            </div>
          </div>
        </div>

        {/* Data Usage Card with Carousel */}
        <div className="gradient-magenta rounded-2xl p-6 text-white">
          {/* Header with Tabs and See All */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => handleTabChange('mobileData')}
                className={`pb-2 text-sm font-bold transition-all ${
                  activeTab === 'mobileData'
                    ? 'text-white border-b-2 border-white'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                Mobile data
              </button>
              <button
                onClick={() => handleTabChange('text')}
                className={`pb-2 text-sm font-bold transition-all ${
                  activeTab === 'text'
                    ? 'text-white border-b-2 border-white'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                Text
              </button>
              <button
                onClick={() => handleTabChange('minutes')}
                className={`pb-2 text-sm font-bold transition-all ${
                  activeTab === 'minutes'
                    ? 'text-white border-b-2 border-white'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                Minutes
              </button>
            </div>
            <button className="flex items-center gap-1 text-white/80 hover:text-white text-sm font-medium transition-colors">
              See all
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            {/* Padrão Embla: container com -ml e cada slide com pl para espaçamento consistente */}
            <div className="flex -ml-4">
              {familyMembers.map((member) => (
                <div key={member.id} className="pl-4">
                  {renderUsageContent(member)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-extrabold mb-4 text-white px-1">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <LinkWithScroll to="/billing" className="block">
              <button className="w-full bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center gap-3 hover:gradient-magenta-purple hover:border-transparent transition-all group">
                <div className="bg-primary/20 group-hover:bg-white/20 rounded-full p-3 transition-colors">
                  <CreditCard className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-bold text-white">Pay Bill</span>
              </button>
            </LinkWithScroll>
            <button className="w-full bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center gap-3 hover:gradient-magenta-purple hover:border-transparent transition-all group">
              <div className="bg-primary/20 group-hover:bg-white/20 rounded-full p-3 transition-colors">
                <Globe className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm font-bold text-white">Roaming</span>
            </button>
            <LinkWithScroll to="/billing/invoice" className="block">
              <button className="w-full bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center gap-3 hover:gradient-magenta-purple hover:border-transparent transition-all group">
                <div className="bg-primary/20 group-hover:bg-white/20 rounded-full p-3 transition-colors">
                  <FileText className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-bold text-white">Invoice</span>
              </button>
            </LinkWithScroll>
            <LinkWithScroll to="/support" className="block">
              <button className="w-full bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center gap-3 hover:gradient-magenta-purple hover:border-transparent transition-all group">
                <div className="bg-primary/20 group-hover:bg-white/20 rounded-full p-3 transition-colors">
                  <MessageCircle className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-bold text-white">Support</span>
              </button>
            </LinkWithScroll>
          </div>
        </div>

        {/* Plan Info Card */}
        <div className="gradient-gomo-blue rounded-2xl p-6 text-white">
          <h2 className="text-xl font-extrabold mb-6">Current Plan</h2>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-bold text-xl mb-1 text-white">{userData.planName}</p>
                <p className="text-sm text-white/80 font-medium">3 lines included</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-[hsl(45,100%,51%)]">CHF {userData.planPrice}</p>
                <p className="text-sm text-white/80 font-medium">/month</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-white/80 font-medium">Next billing date</p>
              <p className="text-base font-semibold text-white">{userData.renewalDate}</p>
            </div>
            <button className="w-full border border-white text-white hover:bg-white/10 font-bold py-3 px-6 rounded-full transition-colors">
              View All Plans
            </button>
          </div>
        </div>
      </main>

      {/* Navigation Components */}
      <NavigationDrawer />
      <BottomNavbar />
    </div>
  );
}