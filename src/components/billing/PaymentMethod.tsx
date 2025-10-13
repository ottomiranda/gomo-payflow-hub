import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, CreditCard, Plus, Smartphone, Shield } from "lucide-react";

export function PaymentMethod() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("twint");

  const paymentMethods = [
    { id: "twint", name: "TWINT", icon: Smartphone, recommended: true },
    { id: "visa", name: "Visa ****1234", icon: CreditCard, recommended: false },
    { id: "new", name: "Add new payment method", icon: Plus, recommended: false }
  ];

  const handleContinue = () => {
    navigate("/billing/confirm");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-purple text-white p-6 sticky top-0 z-10 shadow-md">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Link to="/billing">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Payment Method</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-6 space-y-6 pb-8">
        {/* Amount Card */}
        <Card className="border-2 border-primary shadow-elevated">
          <CardContent className="p-8">
            <p className="text-sm text-muted-foreground mb-2">Amount to Pay</p>
            <p className="text-6xl font-bold text-primary">CHF 25.90</p>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <div className="space-y-5">
          <h2 className="text-xl font-bold">Select Payment Method</h2>
          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-4">
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all shadow-card hover:shadow-elevated ${
                  selectedMethod === method.id ? "border-primary border-3 shadow-elevated" : "border-border"
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-5">
                    <RadioGroupItem value={method.id} id={method.id} className="h-5 w-5" />
                    <div className="bg-primary/10 rounded-full p-3">
                      <method.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg">{method.name}</p>
                      {method.recommended && (
                        <span className="inline-block text-xs bg-accent text-accent-foreground px-3 py-1 rounded-full font-bold mt-1">
                          Recommended
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </div>

        {/* Security Note */}
        <Card className="bg-muted/30 shadow-card">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="bg-primary/10 rounded-full p-2">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-base mb-1">Secure Payment</p>
              <p className="text-sm text-muted-foreground">
                All transactions are encrypted and secure. Your payment information is never stored on our servers.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button 
          className="w-full" 
          variant="accent"
          size="lg" 
          onClick={handleContinue}
          disabled={!selectedMethod}
        >
          Continue to Payment
        </Button>
      </main>
    </div>
  );
}