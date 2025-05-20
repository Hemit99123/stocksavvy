import type { CardProps } from '../../../types/team'
import React from 'react'

const CardContent: React.FC<CardProps> = ({ className, children, ...props }) => {
    return (
      <div className={`p-6 pt-0 ${className || ""}`} {...props}>
        {children}
      </div>
    )
  }
  

export default CardContent