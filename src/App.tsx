import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { ShoppingProvider } from "@/context/ShoppingContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { TranslationProvider } from "@/hooks/useTranslation";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TranslationProvider>
          <ShoppingProvider>
            <div className="dark">
              <Toaster />
              <BrowserRouter basename="/miha">
                <Routes>
                  <Route path="/" element={<Index />} />
                </Routes>
              </BrowserRouter>
            </div>
          </ShoppingProvider>
        </TranslationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
