"use client"

import * as React from "react"
import { toast as sonnerToast, type ToastT, type ToasterProps } from "sonner"

type ToastProps = {
  title: string
  description?: string
  type?: "success" | "error" | "info" | "warning" | "default"
  duration?: number
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
  action?: {
    label: string
    onClick: () => void
  }
}

export function toast({
  title,
  description,
  type = "default",
  duration = 4000,
  position = "top-right",
  action,
  ...props
}: ToastProps) {
  console.log(`Toast triggered: ${title} - ${description}`); // Debug log

  // Handle different toast types
  switch (type) {
    case "success":
      return sonnerToast.success(title, {
        description,
        duration,
        position,
        action: action ? { label: action.label, onClick: action.onClick } : undefined,
        ...props,
      });
    case "error":
      return sonnerToast.error(title, {
        description,
        duration,
        position,
        action: action ? { label: action.label, onClick: action.onClick } : undefined,
        ...props,
      });
    case "info":
      return sonnerToast.info(title, {
        description,
        duration,
        position,
        action: action ? { label: action.label, onClick: action.onClick } : undefined,
        ...props,
      });
    case "warning":
      return sonnerToast.warning(title, {
        description,
        duration,
        position,
        action: action ? { label: action.label, onClick: action.onClick } : undefined,
        ...props,
      });
    default:
      return sonnerToast(title, {
        description,
        duration,
        position,
        action: action ? { label: action.label, onClick: action.onClick } : undefined,
        ...props,
      });
  }
}

export type { ToastProps }
export { type ToastT as Toast, type ToasterProps } 