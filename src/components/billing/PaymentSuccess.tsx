import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileText } from "lucide-react";
import { useEffect, useState } from "react";

export function PaymentSuccess() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const transactionData = {
    amount: 25.90,
    transactionId: "TXN-2025-10-1234567",
    date: new Date().toLocaleDateString("en-GB", { 
      day: "2-digit", 
      month: "short", 
      year: "numeric" 
    }),
    time: new Date().toLocaleTimeString("en-GB", { 
      hour: "2-digit", 
      minute: "2-digit" 
    }),
    method: "TWINT",
    status: "Completed",
    email: "alex@example.com"
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(60)].map((_, i) => {
            const colors = ['text-primary', 'text-accent', 'text-secondary', 'text-gomo-blue'];
            const symbols = ['●', '■', '▲', '★'];
            return (
              <div
                key={i}
                className={`absolute animate-bounce ${colors[Math.floor(Math.random() * colors.length)]}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: Math.random() * 0.7 + 0.3,
                  fontSize: `${Math.random() * 20 + 15}px`,
                }}
              >
                {symbols[Math.floor(Math.random() * symbols.length)]}
              </div>
            );
          })}
        </div>
      )}

      {/* Header */}
      <header className="bg-success text-success-foreground p-8 shadow-md relative z-20">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold">Payment Successful</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-8 space-y-6 pb-8 relative z-20">
        {/* Success Card */}
        <Card className="border-2 border-success shadow-elevated">
          <CardContent className="p-10 text-center space-y-6">
            <div className="mx-auto w-24 h-24 bg-success rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="h-14 w-14 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-3">Payment Successful! 🎉</h2>
              <p className="text-base text-muted-foreground">Your payment has been processed successfully</p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-2">Amount Paid</p>
              <p className="text-6xl font-bold text-success">CHF {transactionData.amount}</p>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Transaction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">Transaction ID</span>
              <span className="font-semibold text-base">{transactionData.transactionId}</span>
            </div>
            <div className="flex justify-between py-2 border-t">
              <span className="text-sm text-muted-foreground">Date</span>
              <span className="font-semibold text-base">{transactionData.date}</span>
            </div>
            <div className="flex justify-between py-2 border-t">
              <span className="text-sm text-muted-foreground">Time</span>
              <span className="font-semibold text-base">{transactionData.time}</span>
            </div>
            <div className="flex justify-between py-2 border-t">
              <span className="text-sm text-muted-foreground">Payment Method</span>
              <span className="font-semibold text-base">{transactionData.method}</span>
            </div>
            <div className="flex justify-between py-2 border-t">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="font-bold text-base text-success">{transactionData.status}</span>
            </div>
            <div className="flex justify-between py-3 pt-4 border-t-2">
              <span className="text-sm text-muted-foreground">Receipt sent to</span>
              <span className="font-semibold text-base">{transactionData.email}</span>
            </div>
          </CardContent>
        </Card>

        {/* Updated Balance */}
        <Card className="bg-muted/30 shadow-card">
          <CardContent className="p-8 text-center">
            <p className="text-base text-muted-foreground mb-3">Updated Balance</p>
            <p className="text-5xl font-bold text-foreground mb-3">CHF 0.00</p>
            <p className="text-base text-success font-semibold">All caught up! 🎊</p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          <Link to="/" className="block">
            <Button className="w-full" variant="default" size="lg">Back to Home</Button>
          </Link>
          <Button variant="outline" className="w-full" size="lg">
            <FileText className="h-5 w-5 mr-2" />
            Download Receipt
          </Button>
        </div>
      </main>
    </div>
  );
}