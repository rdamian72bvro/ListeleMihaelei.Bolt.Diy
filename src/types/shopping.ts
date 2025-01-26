// List Types
export interface ShoppingList {
  id: string;
  name: string;
  date: string;
  items: string[];
  active: boolean;
}

// Product Types
export interface ProductHistory {
  text: string;
  frequency: number;
}

// Dialog Types
export type DialogMode = 'save' | 'restore' | 'delete';

export interface DialogState {
  isOpen: boolean;
  mode: DialogMode;
  listName: string;
  pendingList: ShoppingList | null;
}
