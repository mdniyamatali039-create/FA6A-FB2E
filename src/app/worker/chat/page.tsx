"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApp } from '@/hooks/use-app';
import ReadAloudButton from '@/components/read-aloud-button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock data for chat history
const customerChats = [
  { id: 'c1', name: 'Sanjay Patel', lastMessage: "Yes, please start tomorrow at 9 AM.", avatar: 'https://picsum.photos/seed/sanjay/100/100', unread: 1 },
  { id: 'c2', name: 'Meera Sharma', lastMessage: "Great work today! Payment has been sent.", avatar: 'https://picsum.photos/seed/meera/100/100' },
];

const supportChats = [
  { id: 's1', name: 'LabourChok Support', lastMessage: "Your profile verification is complete.", avatar: '/logo.svg' },
];

export default function ChatPage() {
  const { t } = useApp();
  const { toast } = useToast();
  const [selectedChat, setSelectedChat] = useState<{ id: string; name: string; avatar: string } | null>(null);
  const [message, setMessage] = useState('');

  const handleSend = (msg: string) => {
      toast({
          title: "Message Sent",
          description: `To ${selectedChat?.name || 'Customer'}: "${msg}"`
      });
      setMessage('');
  };

  const renderChatListItem = (chat: { id: string; name: string; lastMessage: string; avatar: string; unread?: number; }) => (
    <div key={chat.id} className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg cursor-pointer" onClick={() => setSelectedChat(chat)}>
      <Avatar>
        <AvatarImage src={chat.avatar} alt={chat.name} />
        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <p className="font-semibold">{chat.name}</p>
        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
      </div>
      {chat.unread && (
        <div className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {chat.unread}
        </div>
      )}
    </div>
  );

  if (selectedChat) {
      return (
          <div className="flex flex-col h-[calc(100vh-8rem)] pb-20">
              <div className="flex items-center gap-3 pb-4 border-b">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedChat(null)}>
                      <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                    <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold font-headline">{selectedChat.name}</h2>
              </div>
              <div className="flex-grow p-4 flex flex-col justify-end gap-4 overflow-y-auto">
                 <div className="bg-muted p-3 rounded-2xl rounded-tl-sm w-fit max-w-[80%]">
                     Hello! I applied for your job.
                 </div>
              </div>
               <div className="pt-4 space-y-2">
                    <div className="flex flex-wrap gap-2">
                        <button onClick={() => handleSend("Location share karo")} className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap">
                            Location share karo
                        </button>
                        <button onClick={() => handleSend("Kitne baje aaoge?")} className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap">
                            Kitne baje aaoge?
                        </button>
                        <button onClick={() => handleSend("Haan, main aa raha hoon")} className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap">
                            Haan, main aa raha hoon
                        </button>
                    </div>
                  <div className="flex items-center gap-2 mt-2">
                      <Input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="rounded-full h-12"
                          onKeyDown={(e) => e.key === 'Enter' && message && handleSend(message)}
                      />
                      <Button size="icon" className="h-12 w-12 rounded-full shrink-0" onClick={() => message && handleSend(message)} disabled={!message}>
                          <Send className="h-5 w-5" />
                      </Button>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="space-y-8 pb-24 h-full flex flex-col">
        <div>
          <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold font-headline">Chat</h1>
              <ReadAloudButton text="Chat" />
          </div>
          <p className="text-muted-foreground">View your conversations with customers and support.</p>
        </div>

        <Tabs defaultValue="customers" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="customers">
            <Card>
              <CardContent className="p-2 space-y-1">
                {customerChats.length > 0 ? (
                  customerChats.map(renderChatListItem)
                ) : (
                  <p className="text-muted-foreground text-center p-8">No customer chats yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="team">
            <Card>
              <CardContent className="p-2 space-y-1">
                 {supportChats.length > 0 ? (
                  supportChats.map(renderChatListItem)
                ) : (
                  <p className="text-muted-foreground text-center p-8">No messages from the LabourChok team.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
}
