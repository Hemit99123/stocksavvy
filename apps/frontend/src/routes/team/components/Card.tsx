import type { CardProps } from '../../../types/team'
import React from 'react'

const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
    return (
      <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ""}`} {...props}>
        {children}
      </div>
    )
}
export default Card