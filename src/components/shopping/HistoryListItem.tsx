import React from "react";
import { Button } from "@/components/ui/button";
import { History, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { ShoppingList } from "@/types/shopping";
import { useTranslation } from "@/hooks/useTranslation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HistoryListItemProps {
  list: ShoppingList;
  onRestoreList: (list: ShoppingList) => void;
  onDeleteList?: (listId: string) => void;
}

export const HistoryListItem: React.FC<HistoryListItemProps> = ({
  list,
  onRestoreList,
  onDeleteList,
}) => {
  const { t } = useTranslation();

  const formattedDate = format(new Date(list.date), "dd.MM.yyyy HH:mm");

  const getItemCountText = (count: number) => {
    if (count === 0) return t("list.itemCount.zero");
    if (count === 1) return t("list.itemCount.one");
    return t("list.itemCount.other").replace("{count}", count.toString());
  };

  return (
    <div className="flex flex-col gap-1 py-2">
      <div className="font-semibold">{list.name || formattedDate}</div>
      <div className="text-sm text-muted-foreground flex flex-col">
        <span>{formattedDate}</span>
        <span>{getItemCountText(list.items.length)}</span>
      </div>
      <div className="flex gap-2 mt-1">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onRestoreList(list)}
        >
          {t("list.restore")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onDeleteList?.(list.id)}
        >
          {t("list.delete")}
        </Button>
      </div>
    </div>
  );
};
