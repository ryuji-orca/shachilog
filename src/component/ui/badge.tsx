import { cn } from "@/util"
import { cva, type VariantProps } from "class-variance-authority"

/**
 * @package
 */
export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-4 text-slate-11 hover:bg-slate-5 dark:bg-slatedark-4 dark:text-slatedark-11 dark:hover:bg-slatedark-5",
        blue: "border-transparent bg-blue-4 text-blue-11 hover:bg-blue-5 dark:bg-bluedark-4 dark:text-bluedark-11 dark:hover:bg-bluedark-5",
        green:
          "border-transparent bg-green-4 text-green-11 hover:bg-green-5 dark:bg-greendark-4 dark:text-greendark-11 dark:hover:bg-greendark-5",
        destructive:
          "border-transparent bg-red-4 text-red-11 hover:bg-red-5 dark:bg-reddark-4 dark:text-reddark-11 dark:hover:bg-reddark-5",
        outline: "text-slate-11 dark:text-slatedark-11",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * @package
 */
export const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
