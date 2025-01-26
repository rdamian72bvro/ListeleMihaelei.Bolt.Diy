import { ShoppingList } from "@/types/shopping";

const STORAGE_KEY = "shopping-lists";

const loadLists = (): ShoppingList[] => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const saveLists = (lists: ShoppingList[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
};

const fetchLists = (): ShoppingList[] => {
  return loadLists();
};

const fetchListById = (id: string): ShoppingList | undefined => {
  const lists = loadLists();
  return lists.find((list) => list.id === id);
};

const createList = (list: Omit<ShoppingList, 'id' | 'active'>): ShoppingList => {
  const newList: ShoppingList = {
    id: crypto.randomUUID(),
    active: false,
    ...list,
  };
  const lists = loadLists();
  saveLists([...lists, newList]);
  return newList;
};

const updateList = (updatedList: ShoppingList): ShoppingList => {
  const lists = loadLists();
  const updatedLists = lists.map((list) =>
    list.id === updatedList.id ? updatedList : list
  );
  saveLists(updatedLists);
  return updatedList;
};

const deleteList = (id: string): void => {
  const lists = loadLists();
  const updatedLists = lists.filter((list) => list.id !== id);
  saveLists(updatedLists);
};

const setActiveList = (id: string): void => {
  const lists = loadLists();
  const updatedLists = lists.map((list) => ({
    ...list,
    active: list.id === id,
  }));
  saveLists(updatedLists);
};

const getActiveList = (): ShoppingList | undefined => {
  const lists = loadLists();
  return lists.find((list) => list.active);
};

export const listService = {
  fetchLists,
  fetchListById,
  createList,
  updateList,
  deleteList,
  setActiveList,
  getActiveList,
};
