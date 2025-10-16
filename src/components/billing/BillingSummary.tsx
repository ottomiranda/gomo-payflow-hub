import { Link } from "react-router-dom";
import { LinkWithScroll } from "@/components/ui/link-with-scroll";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { BottomNavbar } from "@/components/layout/BottomNavbar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";
import { AutoPayCard } from "@/components/billing/AutoPayCard";

export function BillingSummary() {
  const billData = {
    amount: 25.90,
    dueDate: "31 Oct 2025",
    status: "unpaid" as const,
    autoPayEnabled: false,
    invoiceMonth: "October 2025"
  };

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
          <h1 className="text-2xl font-bold">Billing Summary</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-6 space-y-6 pb-24">
        {/* Amount Due Card */}
        <Card className="bg-white/10 border-white/20 shadow-elevated text-white">
          <CardContent className="p-8 space-y-6">
            <div>
              <p className="text-sm text-white/80 mb-2">Amount Due</p>
              <p className="text-6xl mb-2">
                <span className="font-sans text-white">CHF </span>
                <span className="font-rounded font-extrabold text-accent">{billData.amount}</span>
              </p>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-white/20">
              <div>
                <p className="text-base font-semibold mb-2">Payment Status</p>
                <div className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-bold">
                  Unpaid
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold mb-1">Due Date</p>
                <p className="text-base text-white/80">{billData.dueDate}</p>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <LinkWithScroll to="/billing/payment-method" className="flex-1">
                <Button className="w-full" variant="accent" size="lg">Pay Now</Button>
              </LinkWithScroll>
              <LinkWithScroll to="/billing/invoice">
                <Button variant="outline" size="lg" className="bg-white/5 border-white/20 text-white hover:bg-white/10">View Details</Button>
              </LinkWithScroll>
            </div>
          </CardContent>
        </Card>

        {/* Auto-Pay Status */}
        <AutoPayCard />

        {/* Recent Payments */}
        <Card className="bg-white/10 border-white/20 shadow-elevated text-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {[
                { date: "Sep 2025", fullDate: "Paid on 1 Oct 2025", amount: 19.95, method: "Visa" },
                { date: "Aug 2025", fullDate: "Paid on 1 Sep 2025", amount: 19.95, method: "TWINT" },
              ].map((payment, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-white/10 last:border-0">
                  <div>
                    <p className="font-semibold text-base text-white">{payment.date}</p>
                    <p className="text-sm text-white/80">{payment.fullDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-white">CHF {payment.amount}</p>
                    <p className="text-sm text-success font-medium">Paid ({payment.method})</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavbar />
    </div>
  );
}