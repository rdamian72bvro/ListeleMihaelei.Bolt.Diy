import * as React from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/hooks/useTranslation"
import { Save } from "lucide-react"
import { cn } from "@/lib/utils"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

interface SaveListDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  listName: string;
  onListNameChange: (name: string) => void;
  onSave: () => void;
  existingLists?: string[];
}

export const SaveListDialog: React.FC<SaveListDialogProps> = ({
  isOpen,
  onOpenChange,
  listName,
  onListNameChange,
  onSave,
  existingLists = [],
}) => {
  const { t } = useTranslation();
  const [error, setError] = React.useState<string>("");
  const [isDirty, setIsDirty] = React.useState(false);

  const validate = (value: string) => {
    if (!value.trim()) {
      return t("validation.listName.required");
    }
    if (value.length > 50) {
      return t("validation.listName.maxLength");
    }
    if (existingLists.some(existingName => existingName.toLowerCase() === value.trim().toLowerCase())) {
      return t("validation.listName.duplicate");
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onListNameChange(value);
    if (isDirty) {
      setError(validate(value));
    }
  };

  const handleBlur = () => {
    setIsDirty(true);
    setError(validate(listName));
  };

  const handleSave = () => {
    const validationError = validate(listName);
    setError(validationError);
    setIsDirty(true);
    if (!validationError) {
      onSave();
    }
  };

  React.useEffect(() => {
    if (!isOpen) {
      setError("");
      setIsDirty(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen}>
      <DialogContent 
        className={cn(
          "bg-background/95 backdrop-blur-sm py-6 px-4 max-w-md mx-auto flex flex-col",
          "border border-input/20",
          "shadow-[0_0_30px_rgba(0,0,0,0.4)]",
          "data-[state=open]:!duration-200 data-[state=open]:!transition-all",
          "[&>button]:hidden" // Hide the close button
        )}
        onPointerDownOutside={(e) => e.preventDefault()} 
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <VisuallyHidden asChild>
          <DialogTitle>{t("dialog.save.title")}</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden asChild>
          <DialogDescription>{t("dialog.save.description")}</DialogDescription>
        </VisuallyHidden>
        <div className="flex flex-col h-[72px] mt-4">
          <div className="flex gap-2">
            <Input
              value={listName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder={t("dialog.save.namePlaceholder")}
              className={cn(
                "bg-background/60 h-12",
                "border-[0.5px] border-input/10",
                "hover:border-input/20",
                "focus:border-input/30",
                "shadow-[0_0_10px_rgba(255,255,255,0.02)]",
                "focus:shadow-[0_0_10px_rgba(255,255,255,0.05)]",
                "placeholder:text-foreground/50",
                "transition-all",
                "outline-none"
              )}
              autoFocus
              aria-label={t("dialog.save.nameLabel")}
            />
            <Button 
              onClick={handleSave} 
              disabled={!!error || !listName.trim()}
              variant="ghost"
              size="icon"
              className={cn(
                "h-12 w-12 shrink-0",
                "bg-background/60",
                "hover:bg-accent/50",
                "shadow-[0_0_10px_rgba(255,255,255,0.03)]",
                "hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
                "transition-all"
              )}
            >
              <Save className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              <span className="sr-only">{t("dialog.save.confirm")}</span>
            </Button>
          </div>
          <div className="h-6 flex items-center px-1">
            {error && isDirty && (
              <p className="text-sm text-red-300/80">{error}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
