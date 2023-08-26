import { forwardRef, type ButtonHTMLAttributes } from "react"

import { cn } from "@/util/cn"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
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
        indigoSolid:
          "bg-indigo-4 text-indigo-11 hover:bg-indigo-5 dark:bg-indigodark-4 dark:text-indigodark-11 dark:hover:bg-indigodark-5",
        greenSolid:
          "bg-green-4 text-green-11 hover:bg-green-5 dark:bg-greendark-4 dark:text-greendark-11 dark:hover:bg-greendark-5",
      },

      size: {
        default: "h-10 px-4 py-2",
        xs: "h-8 rounded-md px-2",
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

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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

export { Button, buttonVariants, type ButtonProps }
