import { Home, MessageCircle, CreditCard, BarChart3, Crown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useNavigation } from "@/contexts/NavigationContext";
import { cn } from "@/lib/utils";

// Navbar items in the requested order: Home, Billing, Chat, Usage, My Plan
const navItems = [
  { id: "home", label: "Home", icon: Home, path: "/" },
  { id: "billing", label: "Billing", icon: CreditCard, path: "/billing" },
  { id: "usage", label: "Usage", icon: BarChart3, path: "/usage" },
  { id: "my-plan", label: "My Plan", icon: Crown, path: "/my-plan" },
];

export const BottomNavbar = () => {
  const location = useLocation();
  const { unreadMessages, overdueBills } = useNavigation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-32px)] max-w-[428px] -translate-x-1/2">
      <div className="relative">
        {/* Main navbar with integrated notch */}
        <div className="relative h-[75px] rounded-[28px] border border-white/10 bg-gomo-dark shadow-[0_18px_40px_rgba(7,9,24,0.45)]">
          {/* Central notch cut-out */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-10 bg-transparent">
            <div className="w-full h-full bg-gomo-dark rounded-b-[40px] border-t-0"></div>
          </div>
          
          {/* Central chat button integrated in the notch */}
          <Link to="/chat" className="absolute top-[-20px] left-1/2 -translate-x-1/2 z-20 group">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gomo-magenta via-gomo-purple to-gomo-purple shadow-[0_12px_45px_rgba(233,30,140,0.55)] transition-all duration-300 group-hover:shadow-[0_16px_55px_rgba(233,30,140,0.75)] group-hover:scale-105" />
              <div className="absolute inset-0 rounded-full border border-white/25 group-hover:border-white/40 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="h-7 w-7" />
              </div>
            </div>
          </Link>

          {/* Navigation items with grouped spacing */}
          <div className="relative z-10 flex h-full items-center justify-between px-4">
            {/* Grupo esquerdo: Home e Billing próximos */}
            <div className="flex items-center space-x-2">
              {navItems.slice(0, 2).map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="flex flex-col items-center justify-center py-3 px-2 min-w-[55px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gomo-magenta/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg group transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center justify-center mb-1.5">
                      <Icon 
                        className={cn(
                          "h-6 w-6 transition-all duration-300 group-hover:scale-110",
                          active ? "text-gomo-magenta" : "text-white/60 group-hover:text-gomo-magenta"
                        )} 
                      />
                    </div>
                    <span
                      className={cn(
                        "text-[11px] font-medium leading-tight text-center transition-all duration-300",
                        active ? "text-gomo-magenta" : "text-white/60 group-hover:text-gomo-magenta"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Espaço maior para destacar o botão central */}
            <div className="flex-1"></div>

            {/* Grupo direito: Usage e My Plan próximos */}
            <div className="flex items-center space-x-2">
              {navItems.slice(2, 4).map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="flex flex-col items-center justify-center py-3 px-2 min-w-[55px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gomo-magenta/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg group transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center justify-center mb-1.5">
                      <Icon 
                        className={cn(
                          "h-6 w-6 transition-all duration-300 group-hover:scale-110",
                          active ? "text-gomo-magenta" : "text-white/60 group-hover:text-gomo-magenta"
                        )} 
                      />
                    </div>
                    <span
                      className={cn(
                        "text-[11px] font-medium leading-tight text-center transition-all duration-300",
                        active ? "text-gomo-magenta" : "text-white/60 group-hover:text-gomo-magenta"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
