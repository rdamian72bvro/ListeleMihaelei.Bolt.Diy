import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ListChecks, List, RotateCw, Trash2 } from "lucide-react";
import { ShoppingList, ProductHistory } from "@/types/shopping";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

type TabValue = "lists" | "products";

interface MenuSheetProps {
  lists: ShoppingList[];
  products: ProductHistory[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRestoreList: (list: ShoppingList) => void;
  onDeleteList?: (listId: string) => void;
  onUseProduct: (text: string) => void;
  onDeleteProduct?: (text: string) => void;
  defaultTab?: TabValue;
}

export const MenuSheet = ({
  lists,
  products,
  isOpen,
  onOpenChange,
  onRestoreList,
  onDeleteList,
  onUseProduct,
  onDeleteProduct,
  defaultTab = "products",
}: MenuSheetProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabValue>(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabValue);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-accent/50">
          <Menu className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          <span className="sr-only">{t("menu.title")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-4 mt-4 h-full">
          <div>
            <SheetTitle>{t("menu.title")}</SheetTitle>
            {/* <SheetDescription>{t("menu.description")}</SheetDescription> */}
            <SheetDescription>{}</SheetDescription>
            <Separator className="mt-4" />
          </div>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full" aria-label={t("menu.title")}>
            <TabsList>
              <TabsTrigger value="lists" className="flex-1">
                <div className="flex items-center justify-center gap-2 h-full">
                  <ListChecks className="h-4 w-4 shrink-0" />
                  <span>{t("menu.lists")}</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex-1">
                <div className="flex items-center justify-center gap-2 h-full">
                  <List className="h-4 w-4 shrink-0" />
                  <span>{t("menu.products")}</span>
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="lists" className="mt-4">
              {lists.length > 0 ? (
                <div className="space-y-2">
                  {lists.map((list) => (
                    <div
                      key={list.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-accent/20"
                    >
                      <div>
                        <p className="font-medium">{list.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {list.items.length === 0
                            ? t("list.itemCount.zero")
                            : list.items.length === 1
                            ? t("list.itemCount.one")
                            : t("list.itemCount.other").replace("{count}", list.items.length.toString())}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-accent/50"
                          onClick={() => {
                            onRestoreList(list);
                            onOpenChange(false);
                          }}
                        >
                          <RotateCw className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>
                        {onDeleteList && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-destructive/10"
                            onClick={() => onDeleteList(list.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-400 hover:text-red-300" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {t("menu.noLists")}
                </p>
              )}
            </TabsContent>
            <TabsContent value="products" className="mt-4">
              {products.length > 0 ? (
                <div className="space-y-2">
                  {products.map((product) => (
                    <div
                      key={product.text}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-accent/20"
                    >
                      <div>
                        <p className="font-medium">{product.text}</p>
                        <p className="text-sm text-muted-foreground">
                          {t("product.usedCount", { count: product.frequency })}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-accent/50"
                          onClick={() => {
                            onUseProduct(product.text);
                            onOpenChange(false);
                          }}
                        >
                          <RotateCw className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>
                        {onDeleteProduct && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-destructive/10"
                            onClick={() => onDeleteProduct(product.text)}
                          >
                            <Trash2 className="h-4 w-4 text-red-400 hover:text-red-300" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {t("menu.noProducts")}
                </p>
              )}
            </TabsContent>
          </Tabs>
          <div className="mt-auto">
            <Separator />
            <div className="py-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
