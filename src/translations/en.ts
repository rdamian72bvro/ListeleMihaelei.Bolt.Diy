export const translations = {
  app: {
    title: "Mihaela's Lists",
  },
  menu: {
    title: "Menu",
    description: "View your saved lists and product history",
    lists: "Lists",
    products: "Products",
    noLists: "No saved lists yet",
    noProducts: "No products in history",
  },
  dialog: {
    save: {
      title: "Save Shopping List",
      description: "Enter a name for your shopping list",
      nameLabel: "List name",
      namePlaceholder: "List name",
      confirm: "Save list",
      cancel: "Cancel",
    },
    restore: {
      title: "Restore List",
      description: "Are you sure you want to restore this list?",
      confirm: "Restore",
      cancel: "Cancel",
    },
    delete: {
      title: "Delete List",
      description: "Are you sure you want to delete this list? This action cannot be undone.",
      confirm: "Delete",
      cancel: "Cancel",
    },
  },
  products: {
    count: {
      one: "1 product",
      other: "{{count}} products",
    },
  },
  actions: {
    save: "Save",
    restore: "Restore",
    delete: "Delete",
    cancel: "Cancel",
    clear: "Clear",
    add: "Add",
  },
  button: {
    emptyList: "Empty List",
    saveList: "Save List",
    addItem: "Add Item",
    closeList: "Close List"
  },
  notifications: {
    listSaved: "List saved successfully",
    listRestored: "List restored successfully",
    listDeleted: "List deleted successfully",
    listCleared: "List cleared successfully",
    enterName: "Please enter a name for your list",
    productDeleted: "Product has been deleted from all lists"
  },
  errors: {
    generic: "Something went wrong",
  },
  validation: {
    listName: {
      required: "Please enter a list name",
      minLength: "List name must be at least 3 characters",
      maxLength: "List name cannot be longer than 50 characters",
      noSpecialChars: "List name can only contain letters, numbers, spaces, and hyphens",
      duplicate: "A list with this name already exists",
      pattern: "List name contains invalid characters",
    },
    item: {
      required: "Item name is required",
      minLength: "Item name must be at least 2 characters",
      maxLength: "Item name must be less than 50 characters",
      noSpecialChars: "Item name can only contain letters, numbers, spaces, and hyphens",
      duplicate: "This item already exists",
      pattern: "Item name contains invalid characters",
    },
  },
  input: {
    addItem: "Add a new item...",
  },
  empty: {
    title: "Get Started with Your Shopping List",
    description: "Create a new list or check your previous lists from history",
    newList: "Create New List",
    showHistory: "View History",
  },
  list: {
    empty: "List is empty",
    new: "New List",
    current: "Current List:",
    savedMessage: "List has been saved and can be accessed from history",
    closeList: "Close list",
    itemCount: {
      zero: "no products",
      one: "1 product",
      other: "{{count}} products"
    },
    items: "items",
    itemCount_zero: "items",
    restore: "Restore list",
    delete: "Delete list",
    currentList: "Current List"
  },
  product: {
    usedCount: {
      one: "Used once",
      other: "Used {{count}} times"
    },
    use: "Use product",
    delete: "Delete product",
  },
  common: {
    save: "Save",
    cancel: "Cancel"
  }
};
