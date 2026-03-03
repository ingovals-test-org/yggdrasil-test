'use client'

import { useCallback, useEffect, useState } from 'react'

type UseFocusFlairOptions = {
  ref?: React.RefObject<HTMLElement | null>
  duration?: number
  autoTriggerOnMount?: boolean
}

export function useFocusFlair({
  ref,
  duration = 1200,
  autoTriggerOnMount = false,
}: UseFocusFlairOptions = {}) {
  const [showFlair, setShowFlair] = useState(false)

  const triggerFlair = useCallback(() => {
    setShowFlair(true)
    setTimeout(() => setShowFlair(false), duration)
  }, [duration])

  useEffect(() => {
    if (autoTriggerOnMount) {
      triggerFlair()
    }
  }, [autoTriggerOnMount, triggerFlair])

  useEffect(() => {
    const element = ref?.current
    if (!element) return

    const handleFocus = () => {
      triggerFlair()
    }

    element.addEventListener('focus', handleFocus)
    return () => {
      element.removeEventListener('focus', handleFocus)
    }
  }, [ref, triggerFlair])

  const flairClassName = showFlair ? 'ring-2 ring-primary/50 shadow-lg scale-[1.02]' : ''

  return { showFlair, flairClassName, triggerFlair }
}
