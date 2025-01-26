import React from "react";
import { ShoppingListContainer } from "./shopping/ShoppingListContainer";
import { ShoppingListErrorBoundary } from "./shopping/ShoppingListErrorBoundary";

export const ShoppingList = () => {
  return (
    <ShoppingListErrorBoundary>
      <ShoppingListContainer />
    </ShoppingListErrorBoundary>
  );
};
