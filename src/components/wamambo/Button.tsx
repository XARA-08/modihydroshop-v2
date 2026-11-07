'use client'

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type JSX,
  type ReactNode,
  forwardRef,
} from 'react'
import { Slot } from '@radix-ui/react-slot'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type ButtonProps<E extends ElementType> = {
  as?: E
  asChild?: boolean
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<E>, 'as' | 'className' | 'children'>

const base =
  'inline-flex items-center justify-center gap-2 font-satoshi font-medium tracking-wide transition-all duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-seal-400 focus-visible:outline-offset-2 disabled:opacity-40 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-seal-400 text-navy-900 hover:bg-seal-300 active:bg-seal-500 active:scale-[0.97] shadow-[0_20px_60px_-16px_rgba(212,175,106,0.45)]',
  secondary:
    'border border-white/20 text-mist bg-transparent hover:border-seal-400/70 hover:text-seal-300 active:opacity-70',
  ghost: 'text-seal-300 bg-transparent underline-offset-4 hover:underline active:opacity-70',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

const _Button = forwardRef<HTMLButtonElement, ButtonProps<'button'>>(
  function _Button({ as, asChild = false, variant = 'primary', size = 'md', className = '', children, ...props }, ref) {
    const Component = asChild ? Slot : (as ?? 'button')

    return (
      <Component
        ref={ref as any}
        className={[base, variants[variant], sizes[size], className].join(' ')}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

_Button.displayName = 'Button'

type PolymorphicButtonComponent = {
  <E extends ElementType = 'button'>(props: ButtonProps<E> & { ref?: never }): JSX.Element
  (props: CommonProps & { ref?: React.ForwardedRef<HTMLButtonElement> }): JSX.Element
}

export const Button = _Button as PolymorphicButtonComponent

export function LinkButton(props: ButtonProps<'a'>) {
  return <Button as="a" {...props} />
}

export default Button
export type { Variant, Size, ButtonProps }
