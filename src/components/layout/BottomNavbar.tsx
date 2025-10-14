import { Home, BarChart3, MessageCircle, CreditCard, Smartphone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useNavigation } from "@/contexts/NavigationContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", label: "Home", icon: Home, path: "/" },
  { id: "usage", label: "Usage", icon: BarChart3, path: "/usage" },
  { id: "support", label: "Support", icon: MessageCircle, path: "/support" },
  { id: "billing", label: "Billing", icon: CreditCard, path: "/billing" },
  { id: "plan", label: "My Plan", icon: Smartphone, path: "/my-plan" },
];

export const BottomNavbar = () => {
  const location = useLocation();
  const { unreadMessages, overdueBills } = useNavigation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gomo-dark border-t border-white/10 navbar-enter">
      <div className="flex items-center justify-around h-16 px-2 relative">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const isSupport = item.id === "support";
          const showBadge =
            (item.id === "billing" && overdueBills) ||
            (item.id === "support" && unreadMessages > 0);

          // Support item (center) - FAB style
          if (isSupport) {
            return (
              <Link
                key={item.id}
                to={item.path}
                className="flex flex-col items-center justify-center relative"
              >
                <div
                  className={cn(
                    "absolute -top-6 w-14 h-14 rounded-full flex items-center justify-center",
                    "gradient-magenta-purple shadow-lg transition-all duration-300",
                    active && "scale-110",
                    unreadMessages > 0 && "support-fab-glow bounce-notification"
                  )}
                >
                  <Icon className="h-6 w-6 text-white" />
                  {showBadge && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full px-1 text-xs"
                    >
                      {unreadMessages}
                    </Badge>
                  )}
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium mt-6 transition-colors",
                    active ? "text-[#E91E8C]" : "text-white/60"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          }

          // Regular nav items
          return (
            <Link
              key={item.id}
              to={item.path}
              className="flex flex-col items-center justify-center min-w-[44px] min-h-[44px] relative group"
            >
              <div className="relative">
                <Icon
                  className={cn(
                    "h-6 w-6 transition-colors",
                    active ? "text-[#E91E8C]" : "text-white/60 group-hover:text-white/80"
                  )}
                />
                {showBadge && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium mt-1 transition-colors",
                  active ? "text-[#E91E8C]" : "text-white/60 group-hover:text-white/80"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
