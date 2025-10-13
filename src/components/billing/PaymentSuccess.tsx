import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Home } from "lucide-react";
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
    email: "alex@example.com"
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <header className="bg-success text-success-foreground p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold text-center">Payment Successful</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* Success Card */}
        <Card className="shadow-elevated border-success">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-success-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Payment Successful! 🎉</h2>
              <p className="text-muted-foreground">Your payment has been processed successfully</p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-1">Amount Paid</p>
              <p className="text-4xl font-bold text-success">CHF {transactionData.amount}</p>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card className="shadow-card">
          <CardContent className="p-6 space-y-3">
            <h3 className="font-semibold mb-4">Transaction Details</h3>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono text-xs">{transactionData.transactionId}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-semibold">{transactionData.date}, {transactionData.time}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-semibold">{transactionData.method}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="font-semibold text-success">Completed</span>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Receipt sent to <span className="font-semibold">{transactionData.email}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Updated Balance */}
        <Card className="shadow-card bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-2xl font-bold text-success">CHF 0.00</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Your account is all paid up! Next bill will be generated on 1 Nov 2025.
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
            asChild
          >
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <Button 
            variant="outline"
            className="w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
        </div>
      </main>
    </div>
  );
}
