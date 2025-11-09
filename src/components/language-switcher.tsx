"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp } from "@/hooks/use-app";
import { Languages } from 'lucide-react';
import type { Language } from "@/lib/types";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useApp();

  const languageLabels: Record<Language, string> = {
    en: 'English',
    hi: 'हिंदी',
    bn: 'বাংলা',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as Language)}>
          <DropdownMenuRadioItem value="en">{languageLabels.en}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="hi">{languageLabels.hi}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bn">{languageLabels.bn}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
