import { forwardRef, type ButtonHTMLAttributes } from "react"

import { cn } from "@/util"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

/**
 * @package
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-slate-9 text-slate-12 hover:bg-slate-10 dark:bg-slatedark-9 dark:text-slatedark-12 dark:hover:bg-slatedark-10",
        destructive:
          "bg-red-9 text-slate-12 hover:bg-red-10 dark:bg-reddark-9 dark:text-slatedark-12 dark:hover:bg-reddark-10",
        outline: "border hover:text-slate-12 dark:hover:text-slatedark-12",
        secondary:
          "bg-blue-4 text-blue-11 hover:bg-blue-5 dark:bg-bluedark-4 dark:text-bluedark-11 dark:hover:bg-bluedark-5",
        ghost:
          "hover:bg-slate-11 hover:text-slate-12 dark:hover:bg-slatedark-11 dark:hover:text-slatedark-12",
        link: "text-slate-11 hover:underline dark:text-slatedark-11",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * @package
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"
