"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApp } from '@/hooks/use-app';
import ReadAloudButton from '@/components/read-aloud-button';

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

  const renderChatListItem = (chat: { id: string; name: string; lastMessage: string; avatar: string; unread?: number; }) => (
    <div key={chat.id} className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg cursor-pointer">
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
            <div className="mt-8 space-y-2">
                <h3 className="font-bold text-muted-foreground uppercase text-xs tracking-wider">Quick Replies</h3>
                <div className="flex flex-wrap gap-2">
                    <button className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full px-4 py-2 text-sm font-medium transition-colors">
                        "Location share karo" (Send Location)
                    </button>
                    <button className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full px-4 py-2 text-sm font-medium transition-colors">
                        "Kitne baje aaoge?" (What time?)
                    </button>
                    <button className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full px-4 py-2 text-sm font-medium transition-colors">
                        "Haan, main aa raha hoon" (Yes, coming)
                    </button>
                </div>
            </div>
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
