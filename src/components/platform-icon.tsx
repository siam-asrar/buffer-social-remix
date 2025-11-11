'use client';

import { Linkedin, Twitter, Instagram, Facebook, Globe } from 'lucide-react';
import type { Platform } from '@/lib/types';

type PlatformIconProps = {
  platform: Platform;
  className?: string;
};

// Custom SVG for Reddit Icon
const RedditIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        stroke="currentColor" 
        strokeWidth="0" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M12,0C5.373,0,0,5.373,0,12c0,6.627,5.373,12,12,12s12-5.373,12-12C24,5.373,18.627,0,12,0z M5.75,12.75 c0-0.69,0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25c0,0.69-0.56,1.25-1.25,1.25S5.75,13.44,5.75,12.75z M9.75,16.5 c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5S7.422,15,8.25,15S9.75,15.672,9.75,16.5z M12,6.5c-0.828,0-1.5,0.672-1.5,1.5 s0.672,1.5,1.5,1.5s1.5-0.672,1.5-1.5S12.828,6.5,12,6.5z M15.75,16.5c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5 s0.672-1.5,1.5-1.5S15.75,15.672,15.75,16.5z M18.25,14c-0.69,0-1.25-0.56-1.25-1.25c0-0.69,0.56-1.25,1.25-1.25 s1.25,0.56,1.25,1.25C19.5,13.44,18.94,14,18.25,14z M17,10.5c-1.105,0-2,0.895-2,2c0,1.105,0.895,2,2,2s2-0.895,2-2 C19,11.395,18.105,10.5,17,10.5z M7,10.5c-1.105,0-2,0.895-2,2c0,1.105,0.895,2,2,2s2-0.895,2-2C9,11.395,8.105,10.5,7,10.5z M12,19.5c-2.485,0-4.5-2.015-4.5-4.5H12h4.5C16.5,17.485,14.485,19.5,12,19.5z"/>
    </svg>
);


export function PlatformIcon({ platform, className }: PlatformIconProps) {
  switch (platform) {
    case 'linkedin':
      return <Linkedin className={className} />;
    case 'x/twitter':
      return <Twitter className={className} />;
    case 'instagram':
      return <Instagram className={className} />;
    case 'facebook':
      return <Facebook className={className} />;
    case 'reddit':
      return <RedditIcon className={className} />;
    case 'general':
        return <Globe className={className} />;
    default:
      return null;
  }
}