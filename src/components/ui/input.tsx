import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const BaseInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full h-12",
          "bg-background/5",
          "border border-white/[0.03]",
          "hover:border-white/[0.05]",
          "focus:border-white/[0.08]",
          "placeholder:text-foreground/40",
          "transition-all duration-200",
          "rounded-md px-3 py-2 outline-none",
          "text-base md:text-sm",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
BaseInput.displayName = "BaseInput"

interface InputProps extends Omit<React.ComponentProps<"input">, "onChange"> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, onChange, onClear, ...props }, ref) => {
    const handleClear = () => {
      if (onClear) {
        onClear()
      } else if (onChange) {
        const event = {
          target: { value: "" }
        } as React.ChangeEvent<HTMLInputElement>
        onChange(event)
      }
    }

    return (
      <div className="relative flex-1">
        <BaseInput
          type={type}
          value={value}
          onChange={onChange}
          className={cn("pr-8", className)}
          ref={ref}
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear input</span>
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
