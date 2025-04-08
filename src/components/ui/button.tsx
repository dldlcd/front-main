import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
          variant === "default" && "bg-black text-white",
          variant === "ghost" && "bg-transparent hover:bg-gray-100",
          variant === "outline" && "border border-gray-400 bg-transparent",
          size === "default" && "h-10 px-4 py-2",
          size === "icon" && "h-10 w-10",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
