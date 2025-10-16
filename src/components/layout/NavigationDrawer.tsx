import { User, Settings, Gift, CreditCard, HelpCircle, FileText, LogOut, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigation } from "@/contexts/NavigationContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const menuItems = [
  { id: "profile", label: "Profile & Account", icon: User, path: "#" },
  { id: "settings", label: "Settings", icon: Settings, path: "#" },
  { id: "refer", label: "Refer a Friend", icon: Gift, path: "#" },
  { id: "payment", label: "Payment Methods", icon: CreditCard, path: "/billing/payment-method" },
  { id: "help", label: "Help Center", icon: HelpCircle, path: "#" },
  { id: "legal", label: "Legal & Privacy", icon: FileText, path: "#" },
];

export const NavigationDrawer = () => {
  const { drawerOpen, setDrawerOpen, currentLine, setCurrentLine, availableLines } = useNavigation();

  const handleLogout = () => {
    toast({
      title: "Logout",
      description: "Logout functionality - Coming Soon",
    });
  };

  const handleUpgrade = () => {
    toast({
      title: "Upgrade Plan",
      description: "Plan upgrade functionality - Coming Soon",
    });
  };

  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent side="left" className="w-80 bg-[#1A1A1A] border-white/10 p-0">
        {/* Header with gradient */}
        <SheetHeader className="gradient-purple p-6 space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-white/20 text-white text-lg font-bold">
                AS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <SheetTitle className="text-white text-lg font-bold">Alex Santos</SheetTitle>
              <p className="text-white/80 text-sm mt-1">{currentLine}</p>
            </div>
          </div>

          {/* Line Switcher */}
          {availableLines.length > 1 && (
            <Select value={currentLine} onValueChange={setCurrentLine}>
              <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableLines.map((line) => (
                  <SelectItem key={line} value={line}>
                    {line}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </SheetHeader>

        {/* Menu Items */}
        <div className="flex flex-col py-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const showSeparator = index === 2 || index === 5;

            return (
              <div key={item.id}>
                {item.path === "#" ? (
                  <button
                    onClick={() => {
                      toast({
                        title: item.label,
                        description: "Feature coming soon",
                      });
                    }}
                    className="w-full flex items-center gap-4 px-6 py-4 text-white hover:bg-white/10 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-4 px-6 py-4 text-white hover:bg-white/10 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )}
                {showSeparator && <Separator className="my-2 bg-white/10" />}
              </div>
            );
          })}

          <Separator className="my-2 bg-white/10" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 text-white hover:bg-white/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        {/* CTA Button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1A1A1A] to-transparent">
          <Button
            onClick={handleUpgrade}
            className="w-full gradient-magenta text-white font-bold py-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            Upgrade Plan
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
