import React from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/button';

const ShoppingListFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 space-y-4 text-center">
    <h2 className="text-xl font-semibold">
      Ne pare rău, dar lista de cumpărături nu poate fi încărcată
    </h2>
    <p className="text-gray-600 dark:text-gray-400">
      Am întâmpinat o problemă la încărcarea listei. Vă rugăm să încercați din nou.
    </p>
    <Button onClick={() => window.location.reload()} variant="default">
      Reîncarcă Lista
    </Button>
  </div>
);

export const ShoppingListErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary fallback={<ShoppingListFallback />}>{children}</ErrorBoundary>
);
