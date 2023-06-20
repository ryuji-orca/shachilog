"use client"

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from "react"

import { cn } from "@/util"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

/**
 * @package
 */
export const Sheet = SheetPrimitive.Root

/**
 * @package
 */
export const SheetTrigger = SheetPrimitive.Trigger

const portalVariants = cva("fixed inset-0 z-50 flex", {
  variants: {
    position: {
      top: "items-start",
      bottom: "items-end",
      left: "justify-start",
      right: "justify-end",
    },
  },
  defaultVariants: { position: "right" },
})

interface SheetPortalProps
  extends SheetPrimitive.DialogPortalProps,
    VariantProps<typeof portalVariants> {}

const SheetPortal = ({
  position,
  className,
  children,
  ...props
}: SheetPortalProps) => {
  return (
    <SheetPrimitive.Portal className={cn(className)} {...props}>
      <div className={portalVariants({ position })}>{children}</div>
    </SheetPrimitive.Portal>
  )
}
SheetPortal.displayName = SheetPrimitive.Portal.displayName

const SheetOverlay = forwardRef<
  ElementRef<typeof SheetPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <SheetPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 backdrop-blur-md transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
        className,
      )}
      {...props}
      ref={ref}
    />
  )
})
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva("fixed z-50 w-full scale-100 gap-4 p-6 opacity-100", {
  variants: {
    position: {
      top: "w-full animate-in slide-in-from-top duration-300",
      bottom: "w-full animate-in slide-in-from-bottom duration-300",
      left: "h-full animate-in slide-in-from-left duration-300",
      right: "h-full animate-in slide-in-from-right duration-300",
    },
    size: {
      content: "",
      default: "",
      sm: "",
      lg: "",
      xl: "",
      full: "",
    },
  },
  compoundVariants: [
    {
      position: ["top", "bottom"],
      size: "content",
      class: "max-h-screen",
    },
    {
      position: ["top", "bottom"],
      size: "default",
      class: "h-1/3",
    },
    {
      position: ["top", "bottom"],
      size: "sm",
      class: "h-1/4",
    },
    {
      position: ["top", "bottom"],
      size: "lg",
      class: "h-1/2",
    },
    {
      position: ["top", "bottom"],
      size: "xl",
      class: "h-5/6",
    },
    {
      position: ["top", "bottom"],
      size: "full",
      class: "h-screen",
    },
    {
      position: ["right", "left"],
      size: "content",
      class: "max-w-screen",
    },
    {
      position: ["right", "left"],
      size: "default",
      class: "w-1/3",
    },
    {
      position: ["right", "left"],
      size: "sm",
      class: "w-1/4",
    },
    {
      position: ["right", "left"],
      size: "lg",
      class: "w-1/2",
    },
    {
      position: ["right", "left"],
      size: "xl",
      class: "w-5/6",
    },
    {
      position: ["right", "left"],
      size: "full",
      class: "w-screen",
    },
  ],
  defaultVariants: {
    position: "right",
    size: "default",
  },
})

export interface DialogContentProps
  extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

/**
 * @package
 */
export const SheetContent = forwardRef<
  ElementRef<typeof SheetPrimitive.Content>,
  DialogContentProps
>(({ position, size, className, children, ...props }, ref) => {
  return (
    <SheetPortal position={position}>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ position, size }), className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-slate-8 transition-opacity hover:opacity-100 disabled:pointer-events-none  dark:ring-offset-slatedark-8">
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
})
SheetContent.displayName = SheetPrimitive.Content.displayName

/**
 * @package
 */
export const SheetHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  )
}
SheetHeader.displayName = "SheetHeader"

/**
 * @package
 */
export const SheetFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 text-slate-12",
        className,
      )}
      {...props}
    />
  )
}
SheetFooter.displayName = "SheetFooter"

/**
 * @package
 */
export const SheetTitle = forwardRef<
  ElementRef<typeof SheetPrimitive.Title>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <SheetPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold text-slate-12 dark:text-slatedark-12",
        className,
      )}
      {...props}
    />
  )
})
SheetTitle.displayName = SheetPrimitive.Title.displayName

/**
 * @package
 */
export const SheetDescription = forwardRef<
  ElementRef<typeof SheetPrimitive.Description>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => {
  return (
    <SheetPrimitive.Description
      ref={ref}
      className={cn("text-sm text-slate-12 dark:text-slatedark-12", className)}
      {...props}
    />
  )
})
SheetDescription.displayName = SheetPrimitive.Description.displayName
