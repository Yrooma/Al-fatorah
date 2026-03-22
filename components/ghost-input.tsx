'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface GhostInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const GhostInput = React.forwardRef<HTMLInputElement, GhostInputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="relative">
        {label && (
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-md border border-transparent bg-transparent px-3 py-2 text-sm',
            'transition-all duration-200',
            'placeholder:text-muted-foreground/50',
            'hover:bg-muted/50',
            'focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

GhostInput.displayName = 'GhostInput'

interface GhostTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export const GhostTextarea = React.forwardRef<HTMLTextAreaElement, GhostTextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="relative">
        {label && (
          <label className="mb-1 block text-xs font-medium text-muted-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full resize-none rounded-md border border-transparent bg-transparent px-3 py-2 text-sm',
            'transition-all duration-200',
            'placeholder:text-muted-foreground/50',
            'hover:bg-muted/50',
            'focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

GhostTextarea.displayName = 'GhostTextarea'
