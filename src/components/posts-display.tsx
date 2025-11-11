'use client';

import type { GeneratedPost, InitialContent } from '@/lib/types';
import PostCard from './post-card';
import ExportActions from './export-actions';
import { Button } from './ui/button';
import { RefreshCw, Expand } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';

type PostsDisplayProps = {
  posts: GeneratedPost[];
  initialContent: InitialContent | null;
  brandTone: string;
  setPosts: React.Dispatch<React.SetStateAction<GeneratedPost[]>>;
  onReset: () => void;
};

export default function PostsDisplay({ posts, initialContent, brandTone, setPosts, onReset }: PostsDisplayProps) {

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-3xl font-headline font-bold">Generated Posts</h2>
          <p className="text-muted-foreground max-w-2xl mt-1">
            Review your AI-generated posts below. You can generate image prompts, create images, and export your content.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <ExportActions posts={posts} initialContent={initialContent} />
          <Button variant="outline" size="sm" onClick={onReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Start Over
          </Button>
        </div>
      </div>
      
      {initialContent && (
        <Card className="bg-card/30">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="font-headline text-lg">Source Content Summary</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <Expand className="h-4 w-4" />
                  <span className="sr-only">View Full Content</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl h-[80vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle>{initialContent.title || 'Source Content'}</DialogTitle>
                  <DialogDescription>Full view of the original source content.</DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-grow">
                  <p className="text-sm text-foreground/90 whitespace-pre-wrap pr-4">
                    {initialContent.content}
                  </p>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {initialContent.title && <p className="font-semibold text-foreground mb-2">{initialContent.title}</p>}
            <p className="text-sm text-muted-foreground max-h-40 overflow-y-auto">
              {initialContent.content}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} setPosts={setPosts} brandTone={brandTone} />
        ))}
      </div>
    </div>
  );
}
