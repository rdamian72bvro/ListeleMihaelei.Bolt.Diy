import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductHistory } from "@/types/shopping";
import { HistoryProductItem } from "../HistoryProductItem";
import { useTranslation } from "@/hooks/useTranslation";

interface ProductsSheetProps {
  products: ProductHistory[];
  onUseProduct: (product: string) => void;
  onDeleteProduct?: (product: string) => void;
}

export const ProductsSheet = ({ products, onUseProduct, onDeleteProduct }: ProductsSheetProps) => {
  const { t } = useTranslation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="justify-start">
          <List className="mr-2 h-4 w-4" />
          {t("menu.products")}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <List className="h-5 w-5" />
            {t("menu.products")}
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
  );
};
