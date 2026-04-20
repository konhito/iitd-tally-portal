"use client"

import * as React from "react"

interface UseCountUpOptions {
  target: number
  duration?: number   // ms
  start?: number
}

/**
 * Animates from `start` to `target` over `duration` ms using easeOutExpo.
 * Re-triggers whenever `target` changes.
 */
export function useCountUp({ target, duration = 900, start = 0 }: UseCountUpOptions): number {
  const [current, setCurrent] = React.useState(start)
  const rafRef = React.useRef<number | null>(null)
  const startTimeRef = React.useRef<number | null>(null)
  const fromRef = React.useRef(start)

  React.useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    fromRef.current = current
    startTimeRef.current = null

    function easeOutExpo(t: number) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    }

    function step(timestamp: number) {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)
      setCurrent(fromRef.current + (target - fromRef.current) * eased)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setCurrent(target)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration])

  return current
}

interface AnimatedNumberProps {
  value: number
  format?: (v: number) => string
  duration?: number
  className?: string
}

/**
 * Drop-in component that counts up to `value` with a smooth animation.
 * Pass a `format` fn to control display (e.g. currency formatter).
 */
export function AnimatedNumber({ value, format, duration = 900, className }: AnimatedNumberProps) {
  const animated = useCountUp({ target: value, duration })
  const display = format ? format(animated) : animated.toFixed(0)
  return <span className={className}>{display}</span>
}
