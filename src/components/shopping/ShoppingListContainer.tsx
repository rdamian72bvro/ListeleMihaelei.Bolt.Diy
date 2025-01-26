import React, { useState, useEffect, useCallback } from "react";
import { useShoppingContext } from "@/context/ShoppingContext";
import { ShoppingHeader } from "./ShoppingHeader";
import { ShoppingListItems } from "./ShoppingListItems";
import { SaveListDialog } from "./SaveListDialog";
import { EmptyState } from "./EmptyState";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Trash2, X } from "lucide-react";
import { ShoppingList } from "@/types/shopping";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const ShoppingListContainer = () => {
  const { t } = useTranslation();

  const {
    items,
    lists,
    products,
    addItem,
    removeItem,
    clearItems,
    saveList,
    restoreList,
    deleteList,
    deleteProduct,
    setLists,
    setItems,
    activeList,
    setActiveList,
  } = useShoppingContext();

  const [newItem, setNewItem] = useState("");
  const [itemError, setItemError] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [showNewListDialog, setShowNewListDialog] = useState(false);
  const [listName, setListName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const validateItem = (value: string) => {
    if (!value.trim()) {
      return "";
    }
    const normalizedValue = value.trim().toLowerCase();
    if (items.some(item => item.toLowerCase() === normalizedValue)) {
      return t("validation.item.duplicate");
    }
    return "";
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    
    const error = validateItem(newItem);
    setItemError(error);
    setIsDirty(true);
    
    if (!error) {
      const trimmedItem = newItem.trim();
      addItem(trimmedItem);
      setNewItem("");
      setItemError("");
      setIsDirty(false);
    }
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewItem(value);
    if (isDirty) {
      setItemError(validateItem(value));
    }
  };

  const handleItemBlur = () => {
    setIsDirty(true);
    setItemError(validateItem(newItem));
  };

  const handleSaveList = () => {
    if (listName) {
      saveList(listName);
      setShowNewListDialog(false);
      setListName("");
    }
  };

  const handleRestoreList = (list: ShoppingList) => {
    restoreList(list);
  };

  const handleClearItems = () => {
    clearItems();
    setActiveList(undefined);
  };

  const handleNewList = () => {
    setShowNewListDialog(true);
  };

  const handleShowHistory = () => {
    setIsMenuOpen(true);
  };

  const handleCloseList = () => {
    toast.success(t("list.savedMessage"));
    setActiveList(undefined);
    clearItems();
  };

  const handleDeleteList = (listId: string) => {
    deleteList(listId);
  };

  const handleUseProduct = useCallback((text: string) => {
    addItem(text);
  }, [addItem]);

  // Show empty state if no active list and no items
  if (!activeList && items.length === 0) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <ShoppingHeader
          lists={lists}
          products={products}
          onRestoreClick={handleRestoreList}
          onDeleteList={handleDeleteList}
          onUseProduct={handleUseProduct}
          onDeleteProduct={deleteProduct}
          isMenuOpen={isMenuOpen}
          onOpenChange={setIsMenuOpen}
          defaultTab="lists"
        />
        <EmptyState
          onNewList={handleNewList}
          onShowHistory={handleShowHistory}
        />
        <SaveListDialog
          isOpen={showNewListDialog}
          onOpenChange={setShowNewListDialog}
          listName={listName}
          onListNameChange={setListName}
          onSave={handleSaveList}
          existingLists={lists.map((list) => list.name)}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl min-h-[100dvh] flex flex-col">
      <ShoppingHeader
        lists={lists}
        products={products}
        onRestoreClick={handleRestoreList}
        onDeleteList={handleDeleteList}
        onUseProduct={handleUseProduct}
        onDeleteProduct={deleteProduct}
        isMenuOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        defaultTab="lists"
      />
      
      <div className="flex-1 flex flex-col">
        <form onSubmit={handleAddItem} className="mb-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                type="text"
                value={newItem}
                onChange={handleItemChange}
                onBlur={handleItemBlur}
                placeholder={t("input.addItem")}
                className={cn(
                  itemError && "border-red-400/50 focus-visible:ring-red-400/20"
                )}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon-lg"
                disabled={!newItem.trim()}
                className="hover:bg-accent/50"
              >
                <Save className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                <span className="sr-only">{t("button.addItem")}</span>
              </Button>
            </div>
            {itemError && isDirty && (
              <p className="text-sm text-red-400/80 px-1">{itemError}</p>
            )}
          </div>
        </form>

        <div className="space-y-2 flex-1">
          <ShoppingListItems items={items} onRemoveItem={removeItem} />
        </div>
      </div>

      {activeList && (
        <div className="mt-6 pt-2 border-t border-border/90">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span>{t("list.currentList")}:</span>
              <span className="font-medium text-foreground">{activeList.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseList}
              className="border border-input rounded-md px-3 py-1"
            >
              {t("button.closeList")}
            </Button>
          </div>
        </div>
      )}

      <SaveListDialog
        isOpen={showNewListDialog}
        onOpenChange={setShowNewListDialog}
        listName={listName}
        onListNameChange={setListName}
        onSave={handleSaveList}
        existingLists={lists.map((list) => list.name)}
      />
    </div>
  );
};
