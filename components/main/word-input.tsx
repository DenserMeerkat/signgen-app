"use client";

import { useState, useEffect } from "react";
import { parseAsString, useQueryState } from "nuqs";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { words } from "@/constants/";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

const WordInput = () => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [word, setWord] = useQueryState(
    "word",
    parseAsString.withOptions({ history: "push" }),
  );
  const isMac =
    typeof window !== "undefined" &&
    /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const hasMatches = words.includes(inputValue.toLowerCase());

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSelect = (selectedWord: string) => {
    setWord(selectedWord.toLowerCase());
    setOpen(false);
    setInputValue("");
  };

  const selectCustomWord = () => {
    if (inputValue.trim()) {
      handleSelect(inputValue.trim().toLowerCase());
    }
  };

  return (
    <>
      <Button
        variant={"neutral"}
        onClick={() => setOpen((open) => !open)}
        className="w-64 justify-between"
      >
        <div>{word ? <span>{word}</span> : <span>Enter Word</span>}</div>
        <kbd className="bg-main text-main-foreground rounded-base font-heading pointer-events-none inline-flex h-5 items-center gap-1 border-2 px-1.5 font-mono text-[10px] select-none">
          {isMac ? (
            <span className="text-xs">⌘</span>
          ) : (
            <span className="text-xs">Ctrl</span>
          )}
          K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a word..."
          value={inputValue}
          onValueChange={handleInputChange}
        />
        <CommandList>
          {words.length > 0 && (
            <CommandGroup heading="Suggestions">
              {words.map((suggestedWord) => (
                <CommandItem
                  key={suggestedWord}
                  value={suggestedWord}
                  onSelect={handleSelect}
                >
                  {suggestedWord.toLowerCase()}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          {!hasMatches && inputValue && (
            <CommandGroup heading="Custom">
              <CommandItem
                onSelect={selectCustomWord}
                className="flex items-center"
              >
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Use &quot;{inputValue.toLowerCase()}&quot;
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default WordInput;
