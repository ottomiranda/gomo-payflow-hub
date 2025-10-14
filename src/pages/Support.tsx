import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Search, MessageCircle, Phone, Mail, HelpCircle, FileText, Settings } from "lucide-react";
import { BottomNavbar } from "@/components/layout/BottomNavbar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";

const Support = () => {
  const supportOptions = [
    { icon: MessageCircle, title: "Live Chat", description: "Chat with our support team", action: "Start Chat" },
    { icon: Phone, title: "Call Us", description: "+41 800 123 456", action: "Call Now" },
    { icon: Mail, title: "Email Support", description: "support@gomo.ch", action: "Send Email" },
  ];

  const faqTopics = [
    { icon: HelpCircle, title: "Account & Billing", count: 12 },
    { icon: FileText, title: "Plans & Features", count: 8 },
    { icon: Settings, title: "Technical Issues", count: 15 },
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
          <h1 className="text-2xl font-bold">Support Center</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search for help..." 
            className="pl-10 h-12 text-base bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        {/* Contact Options */}
        <Card className="gradient-magenta text-white shadow-elevated">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Contact Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {supportOptions.map((option, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 rounded-full p-3">
                    <option.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{option.title}</p>
                    <p className="text-sm text-white/80">{option.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* FAQ Topics */}
        <Card className="bg-white/10 border-white/20 shadow-elevated text-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Browse Help Topics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {faqTopics.map((topic, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 rounded-full p-3">
                    <topic.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{topic.title}</p>
                    <p className="text-sm text-white/70">{topic.count} articles</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white/10 border-white/20 shadow-card text-white">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 text-white">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10" size="lg">
                <FileText className="h-5 w-5 mr-3" />
                View Recent Tickets
              </Button>
              <Button variant="outline" className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10" size="lg">
                <Settings className="h-5 w-5 mr-3" />
                Report Technical Issue
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavbar />
    </div>
  );
};

export default Support;
