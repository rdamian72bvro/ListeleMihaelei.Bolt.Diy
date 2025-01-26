import { useState, useCallback, useEffect } from "react";
import { ShoppingList, ProductHistory } from "@/types/shopping";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";
import { listService } from "@/services/listService";
import { productService } from "@/services/productService";

export const useShoppingState = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<string[]>([]);
  const [lists, setLists] = useState<ShoppingList[]>(() => listService.fetchLists());
  const [products, setProducts] = useState<ProductHistory[]>(() => productService.fetchProducts());
  const [activeList, setActiveList] = useState<ShoppingList | undefined>(() => listService.getActiveList());

  useEffect(() => {
    setLists(listService.fetchLists());
    setProducts(productService.fetchProducts());
  }, []);

  useEffect(() => {
    if (activeList) {
      setItems(activeList.items);
    } else {
      setItems([]);
    }
  }, [activeList]);

  const addItem = useCallback(
    (text: string) => {
      const normalizedText = text.trim().toLowerCase();
      
      // Check if item already exists (case-insensitive)
      if (items.some(item => item.toLowerCase() === normalizedText)) {
        toast.error(t("validation.item.duplicate"));
        return;
      }
      
      setItems((prev) => [...prev, text.trim()]);
      productService.createProduct(text.trim());
      setProducts(productService.fetchProducts());

      if (activeList) {
        const updatedList = {
          ...activeList,
          items: [...activeList.items, text.trim()],
        };
        listService.updateList(updatedList);
        setLists(prev => prev.map(list => list.id === updatedList.id ? updatedList : list));
        setActiveList(updatedList);
      }
    },
    [items, t, activeList]
  );

  const removeItem = useCallback((index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);

    if (activeList) {
      const updatedList = {
        ...activeList,
        items: updatedItems,
      };
      listService.updateList(updatedList);
      setLists(prev => prev.map(list => list.id === updatedList.id ? updatedList : list));
      setActiveList(updatedList);
    }
  }, [items, activeList]);

  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  const saveList = useCallback(
    (name: string) => {
      if (!name) {
        toast.error(t("notifications.enterName"));
        return;
      }

      const normalizedName = name.trim().toLowerCase();
      
      // Check if list name already exists (case-insensitive)
      if (lists.some(list => list.name.toLowerCase() === normalizedName)) {
        toast.error(t("validation.listName.duplicate"));
        return;
      }

      const newList = listService.createList({
        name: name.trim(),
        date: new Date().toISOString(),
        items,
      });
      listService.setActiveList(newList.id);
      setLists(listService.fetchLists());
      setActiveList(newList);
    },
    [items, t, lists]
  );

  const restoreList = useCallback((list: ShoppingList) => {
    setItems(list.items);
    list.items.forEach(productService.createProduct);
    listService.setActiveList(list.id);
    const restoredList = { ...list, active: true };
    setActiveList(restoredList);
    setLists(prev => prev.map(l => l.id === list.id ? restoredList : {...l, active: false}));
    toast.success(t("notifications.listRestored"));
  }, [t]);

  const deleteList = useCallback(
    (listId: string) => {
      listService.deleteList(listId);
      setLists(listService.fetchLists());
      setActiveList(listService.getActiveList());
      toast.success(t("notifications.listDeleted"));
    },
    [t]
  );

  const deleteProduct = useCallback((text: string) => {
    productService.deleteProduct(text);
    setProducts(productService.fetchProducts());
    setItems((prev) => prev.filter((item) => item !== text));
    setLists((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.filter((item) => item !== text),
      }))
    );
    toast.success(t("notifications.productDeleted"));
  }, [t]);

  return {
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
  };
};
