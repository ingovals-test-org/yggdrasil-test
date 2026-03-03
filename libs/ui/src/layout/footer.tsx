import type * as React from 'react'

import { cn } from '../utils/cn'

type FooterProps = React.ComponentProps<'footer'>

export function Footer({ className, children, ...props }: FooterProps) {
  return (
    <footer className={cn('mt-auto border-t bg-background', className)} {...props}>
      {children}
    </footer>
  )
}

type FooterContentProps = React.ComponentProps<'div'>

export function FooterContent({ className, children, ...props }: FooterContentProps) {
  return (
    <div className={cn('container mx-auto px-4 py-6 sm:px-6 lg:px-8', className)} {...props}>
      {children}
    </div>
  )
}
