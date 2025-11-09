
"use client";

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, Send, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useApp } from '@/hooks/use-app';
import { cn } from '@/lib/utils';
import { onboardingAssistanceChatbot } from '@/ai/flows/onboarding-assistance-chatbot';
import Logo from './logo';
import type { UserRole } from '@/lib/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useApp();
  const pathname = usePathname();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const role: UserRole | 'guest' = pathname.includes('/customer') ? 'customer' : pathname.includes('/worker') ? 'worker' : 'guest';
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: t('chatbot_greeting') }]);
    }
  }, [isOpen, messages.length, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if(role === 'guest') {
        // Handle case where user is not logged in or role cannot be determined
         setMessages(prev => [...prev, { role: 'assistant', content: "Please log in as a customer or worker to get specific help." }]);
      } else {
        const result = await onboardingAssistanceChatbot({ query: input, userType: role });
        const assistantMessage: Message = { role: 'assistant', content: result.response };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={cn("fixed bottom-4 right-4 z-50 transition-transform duration-300 ease-in-out", isOpen ? "translate-y-[200%]" : "translate-y-0")}>
        <Button onClick={() => setIsOpen(true)} size="icon" className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90">
          <Bot className="h-8 w-8 text-primary-foreground" />
          <span className="sr-only">Open Chat</span>
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-md">
          <Card className="flex flex-col h-[60vh] shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <Logo />
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                  {message.role === 'assistant' && <Bot className="h-6 w-6 text-primary flex-shrink-0" />}
                  <div className={cn("rounded-lg px-4 py-2 max-w-[80%]", message.role === 'assistant' ? 'bg-muted' : 'bg-primary text-primary-foreground')}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-3">
                  <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                  <div className="rounded-lg px-4 py-2 bg-muted flex items-center gap-2">
                     <Loader2 className="h-4 w-4 animate-spin" />
                     <p className="text-sm text-muted-foreground">{t('chatbot_typing')}</p>
                  </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>
            <CardFooter>
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full items-center space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('chatbot_placeholder')}
                  disabled={isLoading}
                  autoFocus
                />
                <Button type="submit" size="icon" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
