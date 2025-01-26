import React from "react";
import { Button } from "@/components/ui/button";
import { ProductHistory } from "@/types/shopping";
import { ListPlus, Trash2 } from "lucide-react";
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
import { useTranslation } from "@/hooks/useTranslation";

interface HistoryProductItemProps {
  product: ProductHistory;
  onUseProduct: (text: string) => void;
  onDeleteProduct: (text: string) => void;
}

export const HistoryProductItem: React.FC<HistoryProductItemProps> = ({
  product,
  onUseProduct,
  onDeleteProduct,
}) => {
  const { t } = useTranslation();

  const handleDelete = () => {
    onDeleteProduct(product.text);
  };

  const getUsageText = (frequency: number) => {
    return frequency === 1 ? t("product.usedCount.one") : t("product.usedCount.other", { count: frequency });
  };

  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div>
        <p className="text-sm font-medium">{product.text}</p>
        <span className="text-xs text-muted-foreground">
          {getUsageText(product.frequency)}
        </span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onUseProduct(product.text)}
        >
          <ListPlus className="h-4 w-4" />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4 text-red-400 hover:text-red-300" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Ștergere produs</AlertDialogTitle>
              <AlertDialogDescription>
                Ești sigur(ă) că vrei să ștergi acest produs din istoric? Această acțiune nu poate fi anulată.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Anulează</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Șterge
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
