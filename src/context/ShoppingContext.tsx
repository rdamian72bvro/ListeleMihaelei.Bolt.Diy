import React, { createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { useShoppingState } from '@/hooks/useShoppingState';
import { ShoppingList, ProductHistory } from "@/types/shopping";

export interface ShoppingContextState {
  items: string[];
  lists: ShoppingList[];
  products: ProductHistory[];
  addItem: (text: string) => void;
  removeItem: (index: number) => void;
  clearItems: () => void;
  saveList: (name: string) => void;
  restoreList: (list: ShoppingList) => void;
  deleteList: (listId: string) => void;
  deleteProduct: (text: string) => void;
  setLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>;
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const ShoppingContext = createContext<ShoppingContextState | null>(null);

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShoppingContext must be used within a ShoppingProvider');
  }
  return context;
};

interface ShoppingProviderProps {
  children: React.ReactNode;
}

export const ShoppingProvider = ({ children }: ShoppingProviderProps) => {
  const state = useShoppingState();

  return (
    <ShoppingContext.Provider value={state}>
      {children}
    </ShoppingContext.Provider>
  );
};
