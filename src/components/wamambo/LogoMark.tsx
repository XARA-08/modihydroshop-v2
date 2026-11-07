import { SVGProps } from 'react'

interface LogoMarkProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export function LogoMark({ size = 40, className = '', ...props }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Wamambo Consultancy"
      className={className}
      {...props}
    >
      {/* W — light */}
      <text
        x="1"
        y="30"
        fontFamily="Syne,Georgia,serif"
        fontWeight="700"
        fontSize="26"
        fill="currentColor"
        className="text-navy-900"
      >
        W
      </text>
      {/* C — gold accent, overlapping */}
      <text
        x="18"
        y="30"
        fontFamily="Syne,Georgia,serif"
        fontWeight="700"
        fontSize="26"
        fill="#2D7DD2"
      >
        C
      </text>
    </svg>
  )
}

export function LogoFull({
  dark = false,
  className = '',
}: {
  dark?: boolean
  className?: string
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoMark
        size={36}
        className={dark ? 'text-navy-900' : 'text-white'}
      />
      <div className="leading-tight">
        <div
          className={`font-satoshi font-bold text-sm tracking-widest uppercase ${
            dark ? 'text-navy-900' : 'text-paper'
          }`}
        >
          WAMAMBO
        </div>
        <div className="font-satoshi font-normal text-xs tracking-[0.18em] uppercase text-seal-500">
          CONSULTANCY
        </div>
      </div>
    </div>
  )
}
