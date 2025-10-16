import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Paperclip, Mic, X } from "lucide-react";
import { NavigationDrawer } from "@/components/layout/NavigationDrawer";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  typing?: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I am Gomo\'s virtual assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('plano') || lowerMessage.includes('plan')) {
      return 'I can help you with information about your current plan. Would you like to see details of your plan, upgrade, or do you have any specific questions?';
    }
    
    if (lowerMessage.includes('fatura') || lowerMessage.includes('conta') || lowerMessage.includes('pagamento') || lowerMessage.includes('invoice') || lowerMessage.includes('billing') || lowerMessage.includes('payment')) {
      return 'I\'ll help you with billing issues. You can access your invoices in the "Billing" section or I can clarify payment questions. What do you need?';
    }
    
    if (lowerMessage.includes('dados') || lowerMessage.includes('internet') || lowerMessage.includes('consumo') || lowerMessage.includes('data') || lowerMessage.includes('usage')) {
      return 'I can show you your current data usage. Are you using mobile data, have questions about your limit, or need more data?';
    }
    
    if (lowerMessage.includes('suporte') || lowerMessage.includes('problema') || lowerMessage.includes('ajuda') || lowerMessage.includes('support') || lowerMessage.includes('problem') || lowerMessage.includes('help')) {
      return 'I\'m here to help! Can you tell me what problem you\'re facing? If you need more specialized support, I can connect you with our team.';
    }
    
    if (lowerMessage.includes('roaming') || lowerMessage.includes('viagem') || lowerMessage.includes('travel')) {
      return 'For international roaming questions, I can help with information about rates and how to activate/deactivate the service. Are you planning a trip?';
    }
    
    if (lowerMessage.includes('speak with agent') || lowerMessage.includes('agent') || lowerMessage.includes('atendente')) {
      return 'I\'d be happy to connect you with one of our human support agents! They can provide personalized assistance for complex issues. Would you like me to transfer you to our support team now? Please hold on while I connect you.';
    }
    
    return 'I understand your message. How can I help you specifically? I can assist with plans, invoices, data usage, technical support and much more.';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular delay de digitação do AI
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "View my current plan",
    "Check invoice",
    "Check data usage",
    "Activate roaming",
    "Technical Support",
    "Speak with agent"
  ];

  return (
    <div className="min-h-screen bg-gomo-dark flex flex-col">
      <NavigationDrawer />
      
      {/* Header */}
      <header className="gradient-purple text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-white/20 rounded-full p-2">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Gomo Assistant</h1>
              <p className="text-sm text-white/80">Online now</p>
            </div>
          </div>
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-4 pb-24 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="bg-gradient-to-br from-gomo-magenta to-gomo-purple rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-gomo-magenta to-gomo-purple text-white'
                    : 'bg-white/10 text-white border border-white/20'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-white/50'
                }`}>
                  {message.timestamp.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>

              {message.sender === 'user' && (
                <div className="bg-white/20 rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="bg-gradient-to-br from-gomo-magenta to-gomo-purple rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white/10 text-white border border-white/20 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <Card className="mt-6 bg-white/5 border-white/20 shadow-card">
            <CardContent className="p-4">
              <h3 className="font-bold text-white mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start bg-white/5 border-white/20 text-white hover:bg-white/10 text-sm"
                    onClick={() => setInputMessage(action)}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Input Area */}
      <div className="fixed bottom-4 left-0 right-0 bg-gomo-dark border-t border-white/10 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-end gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 flex-shrink-0"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-12 py-3 rounded-2xl"
                disabled={isTyping}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-gomo-magenta to-gomo-purple hover:from-gomo-magenta/90 hover:to-gomo-purple/90 text-white flex-shrink-0"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;