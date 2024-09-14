import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type HTMLAttributes } from "react"

import { cn } from "@/util/cn"

const alertVariants = cva(
  "relative w-full rounded-lg border-l-4 p-4 md:[&:has(svg)]:pl-14 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-slate-12 dark:[&>svg]:text-slatedark-12",
  {
    variants: {
      variant: {
        ghost: "text-slate-12 dark:text-slatedark-12",
        warning:
          "border-l-orange-9 bg-amber-3 text-slate-12 dark:border-l-orangedark-9 dark:bg-amberdark-3 dark:text-slatedark-12 [&>svg]:text-orange-9 dark:[&>svg]:text-orangedark-9",
        notice:
          "border-l-indigo-8 bg-blue-3 text-slate-12 dark:border-l-indigodark-8 dark:bg-bluedark-3 dark:text-slatedark-12 [&>svg]:text-indigo-8 dark:[&>svg]:text-indigodark-8",
        pro: "border-l-teal-9 bg-teal-3 text-slate-12 dark:border-l-tealdark-9 dark:bg-tealdark-3 dark:text-slatedark-12 [&>svg]:text-teal-9 dark:[&>svg]:text-tealdark-9",
      },
    },
    defaultVariants: {
      variant: "notice",
    },
  },
)

const Alert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h5
      ref={ref}
      className={cn(
        "mb-2 font-bold tracking-tight dark:!text-slatedark-12 !text-slate-12",
        className,
      )}
      {...props}
    />
  )
})
AlertTitle.displayName = "AlertTitle"

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "text-base [&_p]:leading-relaxed leading-7 tracking-wider",
        className,
      )}
      {...props}
    />
  )
})
AlertDescription.displayName = "AlertDescription"

export { alertVariants, Alert, AlertTitle, AlertDescription }
