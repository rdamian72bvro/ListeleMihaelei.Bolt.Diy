import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShoppingListItemsProps {
  items: string[];
  onRemoveItem: (index: number) => void;
}

export const ShoppingListItems = ({ items, onRemoveItem }: ShoppingListItemsProps) => {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 border rounded"
        >
          <span>{item}</span>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-destructive/10"
            onClick={() => onRemoveItem(index)}
          >
            <Trash2 className="h-4 w-4 text-red-400 hover:text-red-300" />
          </Button>
        </div>
      ))}
    </div>
  );
};
