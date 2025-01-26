import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { History, List } from "lucide-react";
import { ShoppingList, ProductHistory } from "@/types/shopping";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HistoryListItem } from "./shopping/HistoryListItem";
import { HistoryProductItem } from "./shopping/HistoryProductItem";

interface ShoppingHistoryProps {
  lists: ShoppingList[];
  products: ProductHistory[];
  onRestoreList: (list: ShoppingList) => void;
  onUseProduct: (product: string) => void;
  onDeleteProduct?: (product: string) => void;
  onDeleteList?: (listId: string) => void;
}

export const ShoppingHistory: React.FC<ShoppingHistoryProps> = ({
  lists,
  products,
  onRestoreList,
  onUseProduct,
  onDeleteProduct,
  onDeleteList,
}) => {
  return (
    <div className="fixed bottom-4 left-0 right-0">
      <div className="max-w-md mx-auto px-4">
        <div className="flex gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="flex-1" variant="outline">
                <History className="h-5 w-5 mr-2" />
                Liste
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Liste
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100%-4rem)] mt-4 rounded-md border p-4">
                {lists.map((list) => (
                  <HistoryListItem
                    key={list.id}
                    list={list}
                    onRestoreList={onRestoreList}
                    onDeleteList={onDeleteList}
                  />
                ))}
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="flex-1" variant="outline">
                <List className="h-5 w-5 mr-2" />
                Produse
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <List className="h-5 w-5" />
                  Produse
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100%-4rem)] mt-4 rounded-md border p-4">
                {products
                  .sort((a, b) => b.frequency - a.frequency)
                  .map((product) => (
                    <HistoryProductItem
                      key={product.text}
                      product={product}
                      onUseProduct={onUseProduct}
                      onDeleteProduct={onDeleteProduct || (() => {})}
                    />
                  ))}
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
