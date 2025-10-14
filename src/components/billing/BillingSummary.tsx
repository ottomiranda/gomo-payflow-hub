import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { BottomNavbar } from "@/components/layout/BottomNavbar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";

export function BillingSummary() {
  const billData = {
    amount: 25.90,
    dueDate: "15 Nov 2025",
    status: "unpaid" as const,
    autoPayEnabled: false,
    invoiceMonth: "October 2025"
  };

  return (
    <div className="min-h-screen bg-background">
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
        <Card className="border-2 border-primary shadow-elevated hover:shadow-hover transition-all">
          <CardContent className="p-8 space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Amount Due</p>
              <p className="text-6xl font-bold text-primary mb-2">CHF {billData.amount}</p>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-border">
              <div>
                <p className="text-base font-semibold mb-2">Payment Status</p>
                <div className="inline-block px-4 py-1.5 bg-warning text-accent-foreground rounded-full text-sm font-bold">
                  Unpaid
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold mb-1">Due Date</p>
                <p className="text-base text-muted-foreground">{billData.dueDate}</p>
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <Link to="/billing/payment-method" className="flex-1">
                <Button className="w-full" variant="accent" size="lg">Pay Now</Button>
              </Link>
              <Link to="/billing/invoice">
                <Button variant="outline" size="lg">View Details</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Auto-Pay Status */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Auto-Pay</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div className="flex-1">
                <p className="font-semibold text-base mb-1">Automatic Payments</p>
                <p className="text-sm text-muted-foreground">Currently inactive</p>
              </div>
              <div className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm font-semibold">Off</div>
            </div>
            <Button variant="default" className="w-full" size="lg">Enable Auto-Pay</Button>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {[
                { date: "Sep 2025", fullDate: "Paid on 1 Oct 2025", amount: 19.95, method: "Visa" },
                { date: "Aug 2025", fullDate: "Paid on 1 Sep 2025", amount: 19.95, method: "TWINT" },
              ].map((payment, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b last:border-0">
                  <div>
                    <p className="font-semibold text-base">{payment.date}</p>
                    <p className="text-sm text-muted-foreground">{payment.fullDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">CHF {payment.amount}</p>
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