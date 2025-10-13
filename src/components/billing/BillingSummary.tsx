import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, AlertCircle, Download } from "lucide-react";

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
      {/* Header */}
      <header className="bg-gomo-purple text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-bold">Billing</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Status Card */}
        <Card className="shadow-elevated border-2 border-primary/20">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Amount Due</p>
                <p className="text-5xl font-bold text-primary">CHF {billData.amount}</p>
              </div>
              <div className="text-right">
                {billData.status === "unpaid" ? (
                  <div className="flex items-center gap-2 text-warning">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-semibold">Unpaid</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">Paid</span>
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-1">Due {billData.dueDate}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3">Invoice Period</p>
              <p className="font-semibold">{billData.invoiceMonth}</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
            asChild
          >
            <Link to="/billing/payment-method">Pay Now</Link>
          </Button>

          <Button 
            variant="outline"
            className="w-full"
            asChild
          >
            <Link to="/billing/invoice">
              <FileText className="h-4 w-4 mr-2" />
              View Invoice Details
            </Link>
          </Button>
        </div>

        {/* Auto-Pay Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Auto-Pay Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Automatic Payments</span>
              <span className={`font-semibold text-sm ${billData.autoPayEnabled ? 'text-success' : 'text-muted-foreground'}`}>
                {billData.autoPayEnabled ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {billData.autoPayEnabled 
                ? 'Your bills will be automatically paid on the due date.' 
                : 'Enable auto-pay to never miss a payment.'}
            </p>
            <Button variant="outline" className="w-full" size="sm">
              {billData.autoPayEnabled ? 'Manage Auto-Pay' : 'Enable Auto-Pay'}
            </Button>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-base">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div>
                <p className="font-semibold text-sm">September 2025</p>
                <p className="text-xs text-muted-foreground">Paid on 1 Oct 2025</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">CHF 19.95</p>
                <p className="text-xs text-success">Paid (Visa)</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div>
                <p className="font-semibold text-sm">August 2025</p>
                <p className="text-xs text-muted-foreground">Paid on 1 Sep 2025</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">CHF 19.95</p>
                <p className="text-xs text-success">Paid (TWINT)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
