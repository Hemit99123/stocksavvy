import type { HTMLAttributes, ReactNode } from 'react'

export type AvatarFallbackProps = {
    className?: string
    children: ReactNode
} & HTMLAttributes<HTMLDivElement>

const AvatarFallback: React.FC<AvatarFallbackProps> = ({ className, children, ...props }) => {
    return (
      <div
        className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className || ""}`}
        {...props}
      >
        {children}
      </div>
    )
  }

export default AvatarFallback