import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Plus, Smartphone } from "lucide-react";

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
          <h1 className="text-xl font-bold">Select Payment Method</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* Amount Card */}
        <Card className="shadow-card bg-muted">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
            <p className="text-3xl font-bold">CHF 25.90</p>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-1">
            Choose Payment Method
          </h2>
          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-3">
            {paymentMethods.map((method) => (
              <Card 
                key={method.id}
                className={`shadow-card cursor-pointer transition-base hover:border-primary ${
                  selectedMethod === method.id ? 'border-primary border-2' : ''
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <method.icon className="h-6 w-6 text-foreground" />
                      </div>
                      <div className="flex-1">
                        <Label 
                          htmlFor={method.id} 
                          className="font-semibold cursor-pointer flex items-center gap-2"
                        >
                          {method.name}
                          {method.recommended && (
                            <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                              Recommended
                            </span>
                          )}
                        </Label>
                        {method.id === "twint" && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Fast & secure Swiss payment
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </div>

        {/* Info Card */}
        <Card className="shadow-card bg-muted/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Secure Payment:</span> All transactions are encrypted and secure. Your payment information is never stored on our servers.
            </p>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
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
