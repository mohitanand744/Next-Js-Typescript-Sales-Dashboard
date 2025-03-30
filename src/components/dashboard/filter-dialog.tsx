"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Filters } from './filters'
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useFilters } from '@/contexts/filter-context'

interface FilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FilterDialog({ open, onOpenChange }: FilterDialogProps) {
  const { resetFilters } = useFilters()

  const handleResetAndClose = () => {
    resetFilters()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2 flex flex-row items-center justify-between">
          <DialogTitle>Filter Dashboard</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="p-6 pt-2">
          <Filters className="shadow-none border-none" />
        </div>

        <DialogFooter className="px-6 py-4 border-t flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={handleResetAndClose}
          >
            Reset All
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 