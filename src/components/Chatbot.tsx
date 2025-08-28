"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { chat } from '@/ai/flows/chatbot-flow';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        setMessages([{
            text: "Hello! I'm the TidyScapes assistant. How can I help you with your landscaping needs today?",
            sender: 'bot'
        }]);
    }
  }, [isOpen]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const botResponse = await chat(input);
      const botMessage: Message = { text: botResponse, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="icon" className="rounded-full w-14 h-14" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-full max-w-sm flex flex-col h-[60vh] shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline text-lg">TidyScapes Assistant</CardTitle>
            <Bot className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden p-0">
            <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                    {message.sender === 'bot' && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-5 h-5"/></AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                     {message.sender === 'user' && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback><User className="w-5 h-5"/></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {loading && (
                    <div className="flex items-start gap-3">
                        <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="w-5 h-5"/></AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg px-4 py-2 max-w-[80%] bg-muted">
                            <p className="text-sm">Thinking...</p>
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <div className="relative w-full">
              <Input
                placeholder="Ask a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
              <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleSend} disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
