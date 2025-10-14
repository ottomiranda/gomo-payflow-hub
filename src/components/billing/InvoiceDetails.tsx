import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Download } from "lucide-react";
import { BottomNavbar } from "@/components/layout/BottomNavbar";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";

export function InvoiceDetails() {
  const invoiceData = {
    invoiceNumber: "INV-2025-10-001",
    month: "October 2025",
    issueDate: "1 Oct 2025",
    dueDate: "15 Nov 2025",
    items: [
      { name: "GoMo Europe Plan", description: "Unlimited data in Europe", amount: 19.95 },
      { name: "Extra Roaming", description: "2GB used outside Europe zone", amount: 5.00 },
      { name: "Premium SMS", description: "3 premium SMS sent", amount: 0.95 }
    ],
    total: 25.90,
    paymentHistory: [
      { date: "1 Oct 2025", amount: 19.95, method: "Visa ****1234", status: "Paid" },
      { date: "1 Sep 2025", amount: 19.95, method: "TWINT", status: "Paid" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationDrawer />
      
      {/* Header */}
      <header className="gradient-purple text-white p-6 sticky top-0 z-10 shadow-md">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/billing">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold flex-1">Invoice Details</h1>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Download className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-6 pb-24">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-12 bg-muted p-1">
            <TabsTrigger value="details" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold">Details</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold">Payment History</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            {/* Invoice Info */}
            <Card className="shadow-elevated">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between py-2">
                  <span className="text-sm text-muted-foreground">Invoice Number</span>
                  <span className="font-semibold">{invoiceData.invoiceNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-t">
                  <span className="text-sm text-muted-foreground">Issue Date</span>
                  <span className="font-semibold">{invoiceData.issueDate}</span>
                </div>
                <div className="flex justify-between py-2 border-t">
                  <span className="text-sm text-muted-foreground">Due Date</span>
                  <span className="font-semibold">{invoiceData.dueDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Breakdown */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Invoice Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {invoiceData.items.map((item, index) => (
                  <div key={index} className="flex justify-between py-3 border-b last:border-0">
                    <div>
                      <span className="text-base font-medium block">{item.name}</span>
                      <span className="text-sm text-muted-foreground">{item.description}</span>
                      {item.name.includes("Extra") && (
                        <button className="text-primary text-sm ml-0 mt-1 font-semibold hover:underline block">Why this fee?</button>
                      )}
                    </div>
                    <span className="font-semibold text-lg">CHF {item.amount.toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t-2 pt-4 flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-4xl text-primary">CHF {invoiceData.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4 pt-2">
              <Link to="/billing/payment-method" className="flex-1">
                <Button className="w-full" variant="accent" size="lg">Pay Now</Button>
              </Link>
              <Button variant="outline" size="lg">
                <Download className="h-5 w-5 mr-2" />
                PDF
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {invoiceData.paymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between py-4 border-b last:border-0">
                      <div className="flex-1">
                        <p className="font-semibold text-base">{payment.date}</p>
                        <p className="text-sm text-muted-foreground">{payment.method}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">CHF {payment.amount.toFixed(2)}</p>
                        <p className="text-sm text-success font-medium">{payment.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavbar />
    </div>
  );
}