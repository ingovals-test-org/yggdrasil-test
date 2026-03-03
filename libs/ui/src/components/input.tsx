import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '../utils/cn'

const inputVariants = cva(
  [
    'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  ],
  {
    variants: {
      variant: {
        default: '',
        numeric: 'text-right font-mono',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Input({
  className,
  variant,
  type,
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  )
}

//TODO: Skoða adornment möguleika, passa uppá accessibility og ref.
function AdornmentInput({
  className,
  variant,
  type,
  startContent,
  endContent,
  'aria-invalid': ariaInvalid,
  ...props
}: React.ComponentProps<'input'> &
  VariantProps<typeof inputVariants> & {
    startContent?: React.ReactNode
    endContent?: React.ReactNode
  }) {
  return (
    <div
      data-slot='input'
      aria-invalid={ariaInvalid}
      className={cn(
        inputVariants({ variant, className }),
        'flex focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50'
      )}
    >
      {startContent && (
        <span className='pointer-events-none flex items-center text-muted-foreground'>
          {startContent}
        </span>
      )}
      <input
        className={cn(
          'w-full bg-transparent pr-1.5 text-right font-mono outline-none focus-visible:outline-none'
        )}
        type={type}
        {...props}
      />
      {endContent && (
        <span className='pointer-events-none flex items-center text-muted-foreground'>
          {endContent}
        </span>
      )}
    </div>
  )
}

export { AdornmentInput, Input, inputVariants }
