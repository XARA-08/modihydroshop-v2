'use client'

import { useCallback } from 'react'

const KEY = 'wamambo-intro'

/**
 * Tiny session-scoped flag so the intro plays once per visit, not on every
 * full page reload. (Layout persists across client-side route changes, so the
 * component only remounts on a hard reload anyway.)
 */
export function useIntroStore() {
  const completeIntro = useCallback(() => {
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* private mode / disabled storage: safe to ignore */
    }
  }, [])
  return { completeIntro }
}
