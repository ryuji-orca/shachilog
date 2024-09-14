"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react"

import { cn } from "@/util/cn"

const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center cursor-pointer",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-10 dark:bg-slatedark-10">
        <SliderPrimitive.Range className="absolute h-full bg-blue-9 dark:bg-bluedark-9" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block size-5 rounded-full border-2 bg-slate-3 transition-colors focus-visible:outline-none focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-slatedark-3" />
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
