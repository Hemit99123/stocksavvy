import type { CardProps } from '../../../types/team'
import React from 'react'

const CardDescription: React.FC<CardProps> = ({ className, children, ...props }) => {
    return (
      <p className={`text-sm text-muted-foreground ${className || ""}`} {...props}>
        {children}
      </p>
    )
  }

export default CardDescription