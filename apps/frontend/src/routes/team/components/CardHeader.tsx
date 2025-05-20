import type { CardProps } from '../../../types/team'
import React from 'react'

const CardHeader: React.FC<CardProps> = ({ className, children, ...props }) => {
    return (
      <div className={`flex flex-col space-y-1.5 p-6 ${className || ""}`} {...props}>
        {children}
      </div>
    )
  }
  

export default CardHeader