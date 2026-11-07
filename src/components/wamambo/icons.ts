// Local typed re-exports for lucide icons whose type declarations are missing
// in the installed lucide-react@1.24.0 .d.ts (they exist at runtime). Casting
// through the module namespace keeps `tsc` happy without patching node_modules.
import type { LucideIcon } from 'lucide-react'
import * as Lucide from 'lucide-react'

const asIcon = (name: string): LucideIcon => (Lucide as Record<string, unknown>)[name] as LucideIcon

export const Wand2 = asIcon('Wand2')
export const PenTool = asIcon('PenTool')
export const Brush = asIcon('Brush')
export const Sparkles = asIcon('Sparkles')
export const LayoutTemplate = asIcon('LayoutTemplate')
export const ArrowDown = asIcon('ArrowDown')
export const Check = asIcon('Check')
export const Download = asIcon('Download')
export const FileText = asIcon('FileText')
export const MessageSquare = asIcon('MessageSquare')
