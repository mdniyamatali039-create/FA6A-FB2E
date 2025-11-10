
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PlusCircle, Trash2 } from 'lucide-react';
import { mockWorkers } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from '@/components/ui/checkbox';
import type { WorkerProfile } from '@/lib/types';

// Mock current worker's team. Assuming worker 'w1' is the user.
const initialTeamMembers = [mockWorkers[2], mockWorkers[4]];

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<WorkerProfile[]>(initialTeamMembers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const { toast } = useToast();

  const potentialNewMembers = mockWorkers.filter(
    w => w.id !== 'w1' && !teamMembers.some(tm => tm.id === w.id)
  );

  const handleAddMembers = () => {
    const membersToAdd = mockWorkers.filter(w => selectedWorkers.includes(w.id));
    setTeamMembers(prev => [...prev, ...membersToAdd]);
    toast({
      title: 'Members Added',
      description: `${membersToAdd.length} new member(s) have been added to your team.`,
    });
    setIsAddDialogOpen(false);
    setSelectedWorkers([]);
  };

  const handleRemoveMember = (workerId: string) => {
    const memberToRemove = teamMembers.find(m => m.id === workerId);
    setTeamMembers(prev => prev.filter(m => m.id !== workerId));
     toast({
      title: 'Member Removed',
      description: `${memberToRemove?.name} has been removed from your team.`,
      variant: 'destructive',
    });
  }

  const handleCheckboxChange = (workerId: string, checked: boolean | 'indeterminate') => {
    if (checked) {
      setSelectedWorkers(prev => [...prev, workerId]);
    } else {
      setSelectedWorkers(prev => prev.filter(id => id !== workerId));
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Team</CardTitle>
            <CardDescription>Manage your team members.</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Members
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Team Members</DialogTitle>
                <DialogDescription>Select workers to add to your team.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4 max-h-80 overflow-y-auto">
                {potentialNewMembers.map(worker => (
                  <div key={worker.id} className="flex items-center space-x-3 rounded-md border p-3">
                    <Checkbox
                      id={`worker-${worker.id}`}
                      onCheckedChange={(checked) => handleCheckboxChange(worker.id, checked)}
                      checked={selectedWorkers.includes(worker.id)}
                    />
                    <label htmlFor={`worker-${worker.id}`} className="flex items-center gap-3 cursor-pointer">
                       <Avatar>
                        <AvatarImage src={worker.avatarUrl} alt={worker.name} />
                        <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{worker.name}</p>
                        <p className="text-sm text-muted-foreground">{worker.primarySkills.join(', ')}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddMembers} disabled={selectedWorkers.length === 0}>Add Selected</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {teamMembers.length > 0 ? (
            <div className="space-y-4">
              {teamMembers.map(member => (
                <div key={member.id} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.primarySkills.join(', ')}</p>
                    </div>
                  </div>
                   <Button variant="ghost" size="icon" onClick={() => handleRemoveMember(member.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Remove member</span>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">You have no team members yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
