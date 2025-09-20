'use client';
import { useState, useTransition, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { rewriteContent } from '@/app/actions';
import { Sparkles, Loader } from 'lucide-react';

interface EmotionalContentProps {
  originalContent: string;
}

export default function EmotionalContent({ originalContent }: EmotionalContentProps) {
  const [isPending, startTransition] = useTransition();
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [content, setContent] = useState(originalContent);
  const [hasPermission, setHasPermission] = useState(false); // Simulates one-time permission grant

  const handlePersonalization = () => {
    if (!hasPermission) {
      setHasPermission(true); // Simulate getting permission
    }
    
    startTransition(async () => {
      const emotions = ['Joyful', 'Curious', 'Focused', 'Calm'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      
      const newContent = await rewriteContent(originalContent, randomEmotion);
      setContent(newContent);
      setIsPersonalized(true);
    });
  };

  const handleToggle = (checked: boolean) => {
    if (checked) {
      handlePersonalization();
    } else {
      setContent(originalContent);
      setIsPersonalized(false);
    }
  };

  return (
    <div className="relative group/content">
      <div className="absolute top-[-1rem] right-0 p-2 z-10 flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-lg border border-border/10">
        {isPending ? <Loader className="w-4 h-4 animate-spin text-primary" /> : <Sparkles className="w-4 h-4 text-primary" />}
        <Label htmlFor="personalize-toggle" className="text-xs text-white/80 cursor-pointer">
          Personalize with AI
        </Label>
        <Switch
          id="personalize-toggle"
          checked={isPersonalized}
          onCheckedChange={handleToggle}
          disabled={isPending}
          aria-label="Toggle AI content personalization"
        />
      </div>
      <p className={`transition-opacity duration-500 pt-8 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
        {content}
      </p>
    </div>
  );
}
