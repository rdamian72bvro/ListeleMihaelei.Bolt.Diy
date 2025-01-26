import * as React from "react"
import { cn } from "@/lib/utils"

export interface VisuallyHiddenProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean
}

export const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  VisuallyHiddenProps
>(({ asChild = false, className, ...props }, ref) => {
  const Comp = asChild ? "span" : "span"
  return (
    <Comp
      ref={ref}
      className={cn(
        "absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0",
        "[clip:rect(0,0,0,0)]",
        className
      )}
      {...props}
    />
  )
})
