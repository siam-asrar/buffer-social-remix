'use client';

import * as React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { generatePostsAction } from '@/app/actions';
import { platforms, type GeneratedPost, type InitialContent, type HistoryItem, type PostSize } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Info, Link, Sparkles, Loader2, Image as ImageIcon, History } from 'lucide-react';
import { PlatformIcon } from './platform-icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ScrollArea } from './ui/scroll-area';

type ContentFormProps = {
  onPostsGenerated: (posts: GeneratedPost[], initialContent: InitialContent, brandTone: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  isGenerating: boolean;
};

const initialState = {};
const HISTORY_KEY = 'socialRemixHistory';

function SubmitButton({ isGenerating, isFormInvalid }: { isGenerating: boolean; isFormInvalid: boolean }) {
  const { pending } = useFormStatus();
  const isDisabled = pending || isGenerating || isFormInvalid;
  return (
    <Button type="submit" className="w-full" disabled={isDisabled}>
      {pending || isGenerating ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Generate Posts
    </Button>
  );
}

export default function ContentForm({ onPostsGenerated, setIsLoading, isGenerating }: ContentFormProps) {
  const [state, formAction] = useActionState(generatePostsAction, initialState);
  const { toast } = useToast();
  const [inputType, setInputType] = React.useState('url');
  const [source, setSource] = React.useState('');
  const [brandTone, setBrandTone] = React.useState('Informative and engaging');
  const [selectedPlatforms, setSelectedPlatforms] = React.useState(['linkedin', 'x/twitter']);
  const [generateImages, setGenerateImages] = React.useState(true);
  const [history, setHistory] = React.useState<HistoryItem[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [postSize, setPostSize] = React.useState<PostSize>('medium');
  const [postVariations, setPostVariations] = React.useState(1);
  
  const isFormInvalid = !source || selectedPlatforms.length === 0;

  React.useEffect(() => {
    try {
        const storedHistory = localStorage.getItem(HISTORY_KEY);
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
    } catch (e) {
        console.error("Failed to parse history from localStorage", e);
        localStorage.removeItem(HISTORY_KEY);
    }
  }, []);

  React.useEffect(() => {
    if (state === initialState) {
        return;
    }
    
    setIsLoading(false); // Always stop loading when the action completes
    if (state?.error) {
      let errorMsg = 'An error occurred.';
      if (typeof state.error === 'string') {
        errorMsg = state.error;
      } else if (typeof state.error === 'object' && state.error !== null) {
        errorMsg = Object.values(state.error).flat().join('\n');
      }

      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: errorMsg,
      });
    }
    if (state?.posts && state.initialContent && state.brandTone && state.inputData) {
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        request: state.inputData,
      };

      setHistory(prevHistory => {
        const updatedHistory = [newHistoryItem, ...prevHistory].slice(0, 10);
        try {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
        } catch(e) {
            console.error("Failed to save history to localStorage", e);
        }
        return updatedHistory;
      });
      
      onPostsGenerated(state.posts, state.initialContent, state.brandTone);
    }
  }, [state, onPostsGenerated, setIsLoading, toast]);
  
  const handleHistorySelect = (item: HistoryItem) => {
    const { request } = item;
    setInputType(request.inputType);
    setSource(request.source);
    setBrandTone(request.brandTone);
    setSelectedPlatforms(request.platforms);
    setGenerateImages(request.generateImages);
    setPostSize(request.postSize);
    setPostVariations(request.postVariations);
    setIsPopoverOpen(false);
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setSelectedPlatforms(prev => 
      checked ? [...prev, platform] : prev.filter(p => p !== platform)
    );
  }
  
  const handleFormAction = (formData: FormData) => {
    setIsLoading(true);
    formAction(formData);
  }

  return (
    <Card className={cn(isGenerating && 'hidden')}>
      <form
        action={handleFormAction}
      >
        <CardHeader>
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <CardTitle className="font-headline text-2xl">Create Your Posts</CardTitle>
                    {history.length > 0 && (
                        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                    <History className="h-4 w-4" />
                                    <span className="sr-only">View History</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-96">
                                <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Generation History</h4>
                                    <p className="text-sm text-muted-foreground">
                                    Select a past generation to reuse its settings.
                                    </p>
                                </div>
                                <ScrollArea className="h-72">
                                    <div className="grid gap-4 pr-4 py-2">
                                        {history.map((item) => (
                                            <div key={item.id} onClick={() => handleHistorySelect(item)} className="text-sm p-3 rounded-md hover:bg-accent cursor-pointer border border-border">
                                                <p className="whitespace-normal break-words font-medium text-foreground">
                                                    {item.request.inputType === 'url' ? item.request.source : `"${item.request.source.substring(0, 100)}..."`}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-2">{new Date(item.timestamp).toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
                <div className="flex items-center space-x-2 pt-1">
                    <Checkbox id="generateImages" name="generateImages" checked={generateImages} onCheckedChange={(checked) => setGenerateImages(!!checked)} />
                    <Label htmlFor="generateImages" className="text-sm font-medium leading-none flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Generate Images
                    </Label>
                </div>
            </div>
            <CardDescription>Start by providing content, then set your tone.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={inputType} className="w-full" onValueChange={(value) => { setInputType(value); setSource(''); }}>
            <input type="hidden" name="inputType" value={inputType} />
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url"><Link className="mr-2 h-4 w-4" />From URL</TabsTrigger>
              <TabsTrigger value="text"><FileText className="mr-2 h-4 w-4" />Paste Text</TabsTrigger>
            </TabsList>
            <TabsContent value="url" className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source-url">Content URL</Label>
                <Input
                  id="source"
                  name="source"
                  placeholder="https://example.com/blog-post"
                  type="url"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <Alert variant="warning">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  The URL must be publicly readable. For complex sites like Google, X/Twitter, or LinkedIn, it&apos;s best to paste the text directly.
                </AlertDescription>
              </Alert>
            </TabsContent>
            <TabsContent value="text" className="pt-4 space-y-2">
              <Label htmlFor="source-text">Pasted Text</Label>
              <Textarea
                id="source"
                name="source"
                placeholder="Paste your article, notes, or any text here..."
                className="h-[150px] resize-none"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="brandTone">Brand Tone & Voice</Label>
                <Select name="brandTone" value={brandTone} onValueChange={setBrandTone}>
                <SelectTrigger id="brandTone">
                    <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Informative and engaging">Informative and engaging</SelectItem>
                    <SelectItem value="Professional and authoritative">Professional and authoritative</SelectItem>
                    <SelectItem value="Witty and Humorous">Witty and Humorous</SelectItem>
                    <SelectItem value="Inspirational and uplifting">Inspirational and uplifting</SelectItem>
                    <SelectItem value="Casual and Friendly">Casual and Friendly</SelectItem>
                    <SelectItem value="Bold and provocative">Bold and provocative</SelectItem>
                    <SelectItem value="Elegant and sophisticated">Elegant and sophisticated</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="postSize">Post Size</Label>
                <Select name="postSize" value={postSize} onValueChange={(value) => setPostSize(value as PostSize)}>
                <SelectTrigger id="postSize">
                    <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="small">Small (50-100 words)</SelectItem>
                    <SelectItem value="medium">Medium (150-200 words)</SelectItem>
                    <SelectItem value="large">Large (250+ words)</SelectItem>
                </SelectContent>
                </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label>Target Platforms</Label>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {platforms.map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={`platform-${platform}`}
                      name="platforms"
                      value={platform}
                      checked={selectedPlatforms.includes(platform)}
                      onCheckedChange={(checked) => handlePlatformChange(platform, !!checked)}
                    />
                    <Label
                      htmlFor={`platform-${platform}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2 capitalize"
                    >
                      <PlatformIcon platform={platform} className="w-4 h-4" />
                      {platform === 'x/twitter' ? 'X (Twitter)' : platform}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="postVariations">Variations Per Platform</Label>
                <Input
                    id="postVariations"
                    name="postVariations"
                    type="number"
                    value={postVariations}
                    onChange={(e) => setPostVariations(Math.max(1, Math.min(3, parseInt(e.target.value, 10) || 1)))}
                    min="1"
                    max="3"
                />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton isGenerating={isGenerating} isFormInvalid={isFormInvalid} />
        </CardFooter>
      </form>
    </Card>
  );
}
