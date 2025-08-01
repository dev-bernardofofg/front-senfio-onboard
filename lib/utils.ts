import { clsx, type ClassValue } from 'clsx'
import { ForwardedRef } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mergeRefs<T>(
  ...refs: Array<ForwardedRef<T> | undefined>
): ForwardedRef<T> {
  return (value: T | null) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref && typeof ref === 'object') {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}
