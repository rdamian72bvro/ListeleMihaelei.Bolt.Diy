import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingList } from "@/types/shopping";
import { HistoryListItem } from "../HistoryListItem";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface ListsSheetProps {
  lists: ShoppingList[];
  onRestoreList: (list: ShoppingList) => void;
  onDeleteList?: (listId: string) => void;
}

export const ListsSheet = ({ lists, onRestoreList, onDeleteList }: ListsSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleRestoreList = (list: ShoppingList) => {
    onRestoreList(list);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="justify-start">
          <History className="mr-2 h-4 w-4" />
          {t("menu.lists")}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            {t("menu.lists")}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-4rem)] mt-4 rounded-md border p-4">
          {lists.map((list) => (
            <HistoryListItem
              key={list.id}
              list={list}
              onRestoreList={handleRestoreList}
              onDeleteList={onDeleteList}
            />
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
