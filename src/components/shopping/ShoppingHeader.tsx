import { ListCheck } from "lucide-react";
import { ShoppingList, ProductHistory } from "@/types/shopping";
import { MenuSheet } from "./header/MenuSheet";
import { useTranslation } from "@/hooks/useTranslation";

interface ShoppingHeaderProps {
  lists: ShoppingList[];
  products: ProductHistory[];
  onRestoreClick: (list: ShoppingList) => void;
  onDeleteList?: (listId: string) => void;
  onUseProduct: (text: string) => void;
  onDeleteProduct?: (text: string) => void;
  isMenuOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "lists" | "products";
}

export const ShoppingHeader: React.FC<ShoppingHeaderProps> = ({
  lists,
  products,
  onRestoreClick,
  onDeleteList,
  onUseProduct,
  onDeleteProduct,
  isMenuOpen,
  onOpenChange,
  defaultTab = "products",
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between mb-6 border-b border-border/90 pb-2">
      <h1 className="text-2xl font-bold flex items-center gap-2 text-primary">
        <ListCheck className="h-8 w-8 text-primary" />
        {t("app.title")}
      </h1>
      <MenuSheet
        lists={lists}
        products={products}
        isOpen={isMenuOpen}
        onOpenChange={onOpenChange}
        onRestoreList={onRestoreClick}
        onDeleteList={onDeleteList}
        onUseProduct={onUseProduct}
        onDeleteProduct={onDeleteProduct}
        defaultTab={defaultTab}
      />
    </div>
  );
};
