
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategoryOption {
  id: string;
  name: string;
}

interface GameCategoryFilterProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function GameCategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: GameCategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="ghost"
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "whitespace-nowrap rounded-full text-sm border",
            selectedCategory === category.id
              ? "bg-betting-accent text-white border-betting-accent hover:bg-betting-accent/90"
              : "border-border hover:border-betting-accent hover:text-betting-accent"
          )}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
