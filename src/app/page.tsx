'use client';

import { useState } from 'react';
import type { GeneratedPost, InitialContent } from '@/lib/types';
import Header from '@/components/layout/header';
import ContentForm from '@/components/content-form';
import PostsDisplay from '@/components/posts-display';
import { PostSkeleton } from '@/components/post-skeleton';

export default function Home() {
  const [step, setStep] = useState<'form' | 'posts'>('form');
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialContent, setInitialContent] = useState<InitialContent | null>(null);
  const [brandTone, setBrandTone] = useState<string>('');

  const handleReset = () => {
    setStep('form');
    setPosts([]);
    setInitialContent(null);
    setIsLoading(false);
    setBrandTone('');
  };

  const handlePostsGenerated = (generatedPosts: GeneratedPost[], content: InitialContent, tone: string) => {
    setPosts(generatedPosts);
    setInitialContent(content);
    setBrandTone(tone);
    setIsLoading(false);
    setStep('posts');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        {step === 'form' ? (
          <div className="max-w-2xl mx-auto">
             <ContentForm
              onPostsGenerated={handlePostsGenerated}
              setIsLoading={setIsLoading}
              isGenerating={isLoading}
            />
            {isLoading && (
               <div className="mt-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-headline font-bold text-center">Generating your content...</h3>
                  <p className="text-muted-foreground text-center">The AI is working its magic. Please wait a moment.</p>
                </div>
                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PostSkeleton />
                    <PostSkeleton />
                  </div>
               </div>
            )}
          </div>
        ) : (
          <PostsDisplay
            posts={posts}
            initialContent={initialContent}
            brandTone={brandTone}
            setPosts={setPosts}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}
