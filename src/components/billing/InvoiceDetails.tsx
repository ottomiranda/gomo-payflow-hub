import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, HelpCircle } from "lucide-react";

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
    subtotal: 25.90,
    tax: 0,
    total: 25.90,
    paymentHistory: [
      { date: "1 Oct 2025", amount: 19.95, method: "Visa ****1234", status: "Paid" },
      { date: "1 Sep 2025", amount: 19.95, method: "TWINT", status: "Paid" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gomo-purple text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
            asChild
          >
            <Link to="/billing">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Invoice Details</h1>
            <p className="text-sm opacity-90">{invoiceData.month}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
          >
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-4">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            {/* Invoice Info */}
            <Card className="shadow-card">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Invoice Number</span>
                  <span className="font-semibold">{invoiceData.invoiceNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Issue Date</span>
                  <span className="font-semibold">{invoiceData.issueDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Due Date</span>
                  <span className="font-semibold text-warning">{invoiceData.dueDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Itemized Breakdown */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Itemized Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {invoiceData.items.map((item, index) => (
                  <div key={index} className="pb-3 border-b last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <p className="font-semibold">CHF {item.amount.toFixed(2)}</p>
                    </div>
                    {item.name.includes("Extra") && (
                      <button className="text-xs text-primary flex items-center gap-1 mt-1 hover:underline">
                        <HelpCircle className="h-3 w-3" />
                        Why this fee?
                      </button>
                    )}
                  </div>
                ))}

                <div className="pt-3 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">CHF {invoiceData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (VAT 0%)</span>
                    <span className="font-semibold">CHF {invoiceData.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg pt-2 border-t">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">CHF {invoiceData.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-2">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
                asChild
              >
                <Link to="/billing/payment-method">Pay CHF {invoiceData.total}</Link>
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-base">Payment History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {invoiceData.paymentHistory.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div>
                      <p className="font-semibold text-sm">{payment.date}</p>
                      <p className="text-xs text-muted-foreground">{payment.method}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">CHF {payment.amount.toFixed(2)}</p>
                      <p className="text-xs text-success">{payment.status}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
