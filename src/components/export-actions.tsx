'use client';

import { useState } from 'react';
import { Download, Mail, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { GeneratedPost, InitialContent } from '@/lib/types';
import { sendEmailAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

type ExportActionsProps = {
  posts: GeneratedPost[];
  initialContent: InitialContent | null;
};

export default function ExportActions({ posts }: ExportActionsProps) {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDownloadCSV = () => {
    const csvHeader = 'Platform,Post Content,Image Prompt,Image URL\n';
    const csvRows = posts.map(p => {
      const content = `"${p.content.replace(/"/g, '""')}"`;
      const prompt = p.imagePrompt ? `"${p.imagePrompt.replace(/"/g, '""')}"` : '""';
      const imageUrl = p.imageUrl ? `"${p.imageUrl}"` : '""';
      return [p.platform, content, prompt, imageUrl].join(',');
    });
    const csvContent = csvHeader + csvRows.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'social-remix-posts.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendEmail = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        toast({
            variant: 'destructive',
            title: 'Invalid Email',
            description: 'Please enter a valid email address.',
        });
        return;
    }
    
    setIsSending(true);
    const result = await sendEmailAction(email, posts);
    setIsSending(false);

    if (result.error) {
        toast({
            variant: 'destructive',
            title: 'Email Failed',
            description: result.error,
        });
    } else {
        toast({
            title: 'Email Sent',
            description: result.success,
        });
        setIsDialogOpen(false);
    }
  };

  return (
    <>
      <Button variant="outline" size="sm" onClick={handleDownloadCSV}>
        <Download className="mr-2 h-4 w-4" />
        CSV
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Email Generated Posts</DialogTitle>
            <DialogDescription>
              Enter an email address to send the generated posts as a CSV attachment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                placeholder="recipient@example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSendEmail} disabled={isSending}>
              {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
