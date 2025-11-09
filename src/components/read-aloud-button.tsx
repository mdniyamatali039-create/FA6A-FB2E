// src/components/read-aloud-button.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { Volume2, Loader2, Pause, Play } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';

interface ReadAloudButtonProps extends VariantProps<typeof buttonVariants> {
  text: string;
  className?: string;
}

export default function ReadAloudButton({ text, className, variant = 'ghost', ...props }: ReadAloudButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup audio element on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    setIsLoading(true);
    try {
      const result = await textToSpeech({ text });
      const audio = new Audio(result.audioDataUri);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        audioRef.current = null; // Allow re-fetching
      };
      
      audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("TTS Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = () => {
    if (isLoading) return <Loader2 className="h-4 w-4 animate-spin" />;
    if (isPlaying) return <Pause className="h-4 w-4" />;
    if (audioRef.current && !isPlaying) return <Play className="h-4 w-4" />;
    return <Volume2 className="h-4 w-4" />;
  };

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={handlePlay}
      disabled={isLoading}
      className={cn("w-7 h-7", className)}
      aria-label="Read aloud"
      {...props}
    >
      {getIcon()}
    </Button>
  );
}
