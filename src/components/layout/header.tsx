import { Share2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center gap-3">
        <Share2 className="text-primary h-7 w-7" />
        <h1 className="text-2xl font-headline font-bold text-foreground tracking-tight">
        </h1>
      </div>
    </header>
  );
}
