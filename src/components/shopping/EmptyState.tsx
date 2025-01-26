import React from "react";
import { ListPlus, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface EmptyStateProps {
  onNewList: () => void;
  onShowHistory: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onNewList, onShowHistory }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
      <div className="flex flex-col items-center gap-8">
        <p className="text-gray-500 text-center">
          {t("empty.description")}
        </p>
        <div className="flex gap-8">
          <Button
            onClick={onNewList}
            variant="ghost"
            size="icon"
            className="h-12 w-12 hover:bg-accent/50"
          >
            <ListPlus className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </Button>
          <Button
            onClick={onShowHistory}
            variant="ghost"
            size="icon"
            className="h-12 w-12 hover:bg-accent/50"
          >
            <History className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};
