import {
  forwardRef,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react"

import { cn } from "@/util"

/**
 * @package
 */
export const Table = forwardRef<
  HTMLTableElement,
  HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => {
  return (
    <div className="my-6 w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm my-0", className)}
        {...props}
      />
    </div>
  )
})
Table.displayName = "Table"

/**
 * @package
 */
export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  )
})
TableHeader.displayName = "TableHeader"

/**
 * @package
 */
export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
})
TableBody.displayName = "TableBody"

/**
 * @package
 */
export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <tfoot ref={ref} className={cn("font-medium ", className)} {...props} />
  )
})
TableFooter.displayName = "TableFooter"

/**
 * @package
 */
export const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={cn(
        "border-b border-indigo-6 dark:border-indigodark-6",
        className,
      )}
      {...props}
    />
  )
})
TableRow.displayName = "TableRow"

/**
 * @package
 */
export const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-bold text-slatedark-1 dark:text-slate-1 [&:has([role=checkbox])]:pr-0 first-of-type:px-0 first-of-type:py-4",
        className,
      )}
      {...props}
    />
  )
})
TableHead.displayName = "TableHead"

/**
 * @package
 */
export const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0 first-of-type:px-0 first-of-type:py-4",
        className,
      )}
      {...props}
    />
  )
})
TableCell.displayName = "TableCell"

/**
 * @package
 */
export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => {
  return (
    <caption
      ref={ref}
      className={cn(
        "mt-4 text-sm text-slatedark-2 dark:text-slate-2",
        className,
      )}
      {...props}
    />
  )
})
TableCaption.displayName = "TableCaption"
