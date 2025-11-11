'use client';

import { generateImageAction, postToPlatformAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { GeneratedPost } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { PlatformIcon } from './platform-icon';
import { Loader2, Copy, Check, Image as ImageIcon, Expand, Sparkles, Send } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';

type PostCardProps = {
  post: GeneratedPost;
  setPosts: React.Dispatch<React.SetStateAction<GeneratedPost[]>>;
  brandTone: string;
};

export default function PostCard({ post, setPosts, brandTone }: PostCardProps) {
  const { toast } = useToast();
  const [copiedPost, setCopiedPost] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  
  const handleGenerateImage = async () => {
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, isGeneratingImage: true } : p))
    );

    const result = await generateImageAction(post, brandTone);

    if (result.error) {
       toast({
        variant: 'destructive',
        title: 'Image Generation Failed',
        description: result.error,
      });
       setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, isGeneratingImage: false } : p))
      );
    } else {
       setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, imageUrl: result.imageUrl || null, imagePrompt: result.imagePrompt, isGeneratingImage: false } : p
        )
      );
    }
  };

  const handleCopy = (textToCopy: string | null, type: 'post' | 'prompt') => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    const setCopied = type === 'post' ? setCopiedPost : setCopiedPrompt;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePost = async () => {
    setIsPosting(true);
    const result = await postToPlatformAction(post);
    setIsPosting(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Post Failed',
        description: result.error,
      });
    } else {
      toast({
        title: 'Post Successful',
        description: result.success,
      });
    }
  }
  
  return (
    <Card className="flex flex-col h-[525px] overflow-hidden">
        <div className="relative aspect-video w-full bg-muted/30">
            {post.imageUrl ? (
                <Image src={post.imageUrl} alt="Generated image" fill className="object-cover" />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    {post.isGeneratingImage ? (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <Loader2 className="w-8 h-8 animate-spin" />
                            <span className="text-sm">Generating Image...</span>
                        </div>
                    ) : (
                        <div className="text-center p-4">
                            <ImageIcon className="w-12 h-12 text-muted-foreground/30 mx-auto" />
                            <p className="text-sm text-muted-foreground mt-2">No image generated yet.</p>
                             <Button
                                onClick={handleGenerateImage}
                                disabled={post.isGeneratingImage}
                                variant="secondary"
                                size="sm"
                                className="mt-4"
                            >
                                <ImageIcon className="mr-2 h-4 w-4" />
                                Generate Image
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>

       <CardHeader className="flex-row items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <PlatformIcon platform={post.platform} className="w-6 h-6 text-muted-foreground" />
          <CardTitle className="font-headline text-xl capitalize leading-none pt-1">
            {post.platform === 'x/twitter' ? 'X (Twitter)' : post.platform}
          </CardTitle>
        </div>
        <div className="flex items-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <Expand className="h-4 w-4" />
                        <span className="sr-only">View Full Content</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-3xl h-[90vh] flex flex-col">
                    <DialogHeader>
                         <div className="flex items-center gap-3 mb-2">
                            <PlatformIcon platform={post.platform} className="w-6 h-6 text-muted-foreground" />
                            <DialogTitle className="font-headline text-2xl capitalize leading-none pt-1">
                                {post.platform === 'x/twitter' ? 'X (Twitter)' : post.platform} Post
                            </DialogTitle>
                         </div>
                    </DialogHeader>
                    {post.imageUrl && (
                        <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden my-2">
                            <Image src={post.imageUrl} alt="Generated image" fill className="object-cover" />
                        </div>
                    )}
                    <ScrollArea className="flex-grow border rounded-md p-4">
                        <p className="text-sm text-foreground/90 whitespace-pre-wrap pr-4">
                            {post.content}
                        </p>
                        {post.imagePrompt && (
                        <div className="mt-4 pt-4 border-t border-border">
                            <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-semibold flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-accent" />
                                Image Prompt
                            </p>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCopy(post.imagePrompt, 'prompt')}
                                className="h-7 w-7 flex-shrink-0"
                            >
                                {copiedPrompt ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                <span className="sr-only">Copy prompt</span>
                            </Button>
                            </div>
                            <p className="text-xs text-muted-foreground italic">"{post.imagePrompt}"</p>
                        </div>
                        )}
                    </ScrollArea>
                    <DialogFooter className="flex-col-reverse sm:flex-col-reverse sm:items-stretch gap-2 pt-4 border-t">
                        { post.imageUrl && !post.isGeneratingImage && (
                            <Button
                                onClick={handleGenerateImage}
                                disabled={post.isGeneratingImage}
                                variant="secondary"
                            >
                                {post.isGeneratingImage ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <ImageIcon className="mr-2 h-4 w-4" />
                                )}
                                Regenerate Image
                            </Button>
                        )}
                        <Button
                            onClick={handlePost}
                            disabled={isPosting}
                            variant="default"
                        >
                            {isPosting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="mr-2 h-4 w-4" />
                            )}
                            Post to {post.platform === 'x/twitter' ? 'X' : post.platform}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Button
            variant="ghost"
            size="icon"
            onClick={() => handleCopy(post.content, 'post')}
            className="h-8 w-8 flex-shrink-0"
            >
            {copiedPost ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            <span className="sr-only">Copy post content</span>
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow text-sm text-foreground/90 overflow-y-auto px-4 pt-0 pb-4">
        <p className="whitespace-pre-wrap">{post.content}</p>
        {post.imagePrompt && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                Image Prompt
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(post.imagePrompt, 'prompt')}
                className="h-7 w-7 flex-shrink-0"
              >
                {copiedPrompt ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                <span className="sr-only">Copy prompt</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground italic">"{post.imagePrompt}"</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2 pt-0 p-4 border-t">
        { post.imageUrl && !post.isGeneratingImage && (
             <Button
                onClick={handleGenerateImage}
                disabled={post.isGeneratingImage}
                variant="secondary"
            >
                {post.isGeneratingImage ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <ImageIcon className="mr-2 h-4 w-4" />
                )}
                Regenerate Image
            </Button>
        )}
        <Button
            onClick={handlePost}
            disabled={isPosting}
            variant="default"
        >
            {isPosting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Send className="mr-2 h-4 w-4" />
            )}
            Post to {post.platform === 'x/twitter' ? 'X' : post.platform}
        </Button>
      </CardFooter>
    </Card>
  );
}
