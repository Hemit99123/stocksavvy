import React, { type HTMLAttributes, type ReactNode } from 'react'

type AvatarProps = {
    className?: string
    children: ReactNode
  } & HTMLAttributes<HTMLDivElement>

// Avatar components
const Avatar: React.FC<AvatarProps> = ({ className, children, ...props }) => {
    return (
      <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className || ""}`} {...props}>
        {children}
      </div>
    )
}

export default Avatar